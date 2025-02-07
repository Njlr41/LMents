<script>
    export let data;
    console.log(data.data[0]);
</script>

<ul>
    {#each data.data as announcements}
        {#each announcements.announcements as announcement}
            <li>{announcement.text}</li>
        {/each}
    {/each}
</ul>
