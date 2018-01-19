// Helper functions for dealing with API actions, such as stripping blanks from payloads

/*
Strips blank values from an object and returns the object
*/
function stripBlanks(obj) {
  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      stripBlanks(obj[prop])
    }
    else if(obj[prop] === '') {
      delete obj[prop]
    }
  }
  return obj
}

const Helpers = {
  stripBlanks: stripBlanks
}

export default Helpers;