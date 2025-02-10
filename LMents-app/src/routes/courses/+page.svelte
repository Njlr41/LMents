
<script>
    export let data;
    const classes = data.data.courses; 
    console.log(classes);
</script>

<div class="course">
    {#each classes as gclass_class}
        {gclass_class.name}
    {/each}
</div>