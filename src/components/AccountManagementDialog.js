import React, { useState } from 'react'

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
} from '@material-ui/core';

const AccountManagementDialog = ({ accountManagementDialogOpen, setAccountManagementDialogOpen, handleDeleteUserAccount }) => {
  const [confirmDeletion, setConfirmDeletionState] = useState(false)
  const [confirmUnderstanding, setConfirmUnderstandingState] = useState(false)

  const handleDeleteUser = () => {
    if (!!confirmDeletion && !!confirmUnderstanding) {
      handleDeleteUserAccount()
    }
  }
  const handleClose = () => {
    setAccountManagementDialogOpen(false)
    setConfirmDeletionState(false)
    setConfirmUnderstandingState(false)
  }
  const handleConfirmDeletion = (e) => {
    setConfirmDeletionState(e.target.checked)
  }
  const handleConfirmUnderstanding = (e) => {
    setConfirmUnderstandingState(e.target.checked)
  }

  return (
    <div>
      <Dialog open={accountManagementDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
        <DialogContent dividers>
          <Grid container direction='column' spacing={2}>
            <Grid item xs={12}>
              <DialogContentText>
                &#42; Are you sure you want to delete your account?
              </DialogContentText>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={confirmDeletion}
                    onChange={handleConfirmDeletion}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />}
                label='Yes, I am sure.'
              />
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>
                &#42; Deleting your account would mean the deletion of your complete account with Expensify and all your recorded expenses.
              </DialogContentText>
              <DialogContentText>
                &#42; If you choose to continue, we cannot retrieve your data should you choose to join us again in the future.
              </DialogContentText>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={confirmUnderstanding}
                    onChange={handleConfirmUnderstanding}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />}
                label='I understand.'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteUser}
            color="primary"
            variant='contained'
            disabled={!!confirmDeletion && !!confirmUnderstanding ? false : true}
          >
            Confirm
          </Button>
          <Button onClick={handleClose} color="secondary" variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AccountManagementDialog
