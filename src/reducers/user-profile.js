const userProfileDefaultState = {
  firstName: '',
  middleName: '',
  lastName: ''
}

export const userProfileReducer = (state = userProfileDefaultState, action) => {
  switch(action.type) {
    case 'SET_USER_PROFILE':
      return {
        ...state,
        ...action.userInfo
      }
    case 'FETCH_USER_PROFILE':
      return {
        ...state,
        ...action.userInfo
      }
    default:
      return state
  }
}

export { userProfileReducer as default }