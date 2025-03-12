<script>
    import { initDB, insertAnnouncementData, insertCourseData, queryCourses} from '$lib/database.js';
    export let data;
    let dbName = "MyDatabase"
    let courses_bydate = data.announcements
    let query_result = null;
    let query_dates = null;

    async function getGClassAnnouncement(){
        await initDB(dbName)
        for (const [date, courses] of Object.entries(courses_bydate)){
            for (const [course_id, announcements] of Object.entries(courses)){
                for (let i = 0; i < announcements.length; i++){ 
                    await insertAnnouncementData(course_id, date, announcements[i].text, announcements[i].alternateLink)
                }
            }
        }

        query_result = await queryAnnouncements()
        query_dates = await queryAnnouncementDates()
        console.log("RESULT HERE", JSON.stringify(query_result.values)) 
    }

    getGClassAnnouncement()

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
</script>

<div>

    {#if !query_result?.values}
        <div> No Announcements </div>
    {:else}
        {#each query_dates?.values as unique_date}
            <div class="course-container-date">
                <div class="course-date">
                    {stringToDate(gclass_announcement.date)}
                </div>
                {#each Object.entries(data.course_dict) as [course_id, course_name]}
                    <div class="course-container-name">
                        <div class="course-name">
                            {data.course_dict[course_id]}
                        </div>
                        {#each query_result?.values as gclass_announcement}
                            {#if gclass_announcement.date == unique_date && gclass_announcement.course_id == course_id}
                                <div class="course-body">
                                    <p style="white-space: pre-line">
                                        {gclass_announcement.text} <br>
                                        <a href={gclass_announcement.alternateLink} target="_blank">
                                            AnnouncementLink
                                        </a>
                                    </p>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/each}
            </div>
        {/each}
    {/if}

</div>

<style>

    * {
        font-family: verdana;
        color: #1e1e1e;
    }

</style>