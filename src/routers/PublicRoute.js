import React from 'react'
import { connect, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useSelector((state) => !!state.auth.uid)
  return (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    )}/>
  )
}

export { PublicRoute as default }