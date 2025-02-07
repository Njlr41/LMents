async function getGoogleClassroomAssignments(access_token, course_ID) {
  const response = await fetch(`https://classroom.googleapis.com/v1/courses/${course_ID}/courseWork`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'application/json'
    }
  });
  if (!response.ok) {
    console.error('Error fetching courses:', response.status, await response.text());
    return;
  }
  return(await response.json());
  }

export async function load({cookies}) {
  const access_token = cookies.get('access_token');
  const temp = cookies.get('course_ids');    
  const course_IDs = JSON.parse(temp);

  const full_assignment_list = [];
  let i = 0;
  while (i < course_IDs.length) {
    const r = await getGoogleClassroomAssignments(access_token, course_IDs[i]);
    full_assignment_list.push(r);
    i++;
  }
  return ({data: full_assignment_list});
}


