<script>

    import { goto } from "$app/navigation";

</script>
<!-- Navigation Buttons -->
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
        flex-wrap: wrap;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }
    
    button {
        padding: 10px;
        font-size: 20px;
        border: 0;
        border-radius: 100px;
        box-shadow: 2px 3px 4px #333;
        background-color: #48AC55;
    }
    
    button:hover {
        padding: 10px;
        font-size: 20px;
        border: 0;
        border-radius: 100px;
        box-shadow: 2px 3px 4px #333;
        background-color: #30913d;
    }
</style>