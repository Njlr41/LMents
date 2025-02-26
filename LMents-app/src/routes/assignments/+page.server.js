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
  while (i < course_ids.length) {
    // Get the assignments for each courseID
    const r = await getGoogleClassroomAssignments(access_token, course_ids[i]);
    if (r) {
      // Push each assignment to the full_assignment_list
      for (let j = 0; j < r.courseWork.length; j++){
        full_assignment_list.push(r.courseWork[j]);
      }
    }
    i++;
  }
  // Sort the and Group assignments by Date and Course
  const sorted_assignments = new Object();
  // Go through each assignment
  for (let i = 0; i < full_assignment_list.length; i++) {
    let assignment = full_assignment_list[i];
    // Check if assignment has a deadline
    if (!assignment.dueDate) {
      // Check if key exists
      if (!sorted_assignments["None"]) {
        sorted_assignments["None"] = {};
      }
      if (!sorted_assignments["None"][assignment.courseId]) {
        sorted_assignments["None"][assignment.courseId] = [];
      }
      // Push assignment to appropriate key
      sorted_assignments["None"][assignment.courseId].push(assignment);
    } else {
      // Turn the dueDate to a string (Year,Month,Day)
      let date = `${assignment.dueDate.year},${assignment.dueDate.month},${assignment.dueDate.day}`;
      // Check if key exists
      if (!sorted_assignments[date]) {
        sorted_assignments[date] = {};
      }
      if (!sorted_assignments[date][assignment.courseId]) {
        sorted_assignments[date][assignment.courseId] = [];
      }
      // Push assignment to appropriate key
      sorted_assignments[date][assignment.courseId].push(assignment);
    }
  };
  
  const str_course_dict = cookies.get('course_dict');
  const course_dict = str_course_dict ? JSON.parse(str_course_dict) : {};
  return ({assignments: sorted_assignments, course_dict: course_dict, course_ids: course_ids});
}


