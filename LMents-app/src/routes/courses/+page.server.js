import { CANVAS_ACCESS_TOKEN } from '$env/static/private';

// Function to fetch Google Classroom Courses from API
async function getGoogleClassroomClasses(accessToken, cookies) {
  // Fetching courses
  const response = await fetch('https://classroom.googleapis.com/v1/courses', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });
  // Error check
  if (!response.ok) {
    console.log('Error Fetching Google Classroom Classes:', response.status, await response.text());
    return {}
  }
  // Get response
  const courses = await response.json();
  // Sort the courses by date
  courses.courses.sort(function(a, b){return new Date(b.creationTime) - new Date(a.creationTime)});

  let course_ids = [];
  for (let i = 0; i < courses.courses.length; i++) {
    course_ids = [ ...course_ids, courses.courses[i].id];
  }
  // Store course_dict in cookies
  cookies.set('course_ids', JSON.stringify(course_ids), {path: '/'});
  return courses.courses;
  }

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
      return {};
  }
  // Get response
  const courses = await response.json();
  return courses;
}

// Load Classes upon loading of page
export async function load({cookies}) {
  const access_token = cookies.get('access_token')
  let GClass = await getGoogleClassroomClasses(access_token, cookies)
  let Canvas = await getCanvasClasses(CANVAS_ACCESS_TOKEN, cookies)
  return({GClass, Canvas});
}


