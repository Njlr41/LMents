<script>
    export let data;
    const courses_bydate = data.announcements;

    function intToMonth(int){
        const months = ['January', 'February', 'March', 'April'
                       ,'May', 'June', 'July', 'August', 'September'
                       ,'October', 'November', 'December']

        return(months[int]);
    };
    function stringToDate(str) {
        let x = str.split(",");
        return `${intToMonth(x[1])} ${x[2]}, ${x[0]}`
    }
</script>

<div>
    {#if Object.entries(courses_bydate).length == 0}
        No Announcements
    {:else}
        {#each Object.entries(courses_bydate) as [date, courses]}
            <div class="course-container-date">
                <div class="course-date">
                    {stringToDate(date)}
                </div>
                {#each Object.entries(courses) as [course_id, announcements]}
                    <div class="course-container-name">
                        <div class="course-name">
                            {data.course_dict[course_id]}
                        </div>
                        {#each announcements as announcement}
                            <div class="course-body">
                                <p style="white-space: pre-line">
                                    {announcement.text} <br>
                                    <a href={announcement.alternateLink} target="_blank">
                                        AnnouncementLink
                                    </a>
                                </p>
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