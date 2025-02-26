<script>
    export let data
    const classes = data.courses
</script>

{#if !classes}
    <div> No Classes </div>
{:else}
    {#each classes as canvas_class}
    <div class="course">
        {canvas_class.name}
    </div>
    {/each}
{/if}

<style>

    * {
        font-family: verdana;
        color: #1e1e1e;
    }

    .course {
        background-color: #E05545;
        color: #f7f7f7;
        font-size: 20px;
        padding: 5px;
        text-align: center;
        border-radius: 12px;
        margin-bottom: 15px;
    }
</style>
