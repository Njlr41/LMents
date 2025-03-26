<script>
    import { initDB, insertAnnouncementData, markAnnouncementPriority, queryAnnouncements, queryCourseName } from '$lib/database.js';

    export let data;
    let query_result = null
    let dbName = "MyDatabase"
    let selectedFilter = 'all';


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
                                        ,data.announcements[i].alternateLink, false, false)
        }
        query_result = await queryAnnouncements()
    }
    getAnnouncements()

    async function priority(announcement_id, priority){
        markAnnouncementPriority(announcement_id, priority)
        query_result = await queryAnnouncements()
    }
</script>

<div class="title-container">
    <div class="title"> Announcements </div>

    <div class="filter-container">
        <select bind:value={selectedFilter}>
        <option value="all">All</option>
        <option value="visible">Visibile only</option>
        <option value="hidden">Hidden only</option>
        </select>
    </div>
</div>

<div>
    {#if !query_result?.values}
        <div class ="empty">
            No Announcements
        </div>

        <!-- TESTING SAMPLE ANNOUNCEMENT -->
        <!-- <div class ="course-container-date">
            <div class="course-date">
                June 4, 2024
            </div>
        </div>
        <div class="course-container-name">
            <div class="course-name">
                SCUBA Diving AY 2024-2025
            </div>
            <div class="course-body">
                <div class="actions">
                    <button class="star">
                        {#if true}
                            <img src="/star_filled.svg" alt="Priority" width="25" height="25" />
                        {:else}
                            <img src="/star_empty.svg" alt="Non-Priority" width="25" height="25" />
                        {/if}
                    </button>
                    <a href="blank" target="_blank">
                        <img src="/link-simple.svg" alt="Open Link" width="30" height="30" />
                    </a>
                </div>
                <p style="white-space: pre-line">
                    This is the announcement text sample. <br>
                </p>
            </div>
        </div> -->
        <!-- TESTING -->

    {:else}
        {#each query_result?.values as announcement}
            {#if 
                selectedFilter === 'all' || 
                (selectedFilter === 'visible' && !announcement.hidden) || 
                (selectedFilter === 'hidden' && announcement.hidden)
            }
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
                        <div class="actions">
                            <button on:click={() => priority(announcement.announcement_id, announcement.priority)} class="star">
                                <!-- {true ? 'YES' : 'NO'} -->
                                {#if true}
                                    <img src="/star_filled.svg" alt="Priority" width="25" height="25" />
                                {:else}
                                    <img src="/star_empty.svg" alt="Non-Priority" width="25" height="25" />
                                {/if}
                            </button>
                            <a href={announcement.link} target="_blank">
                                <img src="/link-simple.svg" alt="Open Link" width="30" height="30" />
                            </a>
                        </div>
                        <p style="white-space: pre-line">
                            {announcement.text} <br>
                        </p>
                    </div>
                </div>
            {/if}
        {/each}
    {/if}
</div>

<style>

    .star {
        padding: 0px;
        margin-left: 0px;
        background-color: #00000000;
        border: 0px;
        width: 25px;
    }
    .star:hover{
        cursor: pointer;
    }
    .actions {
        display:flex;
        width:auto;
        align-items:center;
        gap:5px;
    }

</style>