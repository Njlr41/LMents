<script>
    export let data;
    console.log(data);
    console.log(data.data[0]);
</script>

<ul>
    {#each data.data as course_works}
        {#each course_works.courseWork as course_work}
            <li>{course_work.title}</li> 
        {/each}
    {/each}
</ul>