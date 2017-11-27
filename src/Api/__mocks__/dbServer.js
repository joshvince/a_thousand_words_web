/* Mocks the module that handles interaction with db server to avoid network during tests */

// PUBLIC API

/*
getSignedRequest
Takes in a filename and a valid filetype.
Returns an object containing a signedrequest string and a url
*/
async function getSignedRequest(filename, fileType) {
  console.log("hit the dbserver mock")
  return {url: "url", signedRequest: "12345"}
}

/*
uploadStory
Takes in a story object
Sends the object to the DB for insertion into the database
Returns {success: true, object: object} if it was successful,
 {success: false, reason: reason} otherwise
*/

async function uploadStory(storyObject) {
  console.log("UPLOADED STORY TO MOCK")
  return {success: true, object: storyObject}
}

const dbServer = {
  getSignedRequest: getSignedRequest,
  uploadStory: uploadStory
}

export default dbServer;
