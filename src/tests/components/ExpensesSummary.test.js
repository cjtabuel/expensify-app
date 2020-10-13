import React from 'react'
import { ExpensesSummary } from '../../components/ExpensesSummary'
import { shallow } from 'enzyme'

let wrapper, expensesCount, expensesTotal

beforeEach(() => {
  expensesCount = jest.fn()
  expensesTotal = jest.fn()
  wrapper = shallow(
    <ExpensesSummary
      expensesCount = {expensesCount}
      expensesTotal = {expensesTotal}
    />
  )
})

test('should render ExpensesSummary correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

