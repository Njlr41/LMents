<script>
    import { initDB, insertAssignmentData, markAssignmentComplete, markAssignmentPriority, queryAnnouncements, queryAssignments, queryCourseName } from '$lib/database.js';
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
                                      ,data.assignments[i].alternateLink, false, false)
        }
        query_result = await queryAssignments()

        console.log("RESULTS", JSON.stringify(query_result.values))
    }
    getAssignments()
    
    async function checkmark(assignment_id, completed){
        markAssignmentComplete(assignment_id, completed)
        query_result = await queryAssignments()
    }

    async function priority(assignment_id, priority){
        markAssignmentPriority(assignment_id, priority)
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
                        {#await queryCourseName(assignment.course_id) then course_name}
                            {course_name[0].name}
                        {:catch error}
                            Error: {error}
                        {/await}    
                    </div>
                    <div class="course-body">
                        <p style="white-space: pre-line">
                            {assignment.title} <br>
                            <br>
                            {assignment.description}
                            <a href={assignment.link} target="_blank">
                                Assignment Link
                            </a>
                        </p>
                        <button on:click={() => checkmark(assignment.assignment_id, assignment.completed)} class="checkmark">
                            {assignment.completed ? '✅' : '❌'}
                        </button>
                        <button on:click={() => priority(assignment.assignment_id, assignment.priority)} class="checkmark">
                            {assignment.priority ? 'YES' : 'NO'}
                        </button>
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

    .checkmark {
        font-size: 20px;
        padding: 0px;
        margin-left: auto;
    }

</style>