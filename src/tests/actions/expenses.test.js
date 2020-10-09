import { addExpense, editExpense, removeExpense } from '../../actions/expenses'
import { v4 as uuidv4 } from 'uuid';

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
  const expenseData = {
    description: 'Rent',
    note: 'Rent payment',
    amount: 50000,
    createdAt: 1000
  }
  const action = addExpense(expenseData)
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
})

test('should setup add expense action object with default values', () => {
  const action = addExpense()
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  })
})