/* Module for interacting with Amazon S3 */

// PUBLIC API

/* 
Upload
 Takes a file, and an object containing a signedRequest and URL
 Returns a url if the image was successfully uploaded to S3.
*/

export default async function S3Upload(file, {signedRequest, url}) {
  return await postToS3(file, signedRequest, url)
}

// Private Functions 

async function postToS3(file, signedRequest, url) {
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
