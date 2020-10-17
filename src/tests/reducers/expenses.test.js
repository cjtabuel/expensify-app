import expensesReducer from '../../reducers/expenses'
import moment from 'moment'
import expenses from '../fixtures/expenses'
import createMockStore from 'redux-mock-store'

test('should set default expenses state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should remove an expense', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '2'
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Food',
    note: 'paid for food',
    amount: 2500,
    createdAt: moment()
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([
    ...expenses,
    expense
  ])
})

test('should edit an expense', () => {
  const updates = {
    note: 'bought more gum'
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates
  }
  const state = expensesReducer(expenses, action)
  expect(state[0].note).toBe('bought more gum')
})

test('should not edit an expense if id not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '6',
    updates: {
      note: 'bought more gum'
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [
      {
        1: { description: 'test 1', amount: 3000, note: 'test note 1', createdAt: 1000 }
      },
      {
        2: { description: 'test 2', amount: 6000, note: 'test note 2', createdAt: 2000 }
      }
    ]
  }

  const state = expensesReducer(expenses, action)
  expect(state).toEqual(action.expenses)
})