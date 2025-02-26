
<script>
    export let data;
    const classes = data.courses; 
</script>

{#if !classes}
    <div> No Classes </div>
{:else}
    {#each classes.courses as gclass_class}
    <div class="course">
        {gclass_class.name}
    </div>
    {/each}
{/if}

<style>
    * {
        font-family: verdana;
        color: #1e1e1e;
    }

    .course {
        background-color: #48AC55;
        font-size: 20px;
        color: #f7f7f7;
        padding: 5px;
        text-align: center;
        border-radius: 12px;
        margin-bottom: 15px;
    }
</style>