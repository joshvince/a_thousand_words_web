/* Actions for getting sign in credentials to and from the server */

async function getUserList() {
  const response = await fetch('http://localhost:3001/users/all')
  return await response.json()
}

async function signIn(user) {
  const urlQuery = `?user-id=${user.id}`
  const response = await fetch(`http://localhost:3001/signin${urlQuery}`)
  return await response.json()
}

const UserApi = {
  getUserList: getUserList,
  signIn: signIn
}

export default UserApi