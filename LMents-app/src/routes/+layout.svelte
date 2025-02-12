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
    :global(.course) {
        background-color: gray;
        height: 50px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
    }

    :global(.course-body) {
        background-color: green;
        display: flex;
        font-size: 20px;
    }
</style>