
<script>
    export let data;
    const classes = data.courses; 
</script>

{#if !classes}
    <p>No Classes</p>
{:else}
    {#each classes.courses as gclass_class}
    <div class="course">
        {gclass_class.name}
    </div>
    {/each}
{/if}

<style>
    .course {
        border-radius: 15px;
        margin-bottom: 15px;
    }
</style>