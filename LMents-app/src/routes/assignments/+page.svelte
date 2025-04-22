<script>
    import { initDB, insertAssignmentData, markAssignmentComplete, markAssignmentPriority, queryAnnouncements, queryAssignments, queryCourseName } from '$lib/database.js';
    import { theme_color } from '$lib/theme.js';
    import { enhance } from '$app/forms';
    import { slide } from 'svelte/transition';


    let dbName = "MyDatabase"
    let query_result = null;
    let selectedFilter = 'all';
    let GClass = null
    let Canvas = null
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

    async function updateAssignments(){
        for (let i = 0; i < GClass.length; i++){
            await insertAssignmentData(GClass[i].id, GClass[i].courseId
                                      ,GClass[i].title, GClass[i].description
                                      ,GClass[i].dueDate ? `${GClass[i].dueDate.year},${GClass[i].dueDate.month - 1},${GClass[i].dueDate.day}`: "No Deadline"
                                      ,GClass[i].alternateLink, false, false, false)
        }
        for (let j = 0; j < Canvas.length; j++){
            let date = new Date(Canvas[j].due_at)
            await insertAssignmentData(Canvas[j].id, Canvas[j].course_id
                                      ,Canvas[j].name, Canvas[j].description.substring(3, (Canvas[j].description.length - 4))
                                      ,Canvas[j].due_at ? `${date.getUTCFullYear()},${date.getUTCMonth()},${date.getUTCDate()}` : "No Deadline"
                                      ,Canvas[j].html_url, false, false, false)
        }
    }

    async function getAssignments(){
        await initDB(dbName)
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

    async function checkEmpty(){
        await getAssignments()
        if (query_result.values.length == 0){
            const button = document.querySelector('#refresh_button_assignments')
            button.click()
        }
    }
    checkEmpty()


    let isLoading = false;    
</script>

<div class="title-container">
    <div class="title"> Assignments 
        <form method="post" action="?/assignments"
        on:submit={() => { isLoading = true; }}
        use:enhance={({}) => {
            return async ({ result }) => {
                GClass = result.data.GClass_result
                Canvas = result.data.Canvas_result
                await updateAssignments()
                await getAssignments()

                isLoading = false;
            }
        }}>
        <button type="submit" id="refresh_button_assignments">
            <img src="/refresh.svg" alt="Refresh" style="width: 28px; height: 28px;"/>
        </button>
        </form>
    </div>

    <div class="filter-container">
        <select bind:value={selectedFilter}>
        <option value="all">All</option>
        <option value="visible">Visible Only</option>
        <option value="hidden">Hidden Only</option>
        </select>
    </div>
</div>

<div>
    {#if isLoading}
    <div class="loader-container" transition:slide>
        <div class="loader"></div>
    </div>
    {/if}


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

    button {
        border: 0px;
        background-color: #d7d7d700;
        cursor:pointer;
    }

</style>