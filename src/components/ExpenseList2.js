import React from 'react'
import { useSelector } from 'react-redux'

import selectExpenses from '../selectors/expenses'
import ExpenseListItem2 from '../components/ExpenseListItem2'

import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

export default () => {
  const expenses = useSelector((state) => selectExpenses(state.expenses, state.filters))
  return (
    <div>
      <Container fixed>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <Grid item xs={6}>
            <Typography component='div'>
              <Box fontWeight={300} m={1} align='left'>
                Expense
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component='div'>
              <Box fontWeight={300} m={1} align='right'>
                Amount
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <div className="list-body">
        {
          expenses.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No Expenses</span>
            </div>
          ) : (
              expenses.map((expense, index) => {
                return <ExpenseListItem2 key={index} {...expense} />
              })
            )
        }
      </div>
    </div>
  )
}