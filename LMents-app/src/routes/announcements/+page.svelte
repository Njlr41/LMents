<script>
    export let data;
    const courses = data.announcements;
</script>

<div>
    {#if courses.length == 0}
        <p>No Announcements</p>
    {:else}
        {#each courses as announcements, idx}
            <div class="course-container">
            <div class="course">
                {data.names[idx]}
            </div>
            {#each announcements as announcement}
                <div class="course-body">
                    <p>Announcement:</p>
                    <p>{announcement.text}</p>
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