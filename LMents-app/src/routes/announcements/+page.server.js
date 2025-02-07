async function getGoogleClassroomAnnouncements(access_token, course_ID) {
    const response = await fetch(`https://classroom.googleapis.com/v1/courses/${course_ID}/announcements`, {
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
  const test = cookies.get('course_ids');    
  const course_IDs = test ? JSON.parse(test) : [];
  const full_announcement_list = [];
  let i = 0;
  while (i < course_IDs.length) {
    const r = await getGoogleClassroomAnnouncements(access_token, course_IDs[i]);
    full_announcement_list.push(r);
    i++;
  }
  return{data: full_announcement_list};
}


