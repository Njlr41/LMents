<script>
    import Navigation from "$lib/components/Navigation.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";

    import { fly, slide, fade } from 'svelte/transition';

    let sidebarToggle=false;
</script>

{#if sidebarToggle}
    <Sidebar bind:sidebarToggle/>
{/if}

<Navigation bind:sidebarToggle />

<main transition:fade>
    <slot>

    </slot>
</main>

<style>
    main {
        flex: 1;
        padding-top:100px;
        padding-bottom:100px;   
    }

    /* Global Styles */
    :global(.course-container-date) {
        margin-bottom: 20px;
        padding-left: 2rem;
        padding-right: 2rem;
    }
    :global(.course-container-name) {
        margin-bottom: 10px;
        padding-left: 2rem;
        padding-right: 2rem;
    }
    :global(.course-date) {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: center;
    }
    :global(.course-name) {
        color: #F7F7F7;
        font-weight:bold;
        border-radius: 15px 15px 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
        padding: 10px;
    }

    :global(.course-body) {
        background-color: #D7D7D7;
        display: flex;
        flex-direction: column;
        justify-content: left;
        font-size: 15px;
        padding: 15px;
        overflow-wrap: break-word;
    }

    :global(.empty) {
        width: auto;
        color: #909090;
        font-weight:bold;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: nowrap;
        overflow-x: auto; 
        white-space: nowrap;   
        margin: 1rem;
    }
    :global(.title) {
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: left;
        display: flex;
    }
    :global(.title-container) {
        width: auto; 
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    /* hidden/visible/all view dropdown lists */
    :global(.filter-container) {
        position: relative;
    }
    :global(.filter-container select) {
        appearance: none;
        width: 100%;
        padding: 5px 32px 5px 10px;
        background-color: #d7d7d7;
        border: 0px solid #000000;
        border-radius: 0.5rem;
        color: #272727;
        cursor: pointer;
    }
    /* dropdown arrow */
    :global(.filter-container::after) {
    --arrow: 0.4rem;
    position: absolute;
    content: "";
    right: 1rem;
    border-left: var(--arrow) solid transparent;
    border-right: var(--arrow) solid transparent;
    border-top: var(--arrow) solid #909090;
    top: 40%;
    }

    /* loading animation modified from https://css-loaders.com/dots/ */
    :global(.loader) {
        width: 40px;
        aspect-ratio: 2;
        --_g: no-repeat radial-gradient(circle closest-side,#d7d7d7 100%,#0000);
        background: 
            var(--_g) 0%   50%,
            var(--_g) 50%  50%,
            var(--_g) 100% 50%;
        background-size: calc(100%/3) 50%;
        animation: l3 1s infinite linear;
        }
        @keyframes l3 {
            20%{background-position:0%   0%, 50%  50%,100%  50%}
            40%{background-position:0% 100%, 50%   0%,100%  50%}
            60%{background-position:0%  50%, 50% 100%,100%   0%}
            80%{background-position:0%  50%, 50%  50%,100% 100%}
    }
    :global(.loader-container){
        width:auto;
        display:flex;
        justify-content: center;
    }

    :global(*) {
        font-family: verdana;
        color: #272727;
    }
</style>