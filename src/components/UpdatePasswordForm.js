import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserPassword, reauthenticateUser } from '../actions/auth'

import {
  Button,
  Box,
  TextField,
  IconButton,
  Grid,
  ListItemIcon,
  Snackbar,
  Typography
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SettingsIcon from '@material-ui/icons/Settings';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UpdatePasswordForm = () => {
  const dispatch = useDispatch()

  // reauthenticate user password before updating password
  const reauthenticateUserAction = useCallback((currentUserPassword) => dispatch((reauthenticateUser(currentUserPassword))))
  // dispatch update user password action
  const updateUserPasswordAction = useCallback((newPassword) => dispatch(updateUserPassword(newPassword)))

  // set currentUserPassword, userPassword, and confirmPassword state
  const [currentUserPassword, setCurrentNewUserPassword] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [confirmPassword, setUserConfirmPassword] = useState('')

  // set show user password
  const [showPassword, setShowPassword] = useState(false)

  // set password error messages
  const [isCurrentPasswordCorrect, setCurrentPasswordCorrectState] = useState(false)
  const [isCurrentPasswordEmpty, setCurrentPasswordEmptyErr] = useState(false)
  const [isPasswordInputInvalid, setPasswordInputInvalidErr] = useState(false)
  const [isPasswordInputEmpty, setPasswordInputEmptyErr] = useState(false)
  const [isConfirmPasswordInputMatch, setConfirmPasswordInputMatchErr] = useState(false)
  const [isConfirmPasswordInputEmpty, setConfirmPasswordInputErr] = useState(false)

  // set update user password success message
  const [updateUserPasswordSuccess, setUpdateUserPasswordSuccess] = useState(false)

  // validate user password validity
  const isPasswordValid = newUserPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,18}$/) ? true : false
  const isConfirmPasswordMatch = confirmPassword === newUserPassword

  const handleChangePassword = (e) => {
    e.preventDefault()

    if (currentUserPassword.length === 0) {
      setCurrentPasswordEmptyErr(true)
    } else {
      reauthenticateUserAction(currentUserPassword)
        .then(() => {
          if (isPasswordValid && isConfirmPasswordMatch) {
            updateUserPasswordAction(newUserPassword)
              .then(() => {
                setCurrentNewUserPassword('')
                setNewUserPassword('')
                setUserConfirmPassword('')
                setPasswordInputInvalidErr(false)
                setUpdateUserPasswordSuccess(true)
              })
              .catch(error => {
                console.log(error)
              })

          } else if (!isPasswordValid || newUserPassword.length === 0) {
            setPasswordInputInvalidErr(true)
            setPasswordInputEmptyErr(true)
          } else if (!isConfirmPasswordMatch || confirmPassword.length === 0) {
            setConfirmPasswordInputMatchErr(true)
            setConfirmPasswordInputErr(true)
          }
        })
        .catch((error) => {
          const errCode = error.code

          if (errCode === 'auth/wrong-password') {
            console.log('wrong password!')
            setCurrentPasswordCorrectState(true)
          }

          console.log(error)
        })
    }
  }
  const onHandleCurrentUserPassword = (e) => {
    const currentPasswordInput = e.target.value.trim()
    setCurrentNewUserPassword(currentPasswordInput)
  }
  const onHandlePassword = (e) => {
    const passwordInput = e.target.value.trim()
    setNewUserPassword(passwordInput)
  }
  const onHandleConfirmPassword = (e) => {
    const confirmPasswordInput = e.target.value.trim()
    setUserConfirmPassword(confirmPasswordInput)
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleCloseUpdateUserPasswordSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setUpdateUserPasswordSuccess(false)
  }
  const handleCloseCurrentPasswordCorrectErr = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setCurrentPasswordCorrectState(false)
  }

  // useEffect(() => {
  //   setCurrentPasswordInputEmptyErr(false)
  // }, [currentUserPassword.length])

  useEffect(() => {
    setPasswordInputInvalidErr(isPasswordValid ? false : true)
  }, [isPasswordValid])

  useEffect(() => {
    setConfirmPasswordInputMatchErr(isConfirmPasswordMatch ? false : true)
  }, [isConfirmPasswordMatch])

  useEffect(() => {
    setPasswordInputEmptyErr(false)
  }, [newUserPassword.length])

  useEffect(() => {
    setConfirmPasswordInputErr(false)
  }, [confirmPassword.length])

  return (
    <div>
      <form onSubmit={handleChangePassword}>
        <Grid container direction="row" alignItems="center" justify="flex-start" >
          <Grid item xs={1}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="left">
              <Box fontWeight={300} m={1}>
                Change Password
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={4}>
          <Grid item sm={6} xs={12}>
            <Grid container spacing={1} direction="column" justify="center" >
              <Grid item xs={12}>
                <TextField
                  autoComplete="true"
                  variant="outlined"
                  size="small"
                  label="Current Password"
                  id="txtCurrentPassword"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  error={isCurrentPasswordEmpty || isCurrentPasswordCorrect ? true : false}
                  helperText={isCurrentPasswordEmpty || isCurrentPasswordCorrect ? 'Please input your current password' : ''}
                  inputProps={{ maxLength: 16 }}
                  value={currentUserPassword}
                  onChange={onHandleCurrentUserPassword}
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
                <TextField
                  autoComplete="true"
                  variant="outlined"
                  size="small"
                  label="New Password"
                  id="txtNewPassword"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  error={isPasswordInputEmpty || (isPasswordInputInvalid && newUserPassword.length > 0) ? true : false}
                  helperText={isPasswordInputEmpty || (isPasswordInputInvalid && newUserPassword.length > 0) ? 'Please input a valid password' : ''}
                  inputProps={{ maxLength: 16 }}
                  value={newUserPassword}
                  onChange={onHandlePassword}
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
                <TextField
                  autoComplete="true"
                  variant="outlined"
                  size="small"
                  label="Confirm New Password"
                  id="txtConfirmNewPassword"
                  type={showPassword ? 'text' : 'password'}
                  error={isConfirmPasswordInputEmpty || (isConfirmPasswordInputMatch && confirmPassword.length > 0) ? true : false}
                  helperText={isConfirmPasswordInputEmpty || (isConfirmPasswordInputMatch && confirmPassword.length > 0) ? 'Password does not match or is not valid' : ''}
                  inputProps={{ maxLength: 16 }}
                  fullWidth
                  value={confirmPassword}
                  onChange={onHandleConfirmPassword}
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
                  size="medium"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Grid container spacing={0} direction="column" justify="center">
              <Grid item xs={12}>
                <Typography variant="caption" align="center">
                  &#42; Your password must be between 8 and 18 characters.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" align="center">
                  &#42; Your password must contain at least one uppercase character.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" align="center">
                  &#42; Your password must contain at least one lowercase letter.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" align="center">
                  &#42; Your password must contain at least one number digit
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" align="center">
                  &#42; Your password must contain at least one special character
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
        </Grid>
        <Snackbar
          open={updateUserPasswordSuccess}
          autoHideDuration={6000}
          onClose={handleCloseUpdateUserPasswordSuccess}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseUpdateUserPasswordSuccess} severity="success">
            Your password has been updated successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={isCurrentPasswordCorrect}
          autoHideDuration={6000}
          onClose={handleCloseCurrentPasswordCorrectErr}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseCurrentPasswordCorrectErr} severity="error">
            Your input for the current password is incorrect. Please check your password.
          </Alert>
        </Snackbar>
      </form>
    </div>
  )
}

export default UpdatePasswordForm