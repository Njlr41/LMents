<script>
    import { initDB, insertCourseData, markAnnouncementsHidden, markAssignmentsHidden, markCourseHidden, queryCourses } from '$lib/database.js';
    export let data
    let dbName = "MyDatabase"
    let GClass = data.GClass
    let Canvas = data.Canvas
    let selectedFilter = 'all';

    let query_result = null;
    async function getClasses(){
        await initDB(dbName)
        if(true){
            for (let i = 0; i < GClass.length; i++){ 
                await insertCourseData(GClass[i].id, GClass[i].name, false)
            }
            for (let j = 0; j < Canvas.length; j++){
                await insertCourseData(Canvas[j].id, Canvas[j].name, false)
            }
        }
        query_result = await queryCourses()
    }
    getClasses()

    async function hidden(course_id, hidden) {
        markCourseHidden(course_id, hidden)
        markAssignmentsHidden()
        markAnnouncementsHidden()
        query_result = await queryCourses()
    }
</script>
<div class="title"> Classes </div>
<div class="filter-container">
    <select bind:value={selectedFilter}>
      <option value='all'>All</option>
      <option value='visible'>Visibile only</option>
      <option value='hidden'>Hidden only</option>
    </select>
</div>
{#if !query_result?.values}
    <div class="empty"> No Classes </div>

    <!-- TESTING SAMPLE COURSE -->
    <!-- <div class="course">
        SCUBA Diving AY 2024-2025
        <button class = "">
            {true ? 'HIDDEN' : 'VISIBLE'}
        </button>
    </div> -->
    <!-- TESTING -->
     
{:else}
    {#each query_result?.values as course}
        {#if 
            selectedFilter === 'all' || 
            (selectedFilter === 'visible' && !course.hidden) || 
            (selectedFilter === 'hidden' && course.hidden)
        }
            <div class="course">
                {course.name}
                <button on:click={() => hidden(course.id, course.hidden)} class = "">
                    {course.hidden ? 'HIDDEN' : 'VISIBLE'}
                </button>
            </div>
        {/if}
    {/each}
{/if}

<style>
    

    .course {
        background-color: #48AC55;
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
</style>