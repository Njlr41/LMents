<script>

    import { goto } from "$app/navigation";

</script>
<!-- Navigation Buttons -->
<div class = "head">
    <button on:click={()=>{goto('/')}}>Home</button>
    <button on:click={()=>{goto('/signup')}}>Login</button>
    <button class="gclassroom" on:click={()=>{goto('/courses')}}>Courses</button>
    <button class="gclassroom" on:click={()=>{goto('/assignments')}}>Assignments</button>
    <button class="gclassroom" on:click={()=>{goto('/announcements')}}>Announcements</button>
</div>
  
<style>
    .head {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
        align-items: center;
        /* background-color: #D7D7D7; */
        border-bottom: 1px solid #d7d7d7;
        padding: 15px;
        box-shadow: 0px 3px 5px rgba(51, 51, 51, 0.1);
        margin: 0px;
    }
    
    button {
        padding: 10px;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        border: 0px;
        border-radius: 12px;
        /* box-shadow: 2px 3px 4px #3333332b; */
        background-color: #F2B344;
    }
    .gclassroom {
        background-color: #48AC55;
    }    
    button:hover {
        box-shadow: 3px 3px 7px rgba(51, 51, 51, 0.201);
        background-color: #ed9d27;
        cursor: pointer;
    }
    .gclassroom:hover {
        background-color: #299c59;
    }
</style>