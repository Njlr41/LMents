<script>
    import Navigation from "$lib/components/Navigation.svelte";
</script>

<Navigation>
</Navigation>

<main>
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
        background-color: #48AC55;
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
    }
    :global(*) {
        font-family: verdana;
        color: #272727;
    }
</style>