import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ExpenseForm2 from './ExpenseForm2'
import RemoveExpenseDialog from './RemoveExpenseDialog'
import { startRemoveExpense } from '../actions/expenses'
import { startEditExpense } from '../actions/expenses'

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  ListItemIcon,
  Paper,
  Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
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
    },
  },
}));

const EditExpensePage = props => {
  const classes = useStyles();
  const dispatch = useDispatch()

  // edit and remove expense dispatch actions
  const startEditExpenseAction = useCallback((id, expense) => dispatch(startEditExpense(id, expense)))
  const startRemoveExpenseAction = useCallback(({ id }) => dispatch(startRemoveExpense({ id })))

  // fetch expense item from store
  const expenseItem = useSelector((state) => state.expenses.find((expense) => expense.id === props.match.params.id))

  // remove expense confirm modal
  const [removeExpenseDialogOpen, setRemoveExpenseDialogOpen] = useState(false)

  const onSubmit = (expense) => {
    startEditExpenseAction(expenseItem.id, expense)
    props.history.push('/')
  }
  const onConfirmRemoveExpense = () => {
    startRemoveExpenseAction({ id: expenseItem.id })
    setRemoveExpenseDialogOpen(false)
    props.history.push('/')
  }
  return (
    <div>
      <div className={classes.root}>
        <Paper elevation={0} square>
          <Container fixed>
            <Typography variant="h4" align="left">
              <Box fontWeight={300} m={1}>
                Edit Expense
              </Box>
            </Typography>
          </Container>
        </Paper>
      </div>
      <ExpenseForm2
        expense={expenseItem}
        onSubmit={onSubmit}
      />
      <div className='form-footer'>
        <Container fixed>
          <Grid
            container
            direction="column"
            spacing={1}
          >
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid container>
              <Grid container direction="row" alignItems="center" justify="flex-start" >
                <Grid item>
                  <ListItemIcon className='gear-icon'>
                    <SettingsIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item>
                  <Typography variant="h6" align="left">
                    <Box fontWeight={300} m={1}>
                      Manage expense
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
                startIcon={<DeleteIcon />}
                onClick={() => setRemoveExpenseDialogOpen(true)}
              >
                Remove Expense
            </Button>
              <RemoveExpenseDialog
                expense={expenseItem}
                removeExpenseDialogOpen={removeExpenseDialogOpen}
                setRemoveExpenseDialogOpen={setRemoveExpenseDialogOpen}
                onConfirmRemoveExpense={onConfirmRemoveExpense}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export { EditExpensePage as default }