async function getGoogleClassroomClasses(accessToken, cookies) {
  // Fetching courses
  const response = await fetch('https://classroom.googleapis.com/v1/courses', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });
  if (!response.ok) {
    console.error('Error fetching courses:', response.status, await response.text());
    return;
  }
  const courses = await response.json();
  // Sort the courses by date.

  courses.courses.sort(function(a, b){return new Date(b.creationTime) - new Date(a.creationTime)});
  // Grab all course ids and names.
  let course_ids = [];
  let i = 0;
  while (i < courses.courses.length) {
    course_ids = [ ...course_ids, courses.courses[i].id];
    i++;
  }

  let j = 0;
  let course_names = [];
  while (j < courses.courses.length) {
    course_names = [ ...course_names, courses.courses[j].name];
    j++;
  }
  
  // Store all course ids and names in cookies
  cookies.set('course_ids', JSON.stringify(course_ids), {path: '/'});
  cookies.set('course_names', JSON.stringify(course_names), {path: '/'});
  return {courses: courses};
  }

// Load Classes upon loading of page
export function load({cookies}) {
  const access_token = cookies.get('access_token');    
  return(getGoogleClassroomClasses(access_token, cookies));
}


