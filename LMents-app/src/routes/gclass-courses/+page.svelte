<script>
    export let data;
    const classes = data.data.courses; 
</script>

<ul>
    {#each classes as gclass_class}
        <li>{gclass_class.name}</li>
    {/each}
</ul>

