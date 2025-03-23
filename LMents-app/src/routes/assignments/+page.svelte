<script>
    import { initDB, insertAssignmentData, markAssignmentComplete, queryAssignments, queryCourseName } from '$lib/database.js';
    import { text } from '@sveltejs/kit';

    export let data;
    let query_result = null;
    let dbName = "MyDatabase"
    function intToMonth(int){
        const months = ['January', 'February', 'March', 'April'
                       ,'May', 'June', 'July', 'August', 'September'
                       ,'October', 'November', 'December']

        return(months[int]);
    };
    function stringToDate(str) {
        if (str == "No Deadline") {
            return str
        }
        let x = str.split(",");
        return `${intToMonth(x[1])} ${x[2]}, ${x[0]}`
    }
    console.log(data)
    async function getAssignments(){
        await initDB(dbName)
        for (let i = 0; i < data.assignments.length; i++){
            await insertAssignmentData(data.assignments[i].id, data.assignments[i].courseId
                                      ,data.assignments[i].title, data.assignments[i].description
                                      ,data.assignments[i].dueDate ? `${data.assignments[i].dueDate.year},${data.assignments[i].dueDate.month},${data.assignments[i].dueDate.day}`: "No Deadline"
                                      ,data.assignments[i].alternateLink, false)
        }
        query_result = await queryAssignments()

        console.log("RESULTS", JSON.stringify(query_result.values))
    }
    getAssignments()
    
    async function button(assignment_id, completed){
        markAssignmentComplete(assignment_id, completed)
        query_result = await queryAssignments()
    }

</script>

<div>
    {#if !query_result?.values}
        No Assignments
    {:else}
        {#each query_result?.values as assignment}
            <div class="course-container-date">
                <div class="course-date">
                    {stringToDate(assignment.due_date)}
                </div>
            </div>
            <div class="course-container-name">
                {#each JSON.parse(assignment.entry) as entry, idx}
                {#if idx == 0 || JSON.parse(assignment.entry)[idx - 1].course_id != entry.course_id}
                    <div class="course-name">
                        {#await queryCourseName(entry.course_id) then course_name}
                            {course_name[0].name}
                        {:catch error}
                            Error: {error}
                        {/await}    
                    </div>
                {/if}
                    <div class="course-body">
                        <p style="white-space: pre-line">
                            {entry.title} <br>
                            <br>
                            {entry.description}
                            <a href={entry.link} target="_blank">
                                Assignment Link
                            </a>
                        </p>
                        <button on:click={() => button(entry.assignment_id, entry.completed)} class="checkmark">
                            {entry.completed ? '✅' : '❌'}
                        </button>
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

    .checkmark {
        font-size: 20px;
        padding: 0px;
        margin-left: auto;
    }

</style>