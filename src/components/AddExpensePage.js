import React, { useCallback } from 'react'
import ExpenseForm2 from './ExpenseForm2'
import { useDispatch } from 'react-redux'
import { startAddExpense } from '../actions/expenses'

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      paddingTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
      width: theme.spacing(700),
      height: theme.spacing(14),
      backgroundColor: theme.palette.type === 'dark' ? '#2a2a2a' : '#f7f7f7',
    }
  },
}));

const AddExpensePage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const startAddExpenseAction = useCallback((expense) => dispatch(startAddExpense(expense)))

  const onSubmit = (expense) => {
    startAddExpenseAction(expense)
    props.history.push('/')
  }

  return (
    <div>
      <div className={classes.root}>
        <Paper elevation={0} square>
          <Container fixed>
            <Typography variant="h4" align="left">
              <Box fontWeight={300} m={1}>
                Add Expense
              </Box>
            </Typography>
          </Container>
        </Paper>
      </div>
      <ExpenseForm2
        onSubmit={onSubmit}
      />
    </div>
  )
}

export { AddExpensePage as default }