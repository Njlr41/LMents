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
            <div class="course-container">
            <div class="course">
                {data.names[idx]}
            </div>
            {#each course.courseWork as course_work}
                <div class="course-body">
                    <p>{course_work.title}</p>
                    {#if course_work.dueDate}
                        <p>{course_work.dueDate.year}, {intToMonth(course_work.dueDate.month)} {course_work.dueDate.day}</p>
                    {:else}
                        <p>No deadline. TEST</p>
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