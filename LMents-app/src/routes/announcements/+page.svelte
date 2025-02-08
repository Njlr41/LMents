<script>
    export let data;
    console.log(data.data[0]);
</script>

<ul>
    {#each data.data as announcements}
    <li>{announcements.announcements[0].courseId}</li>
        {#each announcements.announcements as announcement}
            <li>{announcement.text}</li>
        {/each}
    {/each}
</ul>