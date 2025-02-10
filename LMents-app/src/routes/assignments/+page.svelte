<script>
    export let data;
    const courses = data.assignments

    function intToMonth(int){
        const months = ['January', 'February', 'March', 'April',
                       ,'May', 'June', 'July', 'August', 'September',
                       ,'October', 'November', 'December']

        return(months[int]);
    }
</script>

<div>
    {#if !courses}
        <p>No Assignments</p>
    {:else}
        {#each courses as course, idx}
        <div class="course">
            {data.names[idx]}
        </div>
            {#each course.courseWork as course_work}
                <li>{course_work.title}</li> 
                {#if course_work.dueDate}
                    <li>{course_work.dueDate.year}, {intToMonth(course_work.dueDate.month)} {course_work.dueDate.day}</li>
                {:else}
                    <li>No deadline.</li>
                {/if}
            {/each}
        {/each}
    {/if}
</div>