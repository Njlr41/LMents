<script>
    export let data;
    console.log(data);
</script>

<ul>
    {#each data.announcements as announcements, idx}
        <div class="course">
            {data.names[idx]}
        </div>
        {#each announcements as announcement}
            <li>{announcement.text}</li>
        {/each}
    {/each}
</ul>