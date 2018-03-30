/* CRUD operations for pictures and images */
import S3Upload from "./S3Upload";
import dbServer from './dbServer';

var uuidv4 = require('uuid');

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

async function getOnePicture(pictureId) {
  return await dbServer.getOnePicture(pictureId)
}

async function getPicturesByUser(userId) {
  return await dbServer.getPicturesByUser(userId)
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
  getPicturesByUser: getPicturesByUser,
  createPicture: create
}

export default PictureApi;