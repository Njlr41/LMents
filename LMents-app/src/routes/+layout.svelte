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
        box-shadow: 0px 3px 5px rgba(51, 51, 51, 0.1); 
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
        justify-content: space-between;
        font-size: 20px;
        padding: 5px;
        padding-left: 10px;
    }
    :global(.course-body) {
        background-color: lightgray;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        justify-content: left;
        font-size: 15px;
        padding-left: 15px;
        padding-right: 15px;
        overflow-wrap: break-word;
        padding-bottom: 10px; 
        overflow: hidden;
    }


    :global(.course-body:not(:last-child)) {
        border-bottom: 1px solid #000000;    
    }
    :global(.course-body:last-child) {
        border-radius: 0 0 15px 15px;  
    }
    
</style>