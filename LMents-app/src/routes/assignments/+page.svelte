<script>
    import { text } from '@sveltejs/kit';

    export let data;
    const assignments_bydate = data.assignments;
    function intToMonth(int){
        const months = ['January', 'February', 'March', 'April'
                       ,'May', 'June', 'July', 'August', 'September'
                       ,'October', 'November', 'December']

        return(months[int]);
    };
    function stringToDate(str) {
        if (str == "None") {
            return "No Deadline"
        }
        let x = str.split(",");
        return `${intToMonth(x[1])} ${x[2]}, ${x[0]}`
    }
</script>

<div>
    {#if Object.entries(assignments_bydate).length == 0}
        No Assignments
    {:else}
        {#each Object.entries(assignments_bydate) as [due_date, courses]}
            <!-- How to iterate through JSON Dict in Svelte taken from: -->
            <!-- Corrl. https://stackoverflow.com/questions/69762140/how-to-iterate-over-a-json-dictionary-in-svelte -->
            <!-- February 25, 2025-->
            <div class="course-container-date">
                <div class="course-date">
                    {stringToDate(due_date)}
                </div>
                {#each Object.entries(courses) as [course_id, assignments]}
                    <div class="course-container-name">
                        <div class="course-name">
                            {data.course_dict[course_id]}
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