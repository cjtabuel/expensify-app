import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from '../actions/auth'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Card,
  Container,
  CardContent,
  Grid,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core'

import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    padding: '15px',
  },
  resetPasswordFooter: {
    paddingLeft: '17px',
    paddingRight: '17px',
  }
})

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ResetPassword = (props) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const sendPasswordResetEmailAction = useCallback((email) => dispatch(sendPasswordResetEmail(email)))

  // user email input state
  const [userEmail, setUserEmail] = useState('')

  // user email error state
  const [userDoesNotExistErr, setUserDoesNotExistErr] = useState(false)
  const [userEmailErr, setUserEmailErrMsg] = useState(false)

  // send reset password email success state
  const [sendPasswordResetEmailSuccess, setSendPasswordResetEmailSuccess] = useState(false)

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value)
  }
  const handleResetEmailSubmission = (e) => {
    e.preventDefault()

    sendPasswordResetEmailAction(userEmail)
      .then(() => {
        setUserEmail('')
        setSendPasswordResetEmailSuccess(true)
      })
      .catch(error => {
        const errCode = error.code

        if (errCode === 'auth/user-not-found') {
          setUserDoesNotExistErr(true)
        } else if (errCode === 'auth/invalid-email') {
          setUserEmailErrMsg(true)
        }
      })
  }
  const handleCloseSendPasswordResetEmailSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSendPasswordResetEmailSuccess(false)
  }
  const handleCloseUserNotExistErr = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setUserDoesNotExistErr(false)
  }
  const handleUserEmailErr = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setUserEmailErrMsg(false)
  }
  return (
    <div>
      <Container>
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
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12}>
                  <Typography variant="h4">
                    <Box fontWeight={300} m={1}>
                      Reset Password
                  </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" align="center">
                    Enter your email address:
                </Typography>
                </Grid>
              </Grid>
              <form onSubmit={handleResetEmailSubmission}>
                <Grid container alignItems="center" direction="row" spacing={2}>
                  <Grid item xs={12} >
                    <TextField
                      name="txtEmail"
                      id="txtEmail"
                      color="primary"
                      fullWidth
                      label="Email"
                      onChange={handleUserEmail}
                      type="email"
                      value={userEmail}
                      variant="outlined"
                      size="small"
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
                      Submit
                    </Button>
                  </Grid>

                </Grid>
              </form>
            </CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={0}
              className={classes.resetPasswordFooter}
            >
              <Grid item xs={12}>
                <Typography variant="caption" align="center">
                  Back to login?
                </Typography>
                <Button component={Link} to='/' color="primary" size="small">Click here</Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Snackbar open={userDoesNotExistErr} autoHideDuration={6000} onClose={handleCloseUserNotExistErr}>
          <Alert onClose={handleCloseUserNotExistErr} severity="error">
            That user does not exist. Please try again.
          </Alert>
        </Snackbar>
        <Snackbar open={userEmailErr} autoHideDuration={6000} onClose={handleUserEmailErr}>
          <Alert onClose={handleUserEmailErr} severity="error">
            Please provide an email address to reset your password.
          </Alert>
        </Snackbar>
        <Snackbar open={sendPasswordResetEmailSuccess} autoHideDuration={6000} onClose={handleCloseSendPasswordResetEmailSuccess}>
          <Alert onClose={handleCloseSendPasswordResetEmailSuccess} severity="success">
            A reset password link has been sent to {userEmail}.
          </Alert>
        </Snackbar>
      </Container>
    </div>
  )
}

export default ResetPassword