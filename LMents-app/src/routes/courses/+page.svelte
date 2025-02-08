<script>
    export let data;
    const classes = data.data.courses; 
    console.log(classes);
</script>

<ul>
    {#each classes as gclass_class}
        <li>{gclass_class.name}</li>
    {/each}
</ul>

