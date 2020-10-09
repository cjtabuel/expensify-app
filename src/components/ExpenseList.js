import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No Expense</p>
      ) : (
        props.expenses.map((expense, index) => {
          return <ExpenseListItem key={index} {...expense} />
        })
      )
    }
  </div>
)

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export { ExpenseList }
export default connect(mapStateToProps)(ExpenseList)
