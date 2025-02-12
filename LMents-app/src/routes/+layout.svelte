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
        margin-bottom: 15px;
    }
    :global(.course) {
        background-color: #48AC55;
        height: 50px;
        border-radius: 15px 15px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
    }

    :global(.course-body) {
        background-color: lightgray;
        display: flex;
        font-size: 20px;
        top: 0;
    }
</style>