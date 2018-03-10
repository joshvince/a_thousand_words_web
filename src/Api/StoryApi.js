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
  const storyId = uuidv4();
  let payload = {
    userId: userId,
    uuid: storyId,
    title: rawFormData.header.title,
    subtitle: rawFormData.header.subtitle,
    steps: rawFormData.steps
  }
  const validatedPayload = validatePayload(payload);
  return dbServer.uploadStory(validatedPayload)
  .then(resp => resp)
  .catch(err => err)
}

// PRIVATE FUNCTIONS

function validatePayload(payload) {
  let validPayload = Helpers.stripBlanks(payload)
  validPayload = keepOnlyStepData(payload)
  return validPayload
}

function keepOnlyStepData(payload) {
  let stepData = payload.steps.map(step => step.data)
  payload.steps = stepData
  return payload
}

const StoryApi = {
  getStoriesByUser: getStoriesByUser,
  getOneStory: getOneStory,
  create: create
}

export default StoryApi;
