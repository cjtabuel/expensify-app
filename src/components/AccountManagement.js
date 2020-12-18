import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import AccountManagementDialog from './AccountManagementDialog'
import { deleteUserAccount } from '../actions/auth'

import {
  Button,
  Box,
  Grid,
  ListItemIcon,
  Typography
} from '@material-ui/core'

import SettingsIcon from '@material-ui/icons/Settings';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginBottom: theme.spacing(6),
    }
  },
}))

const AccountManagement = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [accountManagementDialogOpen, setAccountManagementDialogOpen] = useState(false)

  const deleteUserAccountAction = useCallback(() => dispatch(deleteUserAccount()))

  const handleDeleteUserAccount = () => {
    deleteUserAccountAction()
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center" justify="flex-start">
            <Grid item xs={1}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <Typography variant="h6" align="left">
                <Box fontWeight={300} m={1}>
                  Account Management
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            startIcon={<WarningIcon />}
            endIcon={<WarningIcon />}
            onClick={() => setAccountManagementDialogOpen(true)}
          >
            Delete Account
          </Button>
        </Grid>
      </Grid>
      <AccountManagementDialog
        accountManagementDialogOpen={accountManagementDialogOpen}
        setAccountManagementDialogOpen={setAccountManagementDialogOpen}
        handleDeleteUserAccount={handleDeleteUserAccount}
      />
    </div>
  )
}

export default AccountManagement