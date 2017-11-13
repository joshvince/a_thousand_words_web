/* Actions for getting sign in credentials to and from the server */
const API_URL = process.env.REACT_APP_API_URL

async function getUserList() {
  const response = await fetch(`${API_URL}/users/all`)
  return await response.json()
}

async function signIn(user) {
  const urlQuery = `?user-id=${user.id}`
  const response = await fetch(`${API_URL}/signin${urlQuery}`)
  return await response.json()
}

const UserApi = {
  getUserList: getUserList,
  signIn: signIn
}

export default UserApi