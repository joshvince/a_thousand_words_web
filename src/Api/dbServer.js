/* handles interaction with db server */
const API_URL = process.env.REACT_APP_API_URL

// PUBLIC API

/*
getSignedRequest
Takes in a filename and a valid filetype.
Requests a signedRequest object from the server.
Returns an object containing a signedRequest string and a url
*/
async function getSignedRequest(filename, fileType) {
  let url = `${API_URL}/sign-s3?file-name=${filename}&file-type=${fileType}`
  return await get(url)
}

// Get one story by its ID
async function getOneStory(storyId){
  const url = `${API_URL}/stories/${storyId}`
  return await get(url)
}

async function getStoriesByUser(userId){
  const url = `${API_URL}/stories?user-id=${userId}`
  return await get(url)
}

/*
uploadStory
Takes in a story object, Sends the object to the DB for insertion into the database
Returns {success: true, object: object} if it was successful,
{success: false, reason: reason} otherwise
*/
async function uploadStory(storyObject) {
  const url = `${API_URL}/stories/new`
  const params = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(storyObject)
  }
  return await post(url, params)
}

/*
uploadPicture
Takes in a picture object, Sends the object to the DB for insertion into the database
Returns {success: true, object: object} if it was successful,
{success: false, reason: reason} otherwise
*/
async function uploadPicture(pictureObject) {
  const url = `${API_URL}/pictures/new`
  const params = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pictureObject)
  }
  return await post(url, params)
}

// Get one picture by its ID
async function getOnePicture(pictureId){
  const url = `${API_URL}/pictures/${pictureId}`
  return await get(url)
}

async function getPicturesByUser(userId) {
  const url = `${API_URL}/pictures?user-id=${userId}`
  return await get(url)
}

// Private Functions

async function post(url, params) {
  return await fetch(url, params).then(async res => {
    return await res.json().then(json => {
      if (res.status === 201 || res.status === 200) {
        return {success: true, object: json}
      }
      else {
        return {success: false, object: json}
      }
    })
  })
}

// Makes a get request to the server at the url provided
async function get(url) {
  const res = await fetch(url);
  if (res.status === 200 || res.status === 201) {
    const data = await res.json();
    return data
  }
  else {
    console.log(`There was an error with your request`)
  }
}

const dbServer = {
  getSignedRequest: getSignedRequest,
  getOnePicture: getOnePicture,
  getPicturesByUser: getPicturesByUser,
  getStoriesByUser: getStoriesByUser,
  getOneStory: getOneStory,
  uploadStory: uploadStory,
  uploadPicture: uploadPicture
}

export default dbServer;