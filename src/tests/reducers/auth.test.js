import authReducer from '../../reducers/auth'

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual({})
})

test('should set uid on login', () => {
  const loginAction = { type: 'LOGIN', uid: 'cjtaid' }
  const state = authReducer({}, loginAction)
  expect(state).toEqual({
    uid: loginAction.uid
  })
})

test('should set state to empty object on logout', () => {
  const logOutAction = { type: 'LOGOUT' }
  const state = authReducer({}, logOutAction)
  expect(state).toEqual({})
})