import { CANVAS_ACCESS_TOKEN } from '$env/static/private';

async function getCanvasClasses(accessToken, cookies) {
    const response = await fetch('https://canvas.instructure.com/api/v1/courses', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        }
    });
    // Error check
    if (!response.ok) {
        console.log('Error Fetching Canvas Classes:', response.status, await response.text());
        return;
    }
    // Get response
    const courses = await response.json();
    console.log(courses);
    return {courses: courses};
}

export function load({cookies}) {
    return(getCanvasClasses(CANVAS_ACCESS_TOKEN));
}