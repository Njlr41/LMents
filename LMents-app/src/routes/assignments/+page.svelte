<script>
    export let data;
    const courses = data.data
    console.log(data.data[0])

    function intToMonth(int){
        const months = ['January', 'February', 'March', 'April',
                       ,'May', 'June', 'July', 'August', 'September',
                       ,'October', 'November', 'December']

        return(months[int]);
    }
    //console.log(data.data[0].courseWork[0].courseId);
</script>

<ul>
    {#each courses as course}
    <li>{course.courseWork[0].courseId}</li>
        {#each course.courseWork as course_work}
            <li>{course_work.title}</li> 
            {#if course_work.dueDate}
                <li>{course_work.dueDate.year}, {intToMonth(course_work.dueDate.month)} {course_work.dueDate.day}</li>
            {:else}
                <li>No deadline.</li>
            {/if}
        {/each}
    {/each}
</ul>