<script>
    import { applyAction } from "$app/forms";
    import { SocialLogin } from "@capgo/capacitor-social-login";
    import { onMount } from "svelte";

    const AUTH_GOOGLE_ID = import.meta.env.VITE_AUTH_GOOGLE_ID;

    async function login_button() {
        await SocialLogin.initialize({
            google:{
                webClientId: AUTH_GOOGLE_ID
            }
        });

        const res = await SocialLogin.login({
            provider: 'google',
            options: {}
        });

        const token = res.result.accessToken.token;
        const formData = new FormData();
        formData.append("accessToken", token);
        const fetch_res = await fetch('?/mobileLogin', {
            method: 'POST',
            body: formData
        });
    } 
</script>
<!-- I really don't know how safe this is lol -->
 
<button on:click={login_button}>
    LOG IN HEHE
</button>