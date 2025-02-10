<script>

    import { goto } from "$app/navigation";

</script>
<div class = "head">
    <button on:click={()=>{goto('/')}}>Home</button>
    <button on:click={()=>{goto('/signup')}}>Login</button>
    <button on:click={()=>{goto('/courses')}}>Courses</button>
    <button on:click={()=>{goto('/assignments')}}>Assignments</button>
    <button on:click={()=>{goto('/announcements')}}>Announcements</button>
</div>

<main>
    <slot/>
</main>
  
<style>
    main {
        flex: 1;
        padding: 5rem;
    }

    .head {
        display: flex;
        flex-direction: row;
        gap: 15px;
        justify-content: center;
        align-items: center;
    }
    
    button {
        padding: 10px;
        font-size: 20px;
        border: 0;
        border-radius: 100px;
        box-shadow: 2px 3px 4px #333;
        background-color: #b5b5b5;
    }
    
    button:hover {
        padding: 10px;
        font-size: 20px;
        border: 0;
        border-radius: 100px;
        box-shadow: 2px 3px 4px #333;
        background-color: #606060;
    }
</style>