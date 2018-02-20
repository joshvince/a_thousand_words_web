/* CRUD operations for stories */
import PictureApi from './PictureApi';
import Helpers from './Helpers';
import dbServer from './dbServer';
var uuidv4 = require('uuid');

async function getStoriesByUser(userId) {
  return await dbServer.getStoriesByUser(userId)
}

async function getOneStory(storyId) {
  return await dbServer.getOneStory(storyId)
}

async function create(rawFormData, userId) {
  const storyUuid = uuidv4();
  // Try to create each step in turn
  try {
    let steps = await createStorySteps(rawFormData.steps, userId)
    let payload = {
      userId: userId,
      uuid: storyUuid,
      title: rawFormData.header.title,
      subtitle: rawFormData.header.subtitle,
      steps: steps
    }
    let validatedPayload = validatePayload(payload)
    // Send it off to the DB
    return dbServer.uploadStory(validatedPayload)
    .then(resp => { return resp })
    .catch(error => { return error })

  } catch (error) {
    console.error(`error creating the steps: ${error}`)
  }
}


// PRIVATE FUNCTIONS

function createStorySteps(rawStepArray, userId) {
  let stepPromises = rawStepArray.map(step => createOneStoryStep(step, userId))
  return Promise.all(stepPromises).then(data => data)
}

function createOneStoryStep(rawStepData, userId) {
  return new Promise((resolve, reject) => {
    // Create the Picture with PictureApi
    PictureApi.createWithinStory(rawStepData.data.imageFile, userId).then(picture => {
      let payload = {
        headline: rawStepData.data.headline,
        description: rawStepData.data.description,
        image: picture,
        stepKey: rawStepData.stepKey
      }
      payload = validatePayload(payload)
      resolve(payload)  
    })
  });
}

function validatePayload(payload) {
  return Helpers.stripBlanks(payload)
}

const StoryApi = {
  getStoriesByUser: getStoriesByUser,
  getOneStory: getOneStory,
  create: create
}

export default StoryApi;
