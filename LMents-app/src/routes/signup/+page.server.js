import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import {AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET} from '$env/static/private';

export const actions = {
    OAuth2: async({})=>{
        const redirectURL = 'http://localhost:5173/oauth';

        console.log('id',AUTH_GOOGLE_ID)

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
    }
}

// # Consulting Ninja. https://www.youtube.com/watch?v=4QwcC4hfqM0
// # February 4, 2025.