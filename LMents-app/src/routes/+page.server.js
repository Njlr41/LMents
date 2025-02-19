import { json } from '@sveltejs/kit';
export const actions = {
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
        return json({ success: true });
    }
};