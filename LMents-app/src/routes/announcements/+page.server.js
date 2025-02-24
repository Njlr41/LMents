// Function to fetch Google Classroom Announcements by CourseID from API
async function getGoogleClassroomAnnouncements(access_token, course_ID) {
  // Fetching announcements  
  const response = await fetch(`https://classroom.googleapis.com/v1/courses/${course_ID}/announcements`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json'
      }
    });
  // Error check
  if (!response.ok) {
    console.error('Error Fetching Google Classroom Announcements:', response.status, await response.text());
    return;
  }
  return(await response.json());
  }

// Load Announcements upon loading of page
export async function load({cookies}) {
  // Get access token
  const access_token = cookies.get('access_token');
  // Get course ids from cookies and parse to an array
  const str_course_IDs = cookies.get('course_ids');    
  const course_IDs = str_course_IDs ? JSON.parse(str_course_IDs) : [];
  // Get course names from cookies and parse to an array
  const str_course_names = cookies.get('course_names');
  const course_names = str_course_names ? JSON.parse(str_course_names) : []; 
  // Create full announcement list
  const full_announcement_list = [];
  // Go through all course IDs
  let i = 0;
  while (i < course_IDs.length) {
    // Get the announcements for each courseID
    const r = await getGoogleClassroomAnnouncements(access_token, course_IDs[i]);
    if (r) {
      // Push each announcement to the full_announcement_list
      for (let j = 0; j < r.announcements.length; j++) {
        full_announcement_list.push(r.announcements[j]);
      }
    }
    i++;
  }
  // Sort the announcements by Date
  full_announcement_list.sort(function(a, b){return new Date(b.creationTime) - new Date(a.creationTime)})
  return{announcements: full_announcement_list, names:course_names};
}


