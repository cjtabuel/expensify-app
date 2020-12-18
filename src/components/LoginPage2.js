import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLoginGoogle, startLoginFacebook, startLoginTwitter, startLoginGithub, startLoginEmailAndPassword } from '../actions/auth'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Typography,
  IconButton,
  Container,
  Snackbar,
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import GitHubIcon from '@material-ui/icons/GitHub'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import MailIcon from '@material-ui/icons/Mail';

import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    padding: '15px'
  },
  loginFooter: {
    paddingLeft: '17px',
    paddingRight: '17px',
  }
})

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginPage2 = () => {
  // user email and password login state
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  // login actions
  const dispatch = useDispatch()
  const startLoginGoogleAction = useCallback(() => dispatch(startLoginGoogle()))
  const startLoginFacebookAction = useCallback(() => dispatch(startLoginFacebook()))
  const startLoginTwitterAction = useCallback(() => dispatch(startLoginTwitter()))
  const startLoginGithubAction = useCallback(() => dispatch(startLoginGithub()))
  const startLoginEmailAndPassAction = useCallback((email, password) => dispatch(startLoginEmailAndPassword(email, password)))

  // error states
  const [loginErr, setLoginErrMsg] = useState(false)
  const [userDoesNotExistErr, setUserDoesNotExistErr] = useState(false)
  const [accountAlreadyExistsError, setAccountAleadyExistsError] = useState(false)

  const classes = useStyles()

  // email and password login handlers
  const handleUserEmail = (e) => {
    setUserEmail(e.target.value)
  }
  const handleUserPassword = (e) => {
    setUserPassword(e.target.value)
  }

  // user login handlers 
  const handleLoginWithEmailAndPassword = (e) => {
    e.preventDefault()
    if (userEmail.length === 0 || userPassword.length === 0) {
      setLoginErrMsg(true)
    }
    startLoginEmailAndPassAction(userEmail, userPassword)
      .then(() => {
        setLoginErrMsg(false)
        setUserDoesNotExistErr(false)
      })
      .catch(error => {
        const errCode = error.code

        console.log(errCode)
        if (errCode === 'auth/user-not-found') {
          setUserDoesNotExistErr(true)
        } else if (errCode === 'auth/invalid-email' || errCode === 'auth/wrong-password') {
          setLoginErrMsg(true)
        }
      })

  }
  const handleLoginWithGoogle = () => {
    startLoginGoogleAction()
      .catch(error => {
        const errCode = error.code

        if (errCode === 'auth/account-exists-with-different-credential') {
          setAccountAleadyExistsError(true)
        }
      })
  }
  const handleLoginWithFacebook = () => {
    startLoginFacebookAction()
      .catch(error => {
        const errCode = error.code

        if (errCode === 'auth/account-exists-with-different-credential') {
          setAccountAleadyExistsError(true)
        }
      })

  }
  const handleLoginWithTwitter = () => {
    startLoginTwitterAction()
      .catch(error => {
        const errCode = error.code

        if (errCode === 'auth/account-exists-with-different-credential') {
          setAccountAleadyExistsError(true)
        }
      })
  }
  const handleLoginWithGitHub = () => {
    startLoginGithubAction()
      .catch(error => {
        const errCode = error.code

        if (errCode === 'auth/account-exists-with-different-credential') {
          setAccountAleadyExistsError(true)
        }
      })
  }

  // error alert handlers
  const handleCloseLoginErr = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setLoginErrMsg(false)
  }
  const handleCloseUserNotExistErr = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUserDoesNotExistErr(false)
  }
  const handleCloseAccountAlreadyExistsError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAccountAleadyExistsError(false)
  }

  // show password handler
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <Container fixed>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={4} alignItems="center" justify="center" direction="column">
              <Grid item xs={12}>
                <Typography variant="h3" align="center">
                  <Box fontWeight={300} m={1}>
                    Expensify
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" align="center">
                  Choose login method
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center" direction="row" justify="space-between">
              <Grid item>
                <IconButton onClick={handleLoginWithGoogle}>
                  <MailIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={handleLoginWithFacebook}>
                  <FacebookIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={handleLoginWithTwitter}>
                  <TwitterIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={handleLoginWithGitHub}>
                  <GitHubIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container alignItems="center" direction="row" justify="space-between" spacing={4}>
              <Grid item xs={5}>
                <hr />
              </Grid>
              <Grid item>
                <span>or</span>
              </Grid>
              <Grid item xs={5}>
                <hr />
              </Grid>
            </Grid>
            <form onSubmit={handleLoginWithEmailAndPassword}>

              <Grid container alignItems="center" direction="row" spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    color="primary"
                    fullWidth
                    id="txtEmail"
                    label="Email"
                    name="txtEmail"
                    onChange={handleUserEmail}
                    size="small"
                    type="email"
                    value={userEmail}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="true"
                    color="primary"
                    fullWidth
                    id="txtPassword"
                    label="Password"
                    name="txtPassword"
                    onChange={handleUserPassword}
                    size="small"
                    type={showPassword ? 'text' : 'password'}
                    value={userPassword}
                    variant="outlined"
                    InputProps={{
                      endAdornment:
                        <IconButton
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                        </IconButton>
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
              <Snackbar open={loginErr} autoHideDuration={6000} onClose={handleCloseLoginErr}>
                <Alert onClose={handleCloseLoginErr} severity="error">
                  Failed to log in. Please check your log in details.
                </Alert>
              </Snackbar>
              <Snackbar open={userDoesNotExistErr} autoHideDuration={6000} onClose={handleCloseUserNotExistErr}>
                <Alert onClose={handleCloseUserNotExistErr} severity="error">
                  That user does not exist. Please sign up and try again or choose another login method.
                </Alert>
              </Snackbar>
              <Snackbar open={accountAlreadyExistsError} autoHideDuration={10000} onClose={handleCloseAccountAlreadyExistsError}>
                <Alert onClose={handleCloseAccountAlreadyExistsError} severity="error">
                  An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.
                </Alert>
              </Snackbar>
            </form>
          </CardContent>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={0}
            className={classes.loginFooter}
          >
            <Grid item xs={12}>
              <Typography variant="caption" align="center">
                Forgot Password?
              </Typography>
              <Button component={Link} to='/resetpassword' color="primary" size="small">Reset Password</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" align="center">
                Don't have an account?
              </Typography>
              <Button component={Link} to='/signup' color="primary" size="small">Sign up</Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Container>
  )
}

export { LoginPage2 as default }
