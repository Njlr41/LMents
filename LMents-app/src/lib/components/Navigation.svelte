<script>

    import { goto } from "$app/navigation";

</script>
    <!-- Navigation Buttons -->
    <div class = "footer">
        <!-- Home Button with Image -->
        <button on:click={() => goto('/')}>
        <img src="/house.svg" alt="Home Icon"/>
        </button>
        <!-- Courses Button with Image -->
        <button on:click={()=>{goto('/signup')}}>
        <img src="/sign-in.svg" alt="Login Icon"/>
        </button>
        <!-- Courses Button with Image -->
        <button class="gclassroom" on:click={()=>{goto('/courses')}}>
        <img src="/course.svg" alt="Courses Icon"/>
        </button>
        <!-- Assignments Button with Image -->
        <button class="gclassroom" on:click={() => goto('/assignments')}>
        <img src="/clipboard-text.svg" alt="Assignments Icon"/>
        </button>
        <!-- Announcements Button with Image -->
        <button class="gclassroom" on:click={()=>{goto('/announcements')}}>
        <img src="/megaphone.svg" alt="Announcements Icon"/>
        </button>
    </div>
    <div class = "head">
        <img src="/LMents_logo.png" alt="Lments Logo" width="50" height="50" />
    </div>
    
<style>
    .footer {
        position: fixed; 
        bottom: 0;
        left: 0; 
        right: 0; 
        background-color: white; 
        min-width: 100%;
        box-shadow: 0px -3px 5px rgba(51, 51, 51, 0.1); 
        z-index: 1000; 
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
        width: 100%; 
        background-color: grey;
        display: flex;
        align-items: center;
        padding: 15px;
        z-index: 1000; 
        justify-content: space-between;
        box-shadow: 0px 3px -5px rgba(51, 51, 51, 0.1); 
        border-bottom: 1px solid #d7d7d7; 
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
    .canvas {
        background-color: #E05545;
    }
    .canvas img {
        width: 30px;
        height: 30px;
    }
    button:hover {
        box-shadow: 3px 3px 7px rgba(51, 51, 51, 0.201);
        background-color: #ed9d27;
        cursor: pointer;
    }
    .gclassroom:hover {
        background-color: #299c59;
    }
    .canvas:hover {
        background-color: #da3a3a;
    }
</style>