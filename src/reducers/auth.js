
export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        loginMethod: action.loginMethod,
        userEmail: action.userEmail,
        isUserEmailVerified: action.isUserEmailVerified
      }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}