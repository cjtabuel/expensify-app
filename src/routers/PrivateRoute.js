import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import EmailVerificationDialog from '../components/EmailVerificationDialog'

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  // validates user login method and user email verification
  const userLoginMethod = useSelector((state) => state.auth.loginMethod)
  const isUserEmailVerified = useSelector((state) => state.auth.isUserEmailVerified)
  const isPasswordLoginMethodAndEmailVerified = (userLoginMethod === 'password' && !isUserEmailVerified)

  const isAuthenticated = useSelector((state) => !!state.auth.uid)
  
  return (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          {isPasswordLoginMethodAndEmailVerified ? <EmailVerificationDialog /> : <Component {...props} />}
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  )
}

export { PrivateRoute as default }