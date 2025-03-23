<script>
    import { initDB, insertCourseData, queryCourses} from '$lib/database.js';
    export let data
    let dbName = "MyDatabase"
    let GClass = data.GClass
    let Canvas = data.Canvas
    console.log("datass", JSON.stringify(GClass))
    console.log("disass",  JSON.stringify(Canvas))
    
    let query_result = null;
    async function getClasses(){
        await initDB(dbName)
        if(true){
            for (let i = 0; i < GClass.length; i++){ 
                await insertCourseData(GClass[i].id, GClass[i].name)
                console.log("G", JSON.stringify(GClass[i]))
            }
            for (let j = 0; j < Canvas.length; j++){
                await insertCourseData(Canvas[j].id, Canvas[j].name)
                console.log("C", JSON.stringify(Canvas[j]))
            }
        }
        query_result = await queryCourses()
        console.log("GOD", JSON.stringify(query_result.values)) 
    }
    getClasses()

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