<script>
    import { goto } from "$app/navigation";
    import { fly, slide } from 'svelte/transition';
    import { cubicInOut } from 'svelte/easing';
    import { theme_color, theme_color_name } from "$lib/theme.js";

    export let sidebarToggle = false;
    export let onClose = () => {};
    let colorsToggle = false;

    function toggleSidebar() {
        sidebarToggle = !sidebarToggle;
        onClose(sidebarToggle);
    }

    function toggleColors() {
        colorsToggle = !colorsToggle;
    }

    function accountSettings() {
        goto('/signup');
        sidebarToggle = !sidebarToggle;
    }

    function updateTheme(color, code){
        $theme_color = code;
        $theme_color_name = color;
    }

</script>
<div class="sidebar" transition:fly={{ x: -800, duration: 500, opacity: 1, easing: cubicInOut }}>

    <div class="header">
        <img src="/LMents_textmark.png" alt="LMents"  height=30px />
        <button class="exit" on:click={toggleSidebar}>
            <img src="/close.svg" alt="Close" width=40px/>
        </button>
    </div>

    <div class="menuItem"> Accounts </div>
    <div class="buttoncontainer"> 
        <button class="accountSettings" on:click={accountSettings} style="background-color: {$theme_color};"> Account Settings </button>
    </div>

    <div class="menuItem"> Theme </div>
    <div class="themeColor">
        <button class="color" aria-label="Color Select" on:click={toggleColors} style="background-color: {$theme_color};"> </button>
        Color: {$theme_color_name}
    </div>
    {#if colorsToggle}
    <div transition:slide={{ duration: 200, easing: cubicInOut }}>
        <div class="themeColors">
            <button class="color" aria-label="Brown" on:click={updateTheme("Brown", "#B1745C")} style="background-color: #B1745C;"> </button>
            <button class="color" aria-label="Red" on:click={updateTheme("Red", "#E05545")} style="background-color: #E05545;"> </button>
            <button class="color" aria-label="Orange" on:click={updateTheme("Orange", "#E17A3E")} style="background-color: #E17A3E;"> </button>
            <button class="color" aria-label="Yellow" on:click={updateTheme("Yellow", "#F2B344")} style="background-color: #F2B344;"> </button>
            <button class="color" aria-label="Lime" on:click={updateTheme("Lime", "#A9B73D")} style="background-color: #A9B73D;"> </button>
            <button class="color" aria-label="Green" on:click={updateTheme("Green", "#48AC55")} style="background-color: #48AC55;"> </button>
            <button class="color" aria-label="Teal" on:click={updateTheme("Teal", "#52C7BD")} style="background-color: #52C7BD;"> </button>
            <button class="color" aria-label="Blue" on:click={updateTheme("Blue", "#5A8CF0")} style="background-color: #5A8CF0;"> </button>
            <button class="color" aria-label="Purple" on:click={updateTheme("Purple", "#9E7DF1")} style="background-color: #9E7DF1;"> </button>
            <button class="color" aria-label="Pink" on:click={updateTheme("Pink", "#EA6C98")} style="background-color: #EA6C98;"> </button>
        </div>
    </div>
    {/if}

</div>

<style>
    .sidebar{
        position:fixed;
        top:0;
        left:0;
        width: 70%;
        padding:20px;
        height: 100%;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        box-shadow: 20px 0px 30px #00000030;
        z-index: 50;
        background-color: #f7f7f7;
    }
    .buttoncontainer{
        display:flex;
        justify-content: center;
    }
    .header{
        display:flex;
        justify-content:space-between;
        margin-bottom: 10%;
        align-items:center;
    }
    .accountSettings{
        border:0px;
        color: #F7F7F7;
        font-weight: bold;
        font-size:15px;
        padding: 8px 20px;
        border-radius: 8px;
    }
    button:hover{
        cursor: pointer;
    }
    .exit{
        border:0px;
        background-color:#00000000;
        font-weight:bold;
    }
    .menuItem{
        font-size: 22px;
        font-weight: bold;
        margin: 10px 0px;
    }
    .themeColor{
        display:flex;
        gap:10px;
        align-items:center;
        margin:8px 0px;
    }
    .themeColors{
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        gap: 8px;
    }
    .color{
        border:0px;
        width:35px;
        height:35px;
        border-radius: 20px;
    }
</style>