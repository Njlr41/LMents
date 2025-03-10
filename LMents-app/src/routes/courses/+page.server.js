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
    return;
  }
  // Get response
  const courses = await response.json();
  // Sort the courses by date
  courses.courses.sort(function(a, b){return new Date(b.creationTime) - new Date(a.creationTime)});
  // Create a Dictionary for Courses that maps the course_id to the course_name
  const course_dict = new Object();
  for (let i = 0; i < courses.courses.length; i++) {
    let course_id = courses.courses[i].id;
    let course_name = courses.courses[i].name;

    if (!course_dict[course_id]) {
      course_dict[course_id] = course_name;
    }
  }

  let course_ids = [];
  for (let i = 0; i < courses.courses.length; i++) {
    course_ids = [ ...course_ids, courses.courses[i].id];
  }
  // Store course_dict in cookies
  cookies.set('course_dict', JSON.stringify(course_dict), {path: '/'});
  cookies.set('course_ids', JSON.stringify(course_ids), {path: '/'});
  return {courses: courses};
  }

// Load Classes upon loading of page
export function load({cookies}) {
  const access_token = cookies.get('access_token');
  return(getGoogleClassroomClasses(access_token, cookies));
}


