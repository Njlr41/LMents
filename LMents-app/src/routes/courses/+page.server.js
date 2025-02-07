async function getGoogleClassroomClasses(accessToken, cookies) {
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
  const data = await response.json();
  let course_ids = [];
  let i = 0;
  while (i < data.courses.length) {
    course_ids = [ ...course_ids, data.courses[i].id];
    i++;
  }
  cookies.set('course_ids', JSON.stringify(course_ids), {path: '/'});
  return {data: data};
  }

export function load({cookies}) {
  const access_token = cookies.get('access_token');    
  return(getGoogleClassroomClasses(access_token, cookies));
}


