<script>
    import { initDB, insertAnnouncementData, markAnnouncementPriority, queryAnnouncements, queryCourseName } from '$lib/database.js';
    import { theme_color } from '$lib/theme.js';
    import { enhance } from '$app/forms';
    import { slide } from 'svelte/transition';


    let dbName = "MyDatabase"
    let query_result = null
    let selectedFilter = 'all';
    let GClass = null
    let Canvas = null

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

    async function updateAnnouncements(){
        for (let i = 0; i < GClass.length; i++){
            let date = new Date(GClass[i].creationTime)
            await insertAnnouncementData(GClass[i].id, GClass[i].courseId, GClass[i].text
                                        ,`${date.getUTCFullYear()},${date.getUTCMonth()},${date.getUTCDate()}`
                                        ,GClass[i].alternateLink, false, false)
        }
        for (let j = 0; j < Canvas.length; j++){
            let date = new Date(Canvas[j].posted_at)
            await insertAnnouncementData(Canvas[j].id, Canvas[j].context_code.slice(7), Canvas[j].message.substring(3, (Canvas[j].message.length - 4))
                                        ,`${date.getUTCFullYear()},${date.getUTCMonth()},${date.getUTCDate()}`
                                        ,Canvas[j].url, false, false
            )
        }
    }

    async function getAnnouncements(){
        await initDB(dbName)
        query_result = await queryAnnouncements()
    }
    getAnnouncements()

    async function priority(announcement_id, priority){
        markAnnouncementPriority(announcement_id, priority)
        query_result = await queryAnnouncements()
    }

    async function checkEmpty(){
        await getAnnouncements()
        if (query_result.values.length == 0){
            const button = document.querySelector('#refresh_button_announcements')
            button.click()
        }
    }
    checkEmpty()


    let isLoading = false;
</script>

<div class="title-container">
    <div class="title"> Announcements
        <form method="post" action="?/announcements"
        on:submit={() => { isLoading = true; }}
        use:enhance={({}) => {
            return async ({ result }) => {
                GClass = result.data.GClass_result
                Canvas = result.data.Canvas_result
                await updateAnnouncements()
                await getAnnouncements()

                isLoading = false;
            }
        }}>
        <button type="submit" id="refresh_button_announcements">
            <img src="/refresh.svg" alt="Refresh" style="width: 28px; height: 28px;"/>
        </button>
        </form>
    </div>

    <div class="filter-container">
        <select bind:value={selectedFilter}>
        <option value="all">All</option>
        <option value="visible">Visibile only</option>
        <option value="hidden">Hidden only</option>
        </select>
    </div>
</div>

<div>
    {#if isLoading}
    <div class="loader-container" transition:slide>
        <div class="loader"></div>
    </div>
    {/if}

    {#if !query_result?.values}
        <div class = "empty" >
            No Announcements
        </div>
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
                    <div class="course-name" style="background-color: {$theme_color};">
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
                                {#if announcement.priority}
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

    button {
        border: 0px;
        background-color: #d7d7d700;
        cursor: pointer;
    }
</style>