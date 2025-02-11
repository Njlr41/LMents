<script>
    export let data;
    const courses = data.announcements;
</script>

<div>
    {#if courses.length == 0}
        <p>No Announcements</p>
    {:else}
        {#each courses as announcements, idx}
            <div class="course">
                {data.names[idx]}
            </div>
            {#each announcements as announcement}
                <li>{announcement.text}</li>
            {/each}
        {/each}
    {/if}
</div>