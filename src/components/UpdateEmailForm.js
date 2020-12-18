import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserEmail, reauthenticateUser } from '../actions/auth'
import UpdateEmailDialog from './UpdateEmailDialog'

import {
  Button,
  Box,
  TextField,
  Grid,
  ListItemIcon,
  Snackbar,
  Typography
} from '@material-ui/core'

import SettingsIcon from '@material-ui/icons/Settings';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UpdateEmailForm = () => {
  const dispatch = useDispatch()

  // reauthenticate user password before updating email
  const reauthenticateUserAction = useCallback((currentUserPassword) => dispatch((reauthenticateUser(currentUserPassword))))
  // dispatch updateUserEmail action
  const updateUserEmailAction = useCallback((newEmail) => dispatch(updateUserEmail(newEmail)))

  // newUserEmail state and setter
  const [newUserEmail, setNewUserEmail] = useState('')

  // set update email error messages
  const [invalidUserEmail, setInvalidUserEmailError] = useState(false)
  const [emailAlreadyInUseErr, setEmailAlreadyInUseErr] = useState(false)

  // set update email dialog that verifies a users password before updating their email address
  const [updateEmailDialogState, setUpdateEmailDialogState] = useState(false)

  // user password verification error state and setter
  const [passwordVerificationErr, setPasswordVerificationErr] = useState(false)

  // set update email success message
  const [emailUpdateSuccessMessage, setEmailUpdateSuccessMessage] = useState(false)

  // validate user email
  const isUserEmailValid = newUserEmail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? true : false

  const verifyUserBeforeUpdating = (e) => {
    e.preventDefault()

    if (isUserEmailValid) {
      setUpdateEmailDialogState(true)
    } else if (!isUserEmailValid) {
      setInvalidUserEmailError(true)
    }
  }

  const handleUpdateEmail = (currentUserPassword) => {
    reauthenticateUserAction(currentUserPassword)
      .then(() => {
        updateUserEmailAction(newUserEmail)
          .then(() => {
            setNewUserEmail('')
            setEmailUpdateSuccessMessage(true)
          })
          .catch(error => {
            const errCode = error.code

            if (errCode === 'auth/email-already-in-use') {
              setEmailAlreadyInUseErr(true)
            } else if (errCode === 'auth/invalid-email') {
              setInvalidUserEmailError(true)
            }
          })
      })
      .catch(error => {
        const errCode = error.code

        console.log(error)
        if (errCode === 'auth/wrong-password') {
          console.log('wrong password!')
          setPasswordVerificationErr(true)
        }
      })

  }
  const onHandleEmail = (e) => {
    setNewUserEmail(e.target.value.trim())
  }

  const handleCloseInvalidEmailErr = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setInvalidUserEmailError(false)
  }
  const handleCloseEmailAlreadyInUseErr = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setEmailAlreadyInUseErr(false)
  }
  const handleCloseEmailUpdateSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setEmailUpdateSuccessMessage(false)
  }
  const handleClosePasswordVerificationErr = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setPasswordVerificationErr(false)
  }

  useEffect(() => {
    setInvalidUserEmailError(false)
  }, [isUserEmailValid])

  return (
    <div>
      <form onSubmit={verifyUserBeforeUpdating}>
        <Grid container direction="row" alignItems="center" justify="flex-start" spacing={1}>
          <Grid item xs={1}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="left">
              <Box fontWeight={300} m={1}>
                Update Email
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={4}>
          <Grid item sm={6} xs={12}>
            <Grid container spacing={1} direction="column" justify="center" >
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="New Email"
                  id="txtUpdateUserEmail"
                  fullWidth
                  error={invalidUserEmail ? true : false}
                  helperText={invalidUserEmail ? 'Please enter a valid email' : ''}
                  value={newUserEmail}
                  onChange={onHandleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  size="medium"
                  type="submit"
                  variant="contained"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
        </Grid>
        <Snackbar
          open={invalidUserEmail}
          autoHideDuration={6000}
          onClose={handleCloseInvalidEmailErr}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseInvalidEmailErr} severity="error">
            The email you are trying to enter is invalid. Please, try again with a valid email address.
          </Alert>
        </Snackbar>
        <Snackbar
          open={emailAlreadyInUseErr}
          autoHideDuration={6000}
          onClose={handleCloseEmailAlreadyInUseErr}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseEmailAlreadyInUseErr} severity="error">
            That email address {newUserEmail} is already in use. Please, try again with an available email address.
          </Alert>
        </Snackbar>
        <Snackbar
          open={passwordVerificationErr}
          autoHideDuration={6000}
          onClose={handleClosePasswordVerificationErr}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClosePasswordVerificationErr} severity="error">
            Your password input is incorrect. Please, try again.
          </Alert>
        </Snackbar>
        <Snackbar
          open={emailUpdateSuccessMessage}
          autoHideDuration={6000}
          onClose={handleCloseEmailUpdateSuccess}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseEmailUpdateSuccess} severity="success">
            Your email address has been updated successfully!
          </Alert>
        </Snackbar>
      </form>
      <UpdateEmailDialog
        updateEmailDialogState={updateEmailDialogState}
        setUpdateEmailDialogState={setUpdateEmailDialogState}
        handleUpdateEmail={handleUpdateEmail}
      />
    </div>
  )
}

export default UpdateEmailForm