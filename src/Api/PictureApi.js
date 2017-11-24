/* CRUD operations for pictures and images */
import S3Upload from "./S3Upload";
import dbServer from './dbServer';

var uuidv4 = require('uuid');
const API_URL = process.env.REACT_APP_API_URL

async function create(file, userId){
  const imageUuid = uuidv4();
  // Get a presigned URL from the server
  let s3FileName = buildFileName(file.name, imageUuid)
  try {
    const serverResp = await dbServer.getSignedRequest(s3FileName, file.type);
    // Upload the image to S3
    try {
      const imageUrl = await S3Upload(file, serverResp);
      // Return an object that can be added to the DB as part of the story
      return {
        userId: userId,
        uuid: imageUuid,
        url: imageUrl
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

/* NOTE:
This article saved my bacon here: 
https://devcenter.heroku.com/articles/s3-upload-node#setting-up-the-app-side-node-code

*/

// Private Functions

function buildFileName(filename, uuid) {
  let extension = filename.split(".").pop();
  return `${uuid}.${extension}`
}

const PictureApi = {
  getPicturesFromUser: getPicturesFromUser,
  getAllPictures: getAllPictures,
  uploadImage: create,
  create: create
}

export default PictureApi;