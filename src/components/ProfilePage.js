import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { startSetUserInformation } from '../actions/user-profile'

import {
  Box,
  Button,
  Container,
  TextField,
  Grid,
  ListItemIcon,
  Typography,
  Snackbar,
} from '@material-ui/core'

import MuiAlert from '@material-ui/lab/Alert';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SaveIcon from '@material-ui/icons/Save'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProfilePage = () => {
  // dispatch actions
  const dispatch = useDispatch()
  const setUserInformationAction = useCallback((userInfo) => dispatch(startSetUserInformation(userInfo)))

  // fetch user info and settings
  const userInfoDetails = useSelector((state) => state.userProfile)

  // set user personal info
  const [userFirstName, setUserFirstName] = useState(userInfoDetails.firstName ? userInfoDetails.firstName : '')
  const [userMiddleName, setUserMiddleName] = useState(userInfoDetails.middleName ? userInfoDetails.middleName : '')
  const [userLastName, setUserLastName] = useState(userInfoDetails.lastName ? userInfoDetails.lastName : '')

  // set save success msg
  const [saveSuccess, setSaveSucccessMsg] = useState(false)

  const setUserInfo = (e) => {
    e.preventDefault()

    const userInfo = {
      firstName: userFirstName,
      middleName: userMiddleName,
      lastName: userLastName
    }

    setUserInformationAction(userInfo)
    setSaveSucccessMsg(true)
  }

  const handleCloseSaveSuccessMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaveSucccessMsg(false);
  };

  return (
    <div>
      <Snackbar open={saveSuccess} autoHideDuration={6000} onClose={handleCloseSaveSuccessMsg}>
        <Alert onClose={handleCloseSaveSuccessMsg} severity="success">
          Profile and settings saved!
        </Alert>
      </Snackbar>
      <Container fixed>
        <form onSubmit={setUserInfo}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography variant="h5" align="left">
                <Box fontWeight={300} m={1}>
                  Profile Information
                </Box>
              </Typography>
            </Grid>
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
          
          <Grid container spacing={2} direction="column" justify="center" >
            <Grid item xs={12}>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  )
}

export default ProfilePage

