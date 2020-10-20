import { firebase, googleAuthProvider } from  '../firebase/firebase'

// LOGIN
export const login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  }
}

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
  }
}

// LOGOUT
export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut()
  }
}