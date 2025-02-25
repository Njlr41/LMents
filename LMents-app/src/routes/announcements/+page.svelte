<script>
    export let data;
    const courses_bydate = data.announcements;
</script>

<div>
    {#if !courses_bydate}
        No Announcements
    {:else}
        {#each Object.entries(courses_bydate) as [date, courses]}
            <div class="course-container-date">
                <div class="course-date">
                    {date}
                </div>
                {#each Object.entries(courses) as [course_id, announcements]}
                    <div class="course-container-name">
                        <div class="course-name">
                            {course_id}
                        </div>
                        {#each announcements as announcement}
                            <div class="course-body">
                                {announcement.text}
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
</div>

<style>

</style>