<script>
    export let data;
    const assignments_bydate = data.assignments;
    function intToMonth(int){
        const months = ['January', 'February', 'March', 'April',
                       ,'May', 'June', 'July', 'August', 'September',
                       ,'October', 'November', 'December']

        return(months[int]);
    }
</script>

<div>
    {#if !assignments_bydate}
        <p>No Assignments</p>
    {:else}
        {#each Object.entries(assignments_bydate) as [due_date, assignments]}
            <!-- How to iterate through JSON Dict in Svelte taken from: -->
            <!-- Corrl. https://stackoverflow.com/questions/69762140/how-to-iterate-over-a-json-dictionary-in-svelte -->
            <!-- February 25, 2025-->
            <div class="course-container">
            <div class="course">
                {due_date}
            </div>
            {#each assignments as assignment}
                <div class="course-body">
                    <p>{assignment.title}</p>
                    {#if assignment.dueDate}
                    <p>{assignment.dueDate.year}, {intToMonth(assignment.dueDate.month)} {assignment.dueDate.day}</p>
                    {:else}
                    <p>No deadline.</p>
                    {/if}
                </div>
            {/each}
            </div>
        {/each}
    {/if}
</div>

<style>
    p {
        margin: 10px;
    }
</style>