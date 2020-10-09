import expensesReducer from '../../reducers/expenses'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import expenses from '../fixtures/expenses'

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
