<script>
    import { initDB, insertAssignmentData, markAssignmentComplete, markAssignmentPriority, queryAnnouncements, queryAssignments, queryCourseName } from '$lib/database.js';
    import { theme_color } from '$lib/theme.js';
    import { text } from '@sveltejs/kit';

    export let data;
    let query_result = null;
    let dbName = "MyDatabase"
    let selectedFilter = 'all';

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
    async function getAssignments(){
        await initDB(dbName)
        for (let i = 0; i < data.GClass.length; i++){
            if (data.GClass[i].dueDate) {
                console.log("Devil", data.GClass[i].title, data.GClass[i].dueDate.year,data.GClass[i].dueDate.month,data.GClass[i].dueDate.day)
            }
            await insertAssignmentData(data.GClass[i].id, data.GClass[i].courseId
                                      ,data.GClass[i].title, data.GClass[i].description
                                      ,data.GClass[i].dueDate ? `${data.GClass[i].dueDate.year},${data.GClass[i].dueDate.month - 1},${data.GClass[i].dueDate.day}`: "No Deadline"
                                      ,data.GClass[i].alternateLink, false, false, false)
        }
        for (let j = 0; j < data.Canvas.length; j++){
            let date = new Date(data.Canvas[j].due_at)
            await insertAssignmentData(data.Canvas[j].id, data.Canvas[j].course_id
                                      ,data.Canvas[j].name, data.Canvas[j].description
                                      ,data.Canvas[j].due_at ? `${date.getUTCFullYear()},${date.getUTCMonth()},${date.getUTCDate()}` : "No Deadline"
                                      ,data.Canvas[j].html_url, false, false, false)
        }
        query_result = await queryAssignments()
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

<div class="title-container">
    <div class="title"> Assignments </div>

    <div class="filter-container">
        <select bind:value={selectedFilter}>
        <option value="all">All</option>
        <option value="visible">Visible Only</option>
        <option value="hidden">Hidden Only</option>
        </select>
    </div>
</div>

<div>
    {#if !query_result?.values}
        <div class ="empty">
            No Assignments
        </div>
    {:else}
        {#each query_result?.values as assignment}
            {#if 
                selectedFilter === 'all' || 
                (selectedFilter === 'visible' && !assignment.hidden) || 
                (selectedFilter === 'hidden' && assignment.hidden)
            }
            <div class="course-container-date">
                <div class="course-date">
                    {stringToDate(assignment.due_date)}
                </div>
            </div>
                <div class="course-container-name">
                    <div class="course-name" style="background-color: {$theme_color};">
                        {#await queryCourseName(assignment.course_id) then course_name}
                            {course_name[0].name}
                        {:catch error}
                            Error: {error}
                        {/await}    
                    </div>
                    <div class="course-body">
                        <div class="assignment-title"  style="white-space: pre-line">
                            <button on:click={() => priority(assignment.assignment_id, assignment.priority)} class="star">
                                {#if (assignment.priority)}
                                    <img src="/star_filled.svg" alt="Priority" width="25" height="25" />
                                {:else}
                                    <img src="/star_empty.svg" alt="Non-Priority" width="25" height="25" />
                                {/if}
                            </button>
                            {assignment.title}
                        </div>
                        <p style="white-space: pre-line">
                            {assignment.description}
                        </p>
                        <div class="actions">
                            <a href={assignment.link} target="_blank">
                                <img src="/link-simple.svg" alt="Open Link" width="30" height="30" />
                            </a>
                            <button on:click={() => checkmark(assignment.assignment_id, assignment.completed)} class="checkmark">
                                {#if assignment.completed}
                                    <img src="/check_filled.svg" alt="Done" width="35" height="35" />
                                {:else}
                                    <img src="/check_empty.svg" alt="Not Done" width="35" height="35" />
                                {/if}
                            </button>
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    {/if}
</div>

<style>


    .checkmark {
        padding: 0px;
        margin-left: auto;
        background-color: #00000000;
        border: 0px;
    }
    .checkmark:hover{
        cursor: pointer;
    }
    .star {
        padding: 0px;
        background-color: #00000000;
        border: 0px;
    }
    .star:hover{
        cursor: pointer;
    }
    .actions {
        display:flex;
        width:auto;
        align-items: center;
        gap:auto;
    }
    .assignment-title {
        font-size: 17px;
        font-weight: bold;
        display:flex;
        width:auto;
        align-items:center;
        gap:5px;
    }

</style>