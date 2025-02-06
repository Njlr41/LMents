async function getGoogleClassroomClasses(accessToken) {
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
    console.log(data);
    return {data: data};
    }

export function load({cookies}) {
    const access_token = cookies.get('access_token');    
    return(getGoogleClassroomClasses(access_token));
}


