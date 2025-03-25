<script>
    import { initDB, insertAnnouncementData, markAnnouncementPriority, queryAnnouncements, queryCourseName } from '$lib/database.js';

    export let data;
    let query_result = null
    let dbName = "MyDatabase"
    function intToMonth(int){
        const months = ['January', 'February', 'March', 'April'
                       ,'May', 'June', 'July', 'August', 'September'
                       ,'October', 'November', 'December']

        return(months[int]);
    };
    function stringToDate(str) {
        let x = str.split(",");
        return `${intToMonth(x[1])} ${x[2]}, ${x[0]}`
    }
    console.log(data)

    async function getAnnouncements(){
        await initDB(dbName)
        for (let i = 0; i < data.announcements.length; i++){
            let date = new Date(data.announcements[i].creationTime)
            await insertAnnouncementData(data.announcements[i].id, data.announcements[i].courseId, data.announcements[i].text
                                        ,`${date.getUTCFullYear()},${date.getUTCMonth()},${date.getUTCDate()}`
                                        ,data.announcements[i].alternateLink, false)
        }
        query_result = await queryAnnouncements()
    }
    getAnnouncements()

    async function priority(announcement_id, priority){
        markAnnouncementPriority(announcement_id, priority)
        query_result = await queryAnnouncements()
    }
</script>

<div>
    {#if !query_result?.values}
        No Announcements
    {:else}
        {#each query_result?.values as announcement}
            <div class ="course-container-date">
                <div class="course-date">
                    {stringToDate(announcement.announcement_date)}
                </div>
            </div>
            <div class="course-container-name">
                <div class="course-name">
                    {#await queryCourseName(announcement.course_id) then course_name}
                        {course_name[0].name}
                    {:catch error}
                        Error: {error}
                    {/await}
                </div>
                <div class="course-body">
                    <p style="white-space: pre-line">
                        {announcement.text} <br>
                        <a href={announcement.link} target="_blank">
                            Announcement Link
                        </a>
                    </p>
                    <button on:click={() => priority(announcement.announcement_id, announcement.priority)} class="checkmark">
                        {announcement.priority ? 'YES' : 'NO'}
                    </button>
                </div>
            </div>
        {/each}
    {/if}
</div>

<style>

    * {
        font-family: verdana;
        color: #1e1e1e;
    }
    .checkmark {
        font-size: 20px;
        padding: 0px;
        margin-left: auto;
    }

</style>