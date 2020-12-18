import React, { useState } from 'react';

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
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const UpdateEmailDialog = ({ updateEmailDialogState, setUpdateEmailDialogState, handleUpdateEmail }) => {
  // set password verification input
  const [verifyPassword, setVerifyPassword] = useState('')

  // set show user password input
  const [showPassword, setShowPassword] = useState(false)

  const handleUserPasswordVerification = (e) => {
    e.preventDefault()

    handleUpdateEmail(verifyPassword)
    setVerifyPassword('')
    setUpdateEmailDialogState(false)
  }
  const handleVerifyPasswordInput = (e) => {
    const passwordInput = e.target.value.trim()
    setVerifyPassword(passwordInput)
  }
  const handleClose = () => {
    setUpdateEmailDialogState(false)
  };

  return (
    <div>
      <Dialog open={updateEmailDialogState} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Verify your password</DialogTitle>
        <form onSubmit={handleUserPasswordVerification}>
          <DialogContent dividers>
            <Grid container direction='column' spacing={2}>
              <Grid item xs={12}>
                <DialogContentText>
                  To update your email address please verify your password below.
                </DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  autoComplete='true'
                  label="Verify Password"
                  id="txtPasswordVerification"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  inputProps={{ maxLength: 16 }}
                  value={verifyPassword}
                  onChange={handleVerifyPasswordInput}
                  InputProps={{
                    endAdornment:
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                      </IconButton>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <DialogContentText>
                  <Typography variant='caption'>
                    Note: You may have to re-verify your email address upon change.
                  </Typography>
                </DialogContentText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant='contained' type='submit'>
              Verify
            </Button>
            <Button onClick={handleClose} color="secondary" variant='contained'>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default UpdateEmailDialog
