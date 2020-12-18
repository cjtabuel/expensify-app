import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
} from '@material-ui/core'
import selectExpensesTotal from '../selectors/expenses-total'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      paddingTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      width: theme.spacing(700),
      height: theme.spacing(30),
      backgroundColor: theme.palette.type === 'dark' ? '#2a2a2a' : '#f7f7f7',
    }
  },
}));

export default () => {
  const classes = useStyles();

  // fetch user data
  const visibleExpenses = useSelector((state) => selectExpenses(state.expenses, state.filters))
  const expenseCount = visibleExpenses.length
  const expensesTotal = selectExpensesTotal(visibleExpenses)
  const hiddenExpensesCount = useSelector((state) => state.expenses.length - visibleExpenses.length)

  const currencySettings = useSelector((state) => state.appSettings.currencySettings)

  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  const formattedExpensesTotal = numeral(expensesTotal / 100).format(`0,0.00`)

  return (
    <>
      <div className={classes.root}>
        <Paper elevation={0} square>
          <Container fixed>
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='flex-start'
              spacing={1}
            >
              <Grid item xs={12}>
                <Typography variant="h5" align="left">
                  <Box fontWeight={300} m={1}>
                    Viewing {expenseCount} {expenseWord} totalling the amount of {currencySettings.label}{formattedExpensesTotal}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="left">
                  <Box fontWeight={300} m={1}>
                    {hiddenExpensesCount} expenses hidden due to filters
                  </Box>
                </Typography>
              </Grid>
              <Grid item>
                <Link className='button-add' to="/create">
                  <Button
                    color="secondary"
                    variant="contained"
                    size="medium"
                  >
                    Add Expense
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </div>
    </>
  )
}