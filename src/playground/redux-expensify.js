import { createStore, combineReducers } from 'redux'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// ADD_EXPENSE
const addExpense = (
  { 
    description = '',
    note = '',
    amount = 0,
    // createdAt = moment().valueOf() 
    createdAt = 0
  } = {}
  ) => {
  return {
    type: 'ADD_EXPENSE',
    expense: {
      id: uuidv4(),
      description: description,
      note: note,
      amount: amount,
      createdAt: createdAt
    }
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

// SET_TEXT_FILTER
const setTextFilter = (searchText = '') => {
  return {
    type: 'SET_TEXT_FILTER',
    text: searchText
  }
}

// SORT_BY_AMOUNT
const sortByAmount = () => {
  return {
    type: 'SORT_BY_AMOUNT'
  }
}

// SORT_BY_DATE
const sortByDate = () => {
  return {
    type: 'SORT_BY_DATE'
  }
}

// SET_START_DATE
const setStartDate = (startDate) => {
  return {
    type: 'SET_START_DATE',
    startDate
  }
}

// SET_END_DATE
const setEndDate = (endDate) => {
  return {
    type: 'SET_END_DATE',
    endDate
  }
}

// Default value for expensesReducer
const expensesReducerDefaultState = []
// Expenses Reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE': 
      return [
        ...state,
        action.expense
      ]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else { 
          return state
        }
      })
    default:
      return state
  }
}

// default value for filtersReducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}
// Filters Reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default: 
    return state
  }
}

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    } else if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    }
  })
}

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
)

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({
  description: 'rent',
  amount: 100,
  createdAt: 1000
}))

const expenseTwo = store.dispatch(addExpense({
  description: 'coffee',
  amount: 200,
  createdAt: 100
}))

// store.dispatch(removeExpense({id: expenseOne.expense.id}))

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('co'))
// store.dispatch(setTextFilter())

// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// const startDate = moment('2020-09-23').valueOf()
// const endDate = moment('2020-09-25').valueOf()

// store.dispatch(setStartDate(125))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))


// const demoState = {
//   expenses: [{
//     id: '123',
//     description: 'Rent',
//     note: 'this is my note',
//     amount: 54500,
//     createdAt: 0
//   }],
//   filters: {
//     text: 'rent',
//     sortBy: 'amount',
//     startDate: undefined,
//     endDate: undefined
//   }
// }
