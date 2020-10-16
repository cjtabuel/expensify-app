import db from '../firebase/firebase'

// ADD_EXPENSE
const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
})

// startAddExpense
const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0   
    } = expenseData

    const expense = { description, note, amount, createdAt }

    return db.ref('expenses')
      .push(expense)
      .then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }))
      })
  }
}

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  }
}

// EDIT_EXPENSE
const editExpense = (id, updates) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updates
  }
}

export { 
  addExpense,
  startAddExpense,
  removeExpense,
  editExpense
}