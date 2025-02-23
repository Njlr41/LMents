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
    :global(.course-container) {
        margin-bottom: 10px;
    }
    :global(.course) {
        background-color: #48AC55;
        height: 30px;
        border-radius: 15px 15px 0 0;
        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 20px;
        padding-left: 10px;
    }

    :global(.course-body) {
        background-color: lightgray;
        display: flex;
        justify-content: left;
        font-size: 15px;
        top: 0;
    }
</style>