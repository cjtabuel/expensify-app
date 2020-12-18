import {
  firebase,
  googleAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  githubAuthProvider,
} from '../firebase/firebase'
import { history } from '../routers/AppRouter'

import { startSetUserInformation } from '../actions/user-profile'
import { startSetCurrencySetting } from '../actions/app-settings'

// LOGIN
export const login = (uid, loginMethod, userEmail, isUserEmailVerified) => {
  return {
    type: 'LOGIN',
    uid,
    loginMethod,
    userEmail,
    isUserEmailVerified
  }
}

export const startLoginGoogle = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
  }
}

export const startLoginFacebook = () => {
  return () => {
    return firebase.auth().signInWithPopup(facebookAuthProvider)
  }
}

export const startLoginTwitter = () => {
  return () => {
    return firebase.auth().signInWithPopup(twitterAuthProvider)
  }
}

export const startLoginGithub = () => {
  return () => {
    return firebase.auth().signInWithPopup(githubAuthProvider)
  }
}

export const startLoginEmailAndPassword = (email, password) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }
}

// create a user with email and password
export const createUserWithEmailAndPassword = (email, password, userInfo, currency) => {
  return (dispatch) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        userData.user.sendEmailVerification()
        dispatch(startSetUserInformation(userInfo, userData.user.uid))
        dispatch(startSetCurrencySetting(currency, userData.user.uid))
      })
  }
}

// send verification email
export const sendEmailVerificationToUser = () => {
  const user = firebase.auth().currentUser

  return () => {
    return user.sendEmailVerification()
  }
}

// send password reset email to user
export const sendPasswordResetEmail = (email) => {
  return () => {
    return firebase.auth().sendPasswordResetEmail(email)
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

// UPDATE_USER_EMAIL
export const updateUserEmail = (newEmail) => {
  const user = firebase.auth().currentUser

  return () => {
    return user.updateEmail(newEmail)
  }
}

// reauthenticate user with current password before updating password or email
export const reauthenticateUser = (currentPassword) => {
  const user = firebase.auth().currentUser
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)

  return () => {
    return user.reauthenticateWithCredential(cred)
  }
}

// UPDATE_USER_PASSWORD
export const updateUserPassword = (newPassword) => {
  const user = firebase.auth().currentUser

  return () => {
    return user.updatePassword(newPassword)
  }
}

// DELETE_USER_ACCOUNT
export const deleteUserAccount = () => {
  const user = firebase.auth().currentUser

  return () => {
    return user.delete()
  }
}