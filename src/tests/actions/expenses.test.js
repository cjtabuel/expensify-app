import {
  addExpense,
  startAddExpense,
  editExpense, 
  removeExpense,
  setExpenses,
  startSetExpenses 
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import db from '../../firebase/firebase'

const createMockStore = configureStore([thunk])

beforeEach((done) => {
  const expensesData = {}

  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })

  db.ref('expenses').set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should setup edit expense action object', () => {
  const action = editExpense('123', { amount: 300 })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      amount: 300
    }
  })
})

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
})

test('should add expense to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: 'mouse',
    amount: '3000',
    note: 'sale',
    createdAt: 1000
  }

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    })

  return db.ref(`expenses/${actions[0].expense.id}`).once('value')})
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData)
      done()
    })
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({})
  const expenseDataDefault = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDataDefault
      }
    })

  return db.ref(`expenses/${actions[0].expense.id}`).once('value')})
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDataDefault)
      done()
    })
})

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})


test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({})
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })
    done()
  })
})