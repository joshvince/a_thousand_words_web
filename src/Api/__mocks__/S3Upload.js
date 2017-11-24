/* Mocks the module that handles interaction with Amazon S3 to avoid charges during tests */

// PUBLIC API

/* 
Upload
 Takes a file, and an object containing a signedRequest and URL
 Returns a url if the image was successfully uploaded to S3.
*/

export default async function S3Upload(file, {signedRequest, url}) {
  console.log("hit the S3 mock!")
  return await "https://c1.staticflickr.com/3/2939/32250580584_23e4cb54d8_b.jpg"
}
