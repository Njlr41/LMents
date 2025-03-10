<script>
    import { initDB, insertCourseData, queryCourses} from '$lib/database.js';
    export let data
    let dbName = "MyDatabase"
    let classes = data.courses
    let query_result = null;
    async function getGClass(){
        await initDB(dbName)
        for (let i = 0; i < classes.courses.length; i++){ 
            await insertCourseData(classes.courses[i].id, classes.courses[i].name)
        }
        query_result = await queryCourses()
        console.log("RESULT HERE", JSON.stringify(query_result.values)) 
    }
    getGClass()
</script>
{#if !query_result?.values}
    <div> No Classes </div>
{:else}
    {#each query_result?.values as gclass_class}
    <div class="course">
        {gclass_class.name}
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