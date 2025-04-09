<script>
    import { initDB, insertCourseData, markAnnouncementsHidden, markAssignmentsHidden, markCourseHidden, queryCourses } from '$lib/database.js';
    import { theme_color } from '$lib/theme.js';
    import { enhance } from '$app/forms';
    let dbName = "MyDatabase"
    let selectedFilter = 'all';
    let query_result = null;
    let GClass = null
    let Canvas = null
    
    async function updateClasses(){    
        for (let i = 0; i < GClass.length; i++){ 
            await insertCourseData(GClass[i].id, GClass[i].name, false)
        }
        for (let j = 0; j < Canvas.length; j++){
            await insertCourseData(Canvas[j].id, Canvas[j].name, false)
        }
    }
    
    async function getClasses(){
        await initDB(dbName)
        query_result = await queryCourses()
    }
    getClasses()
    
    async function hidden(course_id, hidden) {
        markCourseHidden(course_id, hidden)
        markAssignmentsHidden()
        markAnnouncementsHidden()
        query_result = await queryCourses()
    }

    async function checkEmpty(){
        await getClasses()
        if (query_result.values.length == 0){
            const button = document.querySelector('#refresh_button_courses')
            button.click()
        }
    }
    checkEmpty()
    
</script>

<div class="title-container">
    <div class="title"> Classes 
        <form method="post" action="?/courses" 
        use:enhance={({}) => {
            return async ({ result }) => {
                GClass = result.data.GClass_result
                Canvas = result.data.Canvas_result
                await updateClasses()
                await getClasses()
            }
        }}>
        <button type="submit" id="refresh_button_courses">
            <img src="/refresh.png" alt="Refresh" style="width: 25px; height: 25px;"/>
        </button>
    </form>
    </div>

    <div class="filter-container">
        <select bind:value={selectedFilter}>
          <option value='all'>All</option>
          <option value='visible'>Visibile only</option>
          <option value='hidden'>Hidden only</option>
        </select>
    </div>
</div>

{#if !query_result?.values}
    <div class="empty"> No Classes </div>
{:else}
    {#each query_result?.values as course}
        {#if 
            selectedFilter === 'all' || 
            (selectedFilter === 'visible' && !course.hidden) || 
            (selectedFilter === 'hidden' && course.hidden)
        }
            <div class="course-container" style="background-color: {$theme_color};">
                <div class="course">
                    {course.name}
                    <button on:click={() => hidden(course.id, course.hidden)} class="hidden">
                        {#if course.hidden}
                            <img src="/invisible.svg" alt="Hidden" width="35" height="35" />
                        {:else}
                            <img src="/visible.svg" alt="Visible" width="35" height="35" />
                        {/if}
                    </button>
                </div>
            </div>
        {/if}
    {/each}
{/if}

<style>
    .course-container {
        font-size: 20px;
        color: #f7f7f7;
        font-weight: bold;
        padding: 10px;
        margin-left: 2rem;
        margin-right: 2rem;
        text-align: center;
        border-radius: 12px;
        margin-bottom: 15px;
    }
    .course {
        display: flex;
        width:auto;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        gap: 15px;
        color: #f7f7f7;
    }
    .hidden {
        padding: 0px;
        background-color: #00000000;
        border: 0px;
    }
    .hidden:hover{
        cursor: pointer;
    }
    button {
        border: 0px;
        background-color: #d7d7d700;
    }
</style>