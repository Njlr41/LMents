<script>
    export let data
    const classes = data.courses
</script>

{#if !classes}
    No Classes
{:else}
    {#each classes as canvas_class}
    <div class="course">
        {canvas_class.name}
    </div>
    {/each}
{/if}

<style>
    .course {
        background-color: #48AC55;
        font-size: 20px;
        padding: 5px;
        text-align: center;
        border-radius: 15px;
        margin-bottom: 15px;
    }
</style>
