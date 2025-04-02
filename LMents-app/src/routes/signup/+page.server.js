import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import {AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET} from '$env/static/private';
import { SocialLogin } from "@capgo/capacitor-social-login";
import { json } from '@sveltejs/kit';

export const actions = {
  OAuth2: async({})=>{
      const redirectURL = 'http://localhost:5173/oauth';

      const oAuth2Client = new OAuth2Client(
          AUTH_GOOGLE_ID,
          AUTH_GOOGLE_SECRET,
          redirectURL
        );
    
        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: ['https://www.googleapis.com/auth/classroom.courses.readonly',
                  'https://www.googleapis.com/auth/classroom.course-work.readonly',
                  'https://www.googleapis.com/auth/classroom.announcements.readonly'],
          prompt: 'consent'
        });

        throw redirect(302,authorizeUrl);
  },
  // Store access token in cookies
  mobileLogin: async ({ cookies, request }) => {
    const formData = await request.formData();
    const accessToken = formData.get('accessToken');

    cookies.set('access_token', accessToken, {
        httpOnly: true,
        secure: true,  
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60
    });

    return({ success: true });
  },
  // Delete cookies
  mobileLogout: async ({ cookies }) => {
    cookies.set('access_token', '', {
      path: '/',
      expires: new Date(0)
    })
  }
}

export async function load({cookies}) {
  const access_token = cookies.get('access_token')
  return access_token ? {logged_in: true} : {logged_in: false}
}

// # Consulting Ninja. https://www.youtube.com/watch?v=4QwcC4hfqM0
// # February 4, 2025.