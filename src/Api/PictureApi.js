/* CRUD operations for pictures and images */
var uuidv4 = require('uuid');
const API_URL = process.env.REACT_APP_API_URL

async function getAllPictures() { 
  const res = await fetch(`${API_URL}/pictures/all`, {
    accept: 'application/json'
  })
  return await res.json()
}

async function getPicturesFromUser(userId) {
  const url = `${API_URL}/pictures?user-id=${userId}`;
  const res = await fetch(url, {
    accept: 'application/json'
  })
  return await res.json()
}

async function postNewPicture(data){
  const res = await fetch(`${API_URL}/pictures/new`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const json = await res.json();
  const response = {
    status: res.status,
    json: json
  }
  return response
}

/* NOTE:
This article saved my bacon here: 
https://devcenter.heroku.com/articles/s3-upload-node#setting-up-the-app-side-node-code
*/
async function uploadImage(file) {
  const uuid = uuidv4();
  try {
    const serverResp = await getSignedRequest(file, uuid);

    try {
      const imageUrl = await postToS3(file, serverResp);
      return {
        url: imageUrl,
        uuid: uuid
      }
    } 
    catch (error) {
      console.log(`Error posting to S3`)
    }
  } 
  catch (error) {
    console.log(`Error fetching the signed request`)
  }
}

// Private Functions

async function getSignedRequest(file, uuid) {
  let s3FileName = buildFileName(file.name, uuid)
  let url = `${API_URL}/sign-s3?file-name=${s3FileName}&file-type=${file.type}`
  const res = await fetch(url);
  if (res.status === 200) {
    const data = await res.json();
    return data
  }
  else {
    console.log(`There was an error with your request`)
  }
}

async function postToS3(file, {signedRequest, url}) {
  try {
    await fetch(signedRequest, {
      method: "PUT",
      body: file,
      headers: {
        'Content-Type': file.type
      }
    });
    console.log(`Image was posted successfully to S3`)
    return url;
  } catch (error) {
    console.log(`ERROR POSTING TO S3, reason: ${error}`)
  }
}

function buildFileName(filename, uuid) {
  let extension = filename.split(".").pop();
  return `${uuid}.${extension}`
}

const PictureApi = {
  getPicturesFromUser: getPicturesFromUser,
  getAllPictures: getAllPictures,
  postNewPicture: postNewPicture,
  uploadImage: uploadImage
}

export default PictureApi;