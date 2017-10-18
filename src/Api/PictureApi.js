/* CRUD operations for pictures */

async function getAllPictures() { 
  const res = await fetch('http://localhost:3001/api/pictures', {accept: 'application/json'})
  return await res.json()
}

const PictureApi = {
  getAllPictures: getAllPictures
}

export default PictureApi;