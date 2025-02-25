<script>
    export let data;
    const assignments_bydate = data.assignments;
    function intToMonth(int){
        const months = ['January', 'February', 'March', 'April',
                       ,'May', 'June', 'July', 'August', 'September',
                       ,'October', 'November', 'December']

        return(months[int]);
    };
</script>

<div>
    {#if !assignments_bydate}
        No Assignments
    {:else}
        {#each Object.entries(assignments_bydate) as [due_date, courses]}
            <!-- How to iterate through JSON Dict in Svelte taken from: -->
            <!-- Corrl. https://stackoverflow.com/questions/69762140/how-to-iterate-over-a-json-dictionary-in-svelte -->
            <!-- February 25, 2025-->
            <div class="course-container-date">
                <div class="course-date">
                    {due_date}
                </div>
                {#each Object.entries(courses) as [course_id, assignments]}
                    <div class="course-container-name">
                        <div class="course-name">
                            {course_id}
                        </div>
                        {#each assignments as assignment}
                            <div class="course-body">
                                <p style="white-space: pre-line">
                                    {assignment.title} <br>
                                    <a href={assignment.alternateLink} target="_blank">
                                        Assignment Link
                                    </a>
                                </p>
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
</div>

<style>

</style>