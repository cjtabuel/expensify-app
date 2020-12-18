import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/'

const RemoveNoteDialog = ({ expense, removeExpenseDialogOpen, setRemoveExpenseDialogOpen, onConfirmRemoveExpense }) => {
  const handleClose = () => {
    setRemoveExpenseDialogOpen(false)
  };

  return (
    <div>
      <Dialog
        open={removeExpenseDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Remove Expense'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove '{expense.description}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirmRemoveExpense} color="primary" variant="contained">
            Confirm
          </Button>
          <Button onClick={handleClose} color="secondary" variant="contained" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RemoveNoteDialog
