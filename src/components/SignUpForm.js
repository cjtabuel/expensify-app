import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { createUserWithEmailAndPassword } from '../actions/auth'
import { setUserInformation } from '../actions/user-profile'
import { setCurrencySetting } from '../actions/app-settings'

import {
  Box,
  Button,
  Container,
  TextField,
  IconButton,
  MenuItem,
  Grid,
  ListItemIcon,
  Snackbar,
  Typography
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import currencyFixtures from '../fixtures/currencyFixtures'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(6),
    }
  },
}))

const SignUpForm = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const createUserWithEmailAndPasswordAction = useCallback((userEmail, userPassword, userInfo, currency) => dispatch(createUserWithEmailAndPassword(userEmail, userPassword, userInfo, currency)))
  const setUserInformationAction = useCallback((userInfo) => dispatch(setUserInformation(userInfo)))
  const setCurrencySettingAction = useCallback((currency) => dispatch(setCurrencySetting(currency)))

  // set user personal info
  const [userFirstName, setUserFirstName] = useState('')
  const [userMiddleName, setUserMiddleName] = useState('')
  const [userLastName, setUserLastName] = useState('')

  // set user account info
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [confirmPassword, setUserConfirmPassword] = useState('')

  // handle acount info error messages
  const [invalidUserEmail, setInvalidUserEmailError] = useState(false)
  const [isPasswordInputInvalid, setPasswordInputInvalidErr] = useState(false)
  const [isPasswordInputEmpty, setPasswordInputEmptyErr] = useState(false)
  const [isConfirmPasswordInputMatch, setConfirmPasswordInputMatchErr] = useState(false)
  const [isConfirmPasswordInputEmpty, setConfirmPasswordInputErr] = useState(false)

  // set user preferences
  const [currency, setCurrency] = useState({ value: 'USD', label: '$' })
  const [userAlreadyExistsErr, setUserAlreadyExistsErr] = useState(false)

  // validate account info error
  const isUserEmailValid = userEmail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? true : false
  const isPasswordValid = userPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,18}$/) ? true : false
  const isConfirmPasswordMatch = confirmPassword === userPassword

  const [showPassword, setShowPassword] = useState(false)

  const setSignUpUser = (e) => {
    e.preventDefault()

    if (isUserEmailValid && isPasswordValid && isConfirmPasswordMatch) {
      const userInfo = {
        firstName: userFirstName,
        middleName: userMiddleName,
        lastName: userLastName
      }

      createUserWithEmailAndPasswordAction(userEmail, userPassword, userInfo, currency)
        .catch(error => {
          const errCode = error.code
          console.log(error)
          if (errCode === 'auth/email-already-in-use') {
            setUserAlreadyExistsErr(true)
          }
        })
      setUserFirstName('')
      setUserMiddleName('')
      setUserLastName('')
      setUserEmail('')
      setUserPassword('')
      setUserConfirmPassword('')
    } else if (!isUserEmailValid) {

      setInvalidUserEmailError(true)
    } else if (!isPasswordValid || userPassword.length === 0) {

      setPasswordInputInvalidErr(true)
      setPasswordInputEmptyErr(true)
    } else if (!isConfirmPasswordMatch || confirmPassword.length === 0) {

      setConfirmPasswordInputMatchErr(true)
      setConfirmPasswordInputErr(true)
    }
  }

  // handle user currency preference
  const handleChange = (e) => {
    const currencyOptions = currencyFixtures.find((option) => option.value === e.target.value)
    setCurrency(currencyOptions)
  }

  // handle user email and password input
  const onHandleEmail = (e) => {
    setUserEmail(e.target.value)
  }
  const onHandlePassword = (e) => {
    const passwordInput = e.target.value.trim()
    setUserPassword(passwordInput)
  }
  const onHandleConfirmPassword = (e) => {
    setUserConfirmPassword(e.target.value.trim())
  }

  // handle user already exists error
  const handleUserAlreadyExistsErr = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setUserAlreadyExistsErr(false)
  }

  // handle show password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }


  useEffect(() => {
    setInvalidUserEmailError(false)
  }, [isUserEmailValid])

  useEffect(() => {
    setPasswordInputInvalidErr(isPasswordValid ? false : true)
  }, [isPasswordValid])

  useEffect(() => {
    setConfirmPasswordInputMatchErr(isConfirmPasswordMatch ? false : true)
  }, [isConfirmPasswordMatch])

  useEffect(() => {
    setPasswordInputEmptyErr(false)
  }, [userPassword.length])

  useEffect(() => {
    setConfirmPasswordInputErr(false)
  }, [confirmPassword.length])

  return (
    <div className={classes.root}>
      <Container fixed>
        <Typography variant="h4" align="left">
          <Box fontWeight={300} m={1}>
            Expensify - Sign Up
          </Box>
        </Typography>
        <form onSubmit={setSignUpUser}>
          <Snackbar open={userAlreadyExistsErr} autoHideDuration={6000} onClose={handleUserAlreadyExistsErr}>
            <Alert onClose={handleUserAlreadyExistsErr} severity="error">
              {`
              The email address, ${userEmail}, is already in use. Please log in using your credentials.
              If this is an error and you have not registered your email for Expensify, please contact support.
              `}
            </Alert>
          </Snackbar>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <hr />
            </Grid>
            <Grid container direction="row" alignItems="center" justify="flex-start" >
              <Grid item xs={1}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <Typography variant="h6" align="left">
                  <Box fontWeight={300} m={1}>
                    Profile Information
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row" alignItems="center">
            <Grid item sm={6} xs={12}>
              <TextField
                variant="outlined"
                size="small"
                label="First Name"
                id="txtFirstName"
                fullWidth
                inputProps={{ maxLength: 50 }}
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                variant="outlined"
                size="small"
                label="Middle Name"
                id="txtMiddleName"
                fullWidth
                inputProps={{ maxLength: 50 }}
                value={userMiddleName}
                onChange={(e) => setUserMiddleName(e.target.value)}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                variant="outlined"
                size="small"
                label="Last Name"
                id="txtLastName"
                fullWidth
                inputProps={{ maxLength: 50 }}
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid container direction="row" alignItems="center" justify="flex-start" >
              <Grid item xs={1}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <Typography variant="h6" align="left">
                  <Box fontWeight={300} m={1}>
                    Application Settings
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row">
            <Grid item xs={6}>
              <div>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={currency.value}
                  onChange={handleChange}
                  helperText="Please select your currency"
                  variant="outlined"
                >
                  {currencyFixtures.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label} {option.value} <span>123.45</span>
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" align="center">
                &#8226; This setting will be applied as the currency for your expenses
            </Typography>
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid container direction="row" alignItems="center" justify="flex-start" >
              <Grid item xs={1}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
              </Grid>
              <Grid item>
                <Typography variant="h6" align="left">
                  <Box fontWeight={300} m={1}>
                    Sign up Information
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={4}>
            <Grid item sm={6} xs={12}>
              <Grid container spacing={1} direction="column" justify="center" >
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Email"
                    id="txtEmailSignup"
                    fullWidth
                    error={invalidUserEmail ? true : false}
                    helperText={invalidUserEmail ? 'Please enter a valid email' : ''}
                    value={userEmail}
                    onChange={onHandleEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="true"
                    variant="outlined"
                    size="small"
                    label="Password"
                    id="txtPasswordSignup"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    error={isPasswordInputEmpty || (isPasswordInputInvalid && userPassword.length > 0) ? true : false}
                    helperText={isPasswordInputEmpty || (isPasswordInputInvalid && userPassword.length > 0) ? 'Please input a valid password' : ''}
                    inputProps={{ maxLength: 16 }}
                    value={userPassword}
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
                    label="Confirm Password"
                    id="txtConfirmPasswordSignup"
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
          <Grid container spacing={2} direction="column" justify="center" >
            <Grid item xs={12}>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign up
            </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  )
}

export { SignUpForm as default }