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
  
<style>
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

/* Global Styles */
    :global(.course) {
        background-color: gray;
        height: 50px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
    }

    :global(.course-body) {
        background-color: green;
        display: flex;
        font-size: 20px;
    }
</style>