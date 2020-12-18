import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import numeral from 'numeral'

import { Button, TextField, Grid, Container } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

const ExpenseForm2 = (props) => {
  const [description, setDescription] = useState(props.expense ? props.expense.description : '')
  const [amount, setAmount] = useState(props.expense ? numeral(props.expense.amount / 100).format('0,0.00').toString() : '')
  const [note, setNote] = useState(props.expense ? props.expense.note : '')
  const [createdAt, setCreatedAt] = useState(props.expense ? moment(props.expense.createdAt) : moment())
  const [calendarFocused, setCalendarFocused] = useState(false)
  const [err, setErr] = useState('')

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  const onSetAmount = (e) => {
    const amount = e.target.value
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setAmount(amount)
    }
  }
  const onNoteChange = (e) => {
    setNote(e.target.value)
  }
  const onDateChange = (createdAt) => {
    if (createdAt) {
      setCreatedAt(createdAt)
    }
  }
  const onFocusChange = ({ focused }) => {
    setCalendarFocused(focused)
  }
  const onHandleSubmit = (e) => {
    e.preventDefault()

    if (!description || !amount) {
      setErr('Please provide a description and amount')
    } else {
      setErr('')

      props.onSubmit({
        description,
        amount: parseFloat(amount, 10) * 100,
        createdAt: createdAt.valueOf(),
        note
      })
      setDescription('')
      setAmount('')
      setNote('')
    }
  }
  return (
    <Container fixed>
      <form onSubmit={onHandleSubmit}>
        {err && <p className="form__error">{err}</p>}
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <TextField
              fullWidth
              label="Description"
              autoFocus
              type="text"
              value={description}
              onChange={onDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              fullWidth
              type="text"
              value={amount}
              onChange={onSetAmount}
            />
          </Grid>
          <Grid item xs={12}>
            <SingleDatePicker
              date={createdAt}
              onDateChange={onDateChange}
              focused={calendarFocused}
              onFocusChange={onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Note"
              multiline
              rows={5}
              fullWidth
              placeholder="Add a note for your expense (optional)"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={note}
              onChange={onNoteChange}
            />
          </Grid>
          <Grid item xs={5}>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveIcon />}
              fullWidth
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Link className='button-cancel' to='/dashboard'>
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Cancel
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default ExpenseForm2