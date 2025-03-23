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
<<<<<<< HEAD
    console.log(data)
    async function getAssignments(){
        await initDB(dbName)
        for (let i = 0; i < data.assignments.length; i++){
            await insertAssignmentData(data.assignments[i].id, data.assignments[i].courseId
                                      ,data.assignments[i].title, data.assignments[i].description
                                      ,data.assignments[i].dueDate ? `${data.assignments[i].dueDate.year},${data.assignments[i].dueDate.month},${data.assignments[i].dueDate.day}`: "No Deadline"
                                      ,data.assignments[i].alternateLink, false, false, false)
=======
    console.log(data.assignments)
    async function getAssignments() {
        await initDB(dbName);
        for (let i = 0; i < data.assignments.length; i++) {
            await insertAssignmentData(
                data.assignments[i].id,
                data.assignments[i].courseId,
                data.assignments[i].title,
                data.assignments[i].description,
                data.assignments[i].dueDate
                    ? `${data.assignments[i].dueDate.year},${data.assignments[i].dueDate.month},${data.assignments[i].dueDate.day}`
                    : "No Deadline",
                data.assignments[i].alternateLink,
                false
            );
>>>>>>> b294208 (updated UI in layout, navigation, assignments)
        }
        query_result = await queryAssignments();

        console.log("RESULTS", JSON.stringify(query_result.values))
        // Group assignments by course and deadline
        const groupedAssignments = query_result.values.reduce((acc, assignment) => {
            const key = `${assignment.course_id}-${assignment.due_date}`;
            if (!acc[key]) {
                acc[key] = {
                    course_id: assignment.course_id,
                    due_date: assignment.due_date,
                    assignments: []
                };
            }
            acc[key].assignments.push(assignment);
            return acc;
        }, {});

        // Convert groupedAssignments object to an array
        query_result.groupedValues = Object.values(groupedAssignments);

        console.log("GROUPED RESULTS", JSON.stringify(query_result.groupedValues));
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
    {#if !query_result?.groupedValues}
        No Assignments
    {:else}
        {#each query_result.groupedValues as group}
            <div class="course-container-date">
                <div class="course-date">
                    {stringToDate(group.due_date)}
                </div>
            </div>
            <div class="course-container-name">
<<<<<<< HEAD
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
                            {assignment.hidden}
                        </p>
                        <button on:click={() => checkmark(assignment.assignment_id, assignment.completed)} class="checkmark">
                            {assignment.completed ? '✅' : '❌'}
                        </button>
                        <button on:click={() => priority(assignment.assignment_id, assignment.priority)} class="checkmark">
                            {assignment.priority ? 'YES' : 'NO'}
                        </button>
                    </div>
=======
                <div class="course-name">
                    {#await queryCourseName(group.course_id) then course_name}
                        {course_name[0].name}
                    {:catch error}
                        Error: {error}
                    {/await}
                </div>
                <!-- List all assignments in the group -->
                {#each group.assignments as assignment}
                    <div class="course-body">
                        <p style="white-space: pre-line">
                                {assignment.title} 
                                <a href={assignment.link} target="_blank">
                                <img src="/link-simple.svg" alt="Link Icon"/>
                            </a>
                        </p>
                        <button
                            on:click={() => button(assignment.assignment_id, assignment.completed)}
                            class="checkmark"
                        >
                            {assignment.completed ? '✅' : '❌'}
                        </button>
                    </div>
                {/each}
>>>>>>> b294208 (updated UI in layout, navigation, assignments)
            </div>
        {/each}
    {/if}
</div>

<style>
    .course-body p {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    }
    
    .course-body a {
    margin-left: auto; 
    }
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