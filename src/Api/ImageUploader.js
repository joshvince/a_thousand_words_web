var uuidv4 = require('uuid');

/* NOTE:

This article saved my bacon here: 
https://devcenter.heroku.com/articles/s3-upload-node#setting-up-the-app-side-node-code

*/
async function uploadImage(file) {
  const uuid = uuidv4();
  try {
    const serverResp = await getSignedRequest(file, uuid);
    postToS3(file, serverResp.signedRequest)
  } catch (error) {
    console.log(`Error fetching the signed request`)
  }
}

// Private Functions

async function getSignedRequest(file, uuid) {
  let s3FileName = buildFileName(file.name, uuid)
  let url = `http://localhost:3001/sign-s3?file-name=${s3FileName}&file-type=${file.type}`
  const res = await fetch(url);
  if (res.status === 200) {
    const data = await res.json();
    return data
  }
  else {
    console.log(`There was an error with your request`)
  }
}

async function postToS3(file, signedRequest) {
  try {
    const res = await fetch(signedRequest, {
      method: "PUT",
      body: file,
      headers: {
        'Content-Type': file.type
      }
    });
    console.log(`Image was posted successfully to S3`)
    return res;
  } catch (error) {
    console.log(`ERROR POSTING TO S3, reason: ${error}`)
  }
}

function buildFileName(filename, uuid) {
  let extension = filename.split(".").pop();
  return `${uuid}.${extension}`
}

export default uploadImage;
