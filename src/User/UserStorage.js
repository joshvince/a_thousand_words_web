/* This module works with the browser's storage to store user/session data */

function getCurrentUser() {
  const storedData = localStorage.getItem("atwCurrentUser")
  return JSON.parse(storedData);
}

function setCurrentUser(user) {
  localStorage.setItem("atwCurrentUser", JSON.stringify(user))
}

function removeCurrentUser() {
  localStorage.removeItem("atwCurrentUser")
}

const UserStorage = {
  getCurrentUser: getCurrentUser,
  setCurrentUser: setCurrentUser,
  removeCurrentUser: removeCurrentUser
}

export default UserStorage;