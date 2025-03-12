<script>
    import { initDB, insertAssignmentData, markAssignmentComplete, queryAssignments } from '$lib/database.js';
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
    console.log(data.assignments)
    async function getAssignments(){
        await initDB(dbName)
        for (let i = 0; i < data.assignments.length; i++){
            console.log("here")
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
                <div class="course-name">
                    {data.course_dict[assignment.course_id]}
                        <button on:click={() => button(assignment.assignment_id, assignment.completed)}>
                            {assignment.completed ? "COMPLETED" : "NOT COMPLETED"}
                        </button>
                </div>
                <div class="course-body">
                    <p style="white-space: pre-line">
                        {assignment.title} <br>
                        <a href={assignment.link} target="_blank">
                            Assignment Link
                        </a>
                    </p>
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

</style>