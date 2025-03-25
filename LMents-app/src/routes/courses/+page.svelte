<script>
    import { initDB, insertCourseData, markClassHidden, queryCourses} from '$lib/database.js';
    export let data
    let dbName = "MyDatabase"
    let GClass = data.GClass
    let Canvas = data.Canvas
    
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
        markClassHidden(course_id, hidden)
        query_result = await queryCourses()
    }
</script>
{#if !query_result?.values}
    <div> No Classes </div>
{:else}
    {#each query_result?.values as course}
    <div class="course">
        {course.name}
        <button on:click={() => hidden(course.id, course.hidden)} class = "">
            {course.hidden ? 'HIDDEN' : 'VISIBLE'}
        </button>
    </div>
    {/each}
{/if}

<style>
    * {
        font-family: verdana;
        color: #1e1e1e;
    }

    .course {
        background-color: #48AC55;
        font-size: 20px;
        color: #f7f7f7;
        padding: 5px;
        text-align: center;
        border-radius: 12px;
        margin-bottom: 15px;
    }
</style>