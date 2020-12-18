import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { startLogout, sendEmailVerificationToUser } from '../actions/auth'

// MaterialUI imports
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ListItemIcon,
  Snackbar,
  Typography,
} from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EmailVerificationDialog = () => {
  const dispatch = useDispatch()
  const startLogoutAction = useCallback(() => dispatch(startLogout()))
  const startSendEmailVerificationToUserAction = useCallback(() => dispatch(sendEmailVerificationToUser()))

  const userEmail = useSelector(state => state.auth.userEmail)

  const [sendEmailVerificationSuccess, setSendEmailVerificationSuccess] = useState(false)
  const [sendEmailVerificationRequestError, setSendEmailVerificationRequestError] = useState(false)

  const handleSendVerification = () => {
    startSendEmailVerificationToUserAction()
      .then(() => {
        console.log('re-sending email')
        setSendEmailVerificationSuccess(true)
      })
      .catch(error => {
        const errCode = error.code

        if (errCode === "auth/too-many-requests") {
          setSendEmailVerificationRequestError(true)
          console.log(error)
        }
      })

  }
  const handleUserLogin = () => {
    console.log('going back to login')
    startLogoutAction()
  }
  const handleSaveEmailVerificationSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSendEmailVerificationSuccess(false)
  }
  const handleSendEmailVerificationRequestError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSendEmailVerificationRequestError(false)
  }
  return (
    <div>
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" component='div'>
          <Grid container direction='row' justify="flex-start" alignItems="center">
            <Grid item>
              <ListItemIcon fontSize='large'>
                <CheckCircleOutlineIcon color='primary' fontSize='large' />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <Typography variant="h5" align="left" component='div'>
                <Box fontWeight={300}>
                  Verify your email
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers component='div'>
          <DialogContentText component='div'>
            <Typography variant="h6" component='div'>
              <Box fontWeight={500} m={1} >
                Thank you for signing up for Expensify!
              </Box>
            </Typography>
          </DialogContentText>
          <DialogContentText component='div'>
            <Typography component='div'>
              <Box fontWeight={300} m={1}>
                We want to make sure the credentials you are using belong to you. We have sent a verification email to {userEmail} for you to verify your account.
              </Box>
            </Typography>
          </DialogContentText>
          <DialogContentText component='div'>
            <Typography component='div'>
              <Box fontWeight={300} m={1}>
                Once you have been verified, you may proceed to the login page of the Expensify Application.
              </Box>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendVerification} color='secondary' variant='contained'>
            Re-send Verification
          </Button>
          <Button onClick={handleUserLogin} color="primary" variant='contained'>
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={sendEmailVerificationSuccess}
        autoHideDuration={6000}
        onClose={handleSaveEmailVerificationSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSaveEmailVerificationSuccess} severity="success">
          A verification email has been to {userEmail}
        </Alert>
      </Snackbar>
      <Snackbar
        open={sendEmailVerificationRequestError}
        autoHideDuration={6000}
        onClose={handleSendEmailVerificationRequestError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSendEmailVerificationRequestError} severity="error">
          Too many requests have been made from this device. Please try again later.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmailVerificationDialog