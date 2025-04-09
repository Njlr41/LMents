<script>

    import { goto } from "$app/navigation";

    export let sidebarToggle = false;
    export let onClose = () => {};

    function toggleSidebar() {
        sidebarToggle = !sidebarToggle;
        onClose(sidebarToggle);
    }

</script>
    <!-- Navigation Buttons -->
    <div class = "footer">
        <!-- Courses Button with Image -->
        <button on:click={()=>{goto('/courses')}}>
        <img src="/course.svg" alt="Courses"/>
        </button>
        <!-- Announcements Button with Image -->
        <button on:click={()=>{goto('/announcements')}}>
            <img src="/megaphone.svg" alt="Announcements"/>
            </button>
        <!-- Assignments Button with Image -->
        <button on:click={() => goto('/assignments')}>
        <img src="/clipboard-text.svg" alt="Assignments"/>
        </button>
    </div>
    <div class = "head">
        <button class = "logo" on:click={toggleSidebar}>
            <img src="/menu.svg" alt="Menu" width="30" height="30" />
        </button>
        <button class = "logo" on:click={() => goto('/')}>
            <img src="/LMents_logo.svg" alt="LMents Logo" width="50" height="50" />
        </button>
    </div>
    
<style>
    .footer {
        position: fixed; 
        bottom: 0;
        left: 0; 
        right: 0; 
        background-color: #d7d7d7; 
        width: auto;
        /* min-width: 100%; */
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3); 
        z-index: 10; 
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
        align-items: center;
        padding: 15px;
        flex-wrap: nowrap;
        overflow-x: auto; 
        white-space: nowrap; 
    }
    @media (max-width: 600px) {
        .footer {
            gap: 7px; 
            padding: 8px; 
        }

        .footer button {
            padding: 10px;
            font-size: 14px; 
        }

        .footer img {
            width: 24px; 
            height: 24px;
        }
    }
    .head {
        position: fixed; 
        top: 0; 
        left: 0;
        right: 0; 
        width: auto; 
        background-color: #D7D7D7;
        display: flex;
        align-items: center;
        padding: 15px;
        z-index: 10; 
        justify-content: space-between;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); 
    }
    button {
        padding: 10px;
        color: #fff;
        font-size: 16px;
        /* font-weight: bold; */
        border: 0px;
        border-radius: 12px;
        /* box-shadow: 2px 3px 4px #3333332b; */
        background-color: #d7d7d700;
    }
    .logo{
        padding: 0px;
    }
    button:hover {
        /* box-shadow: 3px 3px 7px rgba(51, 51, 51, 0.201); */
        background-color: #b7b7b7;
        cursor: pointer;
    }
    .logo:hover{
        background-color: #d7d7d700;
        cursor: pointer;
    }
</style>