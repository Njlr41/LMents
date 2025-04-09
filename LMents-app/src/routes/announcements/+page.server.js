import { CANVAS_ACCESS_TOKEN } from '$env/static/private';
// Function to fetch Google Classroom Announcements by CourseID from API
async function getGoogleClassroomAnnouncements(access_token, course_id) {
  // Fetching announcements  
  const response = await fetch(`https://classroom.googleapis.com/v1/courses/${course_id}/announcements`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json'
      }
    });
  // Error check
  if (!response.ok) {
    console.error('Error Fetching Google Classroom Announcements:', response.status, await response.text());
    return;
  }
  return(await response.json());
  }
// Function to fetch Canvas Announcements
async function getCanvasAnnouncements(access_token, course_id) {
  const response = await fetch(`https://canvas.instructure.com/api/v1/announcements?context_codes[]=course_${course_id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/json'
    }
  })
  // Error check
  if (!response.ok) {
    console.error('Error Fetching Canvas Announcements:', response.status, await response.text())
    return
  }
  // Get response
  return (await response.json())
}
// Load Announcements upon loading of page
export const actions = {
  announcements: async ({ cookies }) => {
    // Get access token
    const access_token = cookies.get('access_token');
    // Get Gclass course ids from cookies
    const GClass_str_course_ids = cookies.get('GClass_course_ids');    
    const GClass_course_ids = GClass_str_course_ids ? JSON.parse(GClass_str_course_ids) : [];
    // Create GClass announcement list
    const GClass_announcement_list = [];
    // Go through all GClass course ids
    let i = 0;
    while (i < GClass_course_ids.length) {
      // Get the announcements for each course id
      const r = await getGoogleClassroomAnnouncements(access_token, GClass_course_ids[i])
      if (r) {
        // Push each announcement to the list
        for (let j = 0; j < r.announcements.length; j++) {
          GClass_announcement_list.push(r.announcements[j]);
        }
      }
      i++
    }
    // Get Canvas course ids from cookies
    const Canvas_str_course_ids = cookies.get('Canvas_course_ids')
    const Canvas_course_ids = Canvas_str_course_ids ? JSON.parse(Canvas_str_course_ids) : []
    // Create Canvas announcement list
    const Canvas_announcement_list = []
    // Go through all Canvas course ids
    i = 0
    while (i < Canvas_course_ids.length) {
      // Get the announcements for each course id
      const r = await getCanvasAnnouncements(CANVAS_ACCESS_TOKEN, Canvas_course_ids[i])
      if (r) {
        // Push each announcement to the list
        for (let j = 0; j < r.length; j++) {
          Canvas_announcement_list.push(r[j])
        }
      }
      i++
    }
    // Sort and Group announcements by Date and Course 
    return{GClass_result: GClass_announcement_list, Canvas_result: Canvas_announcement_list};
  }
}
  
  
  