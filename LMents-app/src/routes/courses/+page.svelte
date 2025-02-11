
<script>
    export let data;
    const classes = data.courses; 
</script>

<div class="course">
    {#if !classes}
        <p>No Classes</p>
    {:else}
        {#each classes.courses as gclass_class}
            {gclass_class.name}
        {/each}
    {/if}
</div>