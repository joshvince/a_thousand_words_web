/* CRUD operations for pictures */

async function getAllPictures() { 
  const res = await fetch('http://localhost:3001/pictures/all', {
    accept: 'application/json'
  })
  return await res.json()
}

async function postNewPicture(data){
  const res = await fetch('http://localhost:3001/pictures/new', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const json = await res.json();
  const response = {
    status: res.status,
    json: json
  }
  return response
}

const PictureApi = {
  getAllPictures: getAllPictures,
  postNewPicture: postNewPicture
}

export default PictureApi;