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
        padding: 2rem;
    }

    /* Global Styles */
    :global(.course-container-date) {
        margin-bottom: 20px;
    }
    :global(.course-container-name) {
        margin-bottom: 10px;
    }
    :global(.course-date) {
        font-size: 25px;
        margin-bottom: 5px;
        text-align: center;
    }
    :global(.course-name) {
        background-color: #48AC55;
        border-radius: 15px 15px 0 0;
        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 20px;
        padding: 5px;
        padding-left: 10px;
    }

    :global(.course-body) {
        background-color: lightgray;
        display: flex;
        flex-direction: column;
        justify-content: left;
        font-size: 15px;
        padding-left: 15px;
        overflow-wrap: break-word;   
    }
</style>