import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import {AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET} from '$env/static/private';

export const GET = async ({ url, cookies}) => {
    const redirectURL = 'http://localhost:5173/oauth';
    const code = await url.searchParams.get('code');

    //console.log('returned state',state)
    console.log('returned code',code)

    try {
        const oAuth2Client = new OAuth2Client(
          AUTH_GOOGLE_ID,
          AUTH_GOOGLE_SECRET,
            redirectURL
          );
        const r = await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        console.log('credentials',user);
        cookies.set('access_token', JSON.stringify(user.access_token), {path: '/'});
      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }
    throw redirect(303, '/courses');
};

// # Consulting Ninja. https://www.youtube.com/watch?v=4QwcC4hfqM0
// # February 4, 2025.