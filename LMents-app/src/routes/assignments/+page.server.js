// Function to fetch Google Classroom Assignments by CourseID from API
async function getGoogleClassroomAssignments(access_token, course_ID) {
  // Fetching assignments
  const response = await fetch(`https://classroom.googleapis.com/v1/courses/${course_ID}/courseWork`, {
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
// Load Assignments upon loading of page
export async function load({cookies}) {
  // Get access token 
  const access_token = cookies.get('access_token');
  // Get course_ids
  const str_course_ids = cookies.get('course_ids');
  const course_ids = str_course_ids ? JSON.parse(str_course_ids) : {};

  // Create full assignment list
  const full_assignment_list = [];
  // Go through all course IDs
  let i = 0;
  console.log(course_ids)
  while (i < course_ids.length) {
    // Get the assignments for each courseID
    const r = await getGoogleClassroomAssignments(access_token, course_ids[i]);
    if (r) {
      // Push each assignment to the full_assignment_list
      for (let j = 0; j < r.courseWork.length; j++){
        full_assignment_list.push(r.courseWork[j]);
        console.log(r.courseWork[j])
      }
    }
    i++;
  }
  return ({assignments: full_assignment_list});
}


