/* CRUD operations for pictures and images */
import S3Upload from "./S3Upload";
import dbServer from './dbServer';

var uuidv4 = require('uuid');
const API_URL = process.env.REACT_APP_API_URL

async function create(file, name, userId) {
  const pictureId = uuidv4();
  // get presigned URL for S3
  let s3FileName = buildFileName(file.name, pictureId)
  try {
    const signedUrl = await dbServer.getSignedRequest(s3FileName, file.type);
    // Upload the image itself to S3.
    try {
      const imageUrl = await S3Upload(file, signedUrl)
      // Create the record in the database
      let payload = { userId: userId, uuid: pictureId, url: imageUrl, name: name }
      return await dbServer.uploadPicture(payload).then(resp => resp)
    } catch (error) { console.log(`Error posting to S3`) }
  } catch (error) { console.log(`Error fetching the signed request`) }
}

async function createWithinStory(file, userId){
  const imageUuid = uuidv4();
  // Get a presigned URL from the server
  let s3FileName = buildFileName(file.name, imageUuid)
  try {
    const serverResp = await dbServer.getSignedRequest(s3FileName, file.type);
    // Upload the image to S3
    try {
      return await S3Upload(file, serverResp).then(imageUrl => {
        // Return an object that can be added to the DB as part of the story
        return {
          userId: userId,
          uuid: imageUuid,
          url: imageUrl
        }
      });
    } 
    catch (error) {
      console.log(`Error posting to S3`)
    }
  } 
  catch (error) {
    console.log(`Error fetching the signed request`)
  }
}

async function getOnePicture(pictureId) {
  return await dbServer.getOnePicture(pictureId)
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
  getOnePicture: getOnePicture,
  createPicture: create,
  createWithinStory: createWithinStory
}

export default PictureApi;