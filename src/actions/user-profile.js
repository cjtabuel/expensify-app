import db from '../firebase/firebase'

// SET_USER_PROFILE
export const setUserInformation = (userInfo) => ({
  type: 'SET_USER_PROFILE',
  userInfo
})

export const startSetUserInformation = (userInfo = {}, uid) => {
  return (dispatch, getState) => {
    const {
      firstName = '',
      middleName = '',
      lastName = '',
    } = userInfo

    const user = { firstName, middleName, lastName }
    const userUID = getState().auth.uid || uid

    return db.ref(`users/${userUID}/userProfile`)
      .set(user)
      .then(() => {
        dispatch(setUserInformation(user))
      })
  }
}

// FETCH_USER_PROFILE
export const fetchUserProfile = (userInfo) => ({
  type: 'FETCH_USER_PROFILE',
  userInfo
})

export const startFetchUserProfile = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid

    return db.ref(`users/${uid}/userProfile`).once('value')
      .then((snapshot) => {
        if (snapshot.val() !== null) {
          dispatch(fetchUserProfile(snapshot.val()))
        }
      })
  }
}
