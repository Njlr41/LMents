import { CANVAS_ACCESS_TOKEN } from '$env/static/private';
// Function to fetch Google Classroom Assignments 
async function getGoogleClassroomAssignments(access_token, course_id) {
  // Fetching assignments
  const response = await fetch(`https://classroom.googleapis.com/v1/courses/${course_id}/courseWork`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/json'
    }
  });
  // Error chcek
  if (!response.ok) {
    console.error('Error Fetching Google Classroom Assignments:', response.status, await response.text());
    return;
  }

  return(await response.json());
}
// Function to fetch Canvas Assignments
async function getCanvasAssignments(access_token, course_id) {
  // Fetching assignments
  const response = await fetch(`https://canvas.instructure.com/api/v1/courses/${course_id}/assignments`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/json'
    }
  })
  if (!response.ok) {
    console.error('Error Fetch Canavas Assignments:', response.status, await response.text())
    return
  }
  return(await response.json())
}
// Load Assignments upon loading of page
export const actions = {
  assignments: async ({ cookies }) => {
    // Get access token 
    const access_token = cookies.get('access_token');
    // Get course_ids
    const GClass_str_course_ids = cookies.get('GClass_course_ids');
    const GClass_course_ids = GClass_str_course_ids ? JSON.parse(GClass_str_course_ids) : [];
    // Create full assignment list
    const GClass_assignment_list = [];
    // Go through all course IDs
    let i = 0;
    while (i < GClass_course_ids.length) {
      // Get the assignments for each courseID
      const r = await getGoogleClassroomAssignments(access_token, GClass_course_ids[i]);
      if (r) {
        // Push each assignment to the full_assignment_list
        for (let j = 0; j < r.courseWork.length; j++){
          GClass_assignment_list.push(r.courseWork[j]);
        }
      }
      i++;
    }
    // Get Canvas course ids from cookies
    const Canvas_str_course_ids = cookies.get('Canvas_course_ids')
    const Canvas_course_ids = Canvas_str_course_ids ? JSON.parse(Canvas_str_course_ids) : []
    // Create Canvas assignment list
    const Canvas_assignment_list = []
    // Go through all Canvas course ids
    i = 0
    while (i < Canvas_course_ids.length) {
      // Get the assignment for each course id
      const r = await getCanvasAssignments(CANVAS_ACCESS_TOKEN, Canvas_course_ids[i])
      if (r) {
        // Push each assignment to the list
        for (let j = 0; j < r.length; j++) {
          Canvas_assignment_list.push(r[j])
        }
      }
      i++
    }
    return{GClass_result: GClass_assignment_list, Canvas_result: Canvas_assignment_list}
  }
}


