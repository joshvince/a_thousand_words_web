/* CRUD operations for pictures */

async function getAllPictures() { 
  const res = await fetch('http://localhost:3001/api/pictures', {accept: 'application/json'})
  return await res.json()
}

//FIXME: This function basically does nothing right now. 
// The Mock API is set up to simply return a stock picture as JSON all the time
async function postNewPicture(data){
  const res = await fetch('http://localhost:3001/api/pictures/new', {
    method: "POST",
    body: data
  })
  return await res.json()
}

const PictureApi = {
  getAllPictures: getAllPictures,
  postNewPicture: postNewPicture
}

export default PictureApi;