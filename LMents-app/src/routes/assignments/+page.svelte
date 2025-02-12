<script>
    export let data;
    const courses = data.assignments;
    function intToMonth(int){
        const months = ['January', 'February', 'March', 'April',
                       ,'May', 'June', 'July', 'August', 'September',
                       ,'October', 'November', 'December']

        return(months[int]);
    }
</script>

<div>
    {#if courses.length == 0}
        <p>No Assignments</p>
    {:else}
        {#each courses as course, idx}
            <div class="course">
                {data.names[idx]}
            </div>
            {#each course.courseWork as course_work}
                <div class="course-body">
                    {course_work.title}
                    {#if course_work.dueDate}
                        {course_work.dueDate.year}, {intToMonth(course_work.dueDate.month)} {course_work.dueDate.day}
                    {:else}
                        No deadline.
                    {/if}
                </div>
            {/each}
        {/each}
    {/if}
</div>