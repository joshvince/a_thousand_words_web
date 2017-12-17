/* CRUD operations for stories */
import PictureApi from './PictureApi';
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
    // Send it off to the DB
    return dbServer.uploadStory(payload).then(resp => {
      return resp.success ? resp.object : `Error creating the story in DB: ${resp.reason}`
    })

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
    PictureApi.create(rawStepData.data.imageFile, userId).then(picture => {
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
  return stripBlanks(payload)
}

function stripBlanks(rawStepData) {
  let blanks = findBlanks(rawStepData)
  
  return (blanks.length) ? deleteBlanks(blanks, rawStepData) : rawStepData
}

function findBlanks(object) {
  let entries = Object.entries(object);
  let blankEntries = entries.filter( entry => isBlank(entry[0], entry[1]) )
  return blankEntries.map(entry => entry[0])
}

function isBlank(key,value) {
  return (value.length === 0) ? true : false
}

function deleteBlanks(keys, object) {
  keys.forEach( key => delete object[key] )
  return object
}

const StoryApi = {
  getStoriesByUser: getStoriesByUser,
  getOneStory: getOneStory,
  create: create
}

export default StoryApi;
