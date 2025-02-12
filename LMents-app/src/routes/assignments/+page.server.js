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
  const str_course_IDs = cookies.get('course_ids');
  const course_IDs = str_course_IDs ? JSON.parse(str_course_IDs) : [];
  const str_course_names = cookies.get('course_names');
  const course_names = str_course_names ? JSON.parse(str_course_names) : [];
  const full_assignment_list = [];
  let i = 0;
  while (i < course_IDs.length) {
    const r = await getGoogleClassroomAssignments(access_token, course_IDs[i]);
    if (r) {
      full_assignment_list.push(r);
    }
    i++;
  }
  
  return ({assignments: full_assignment_list, names: course_names});
}


