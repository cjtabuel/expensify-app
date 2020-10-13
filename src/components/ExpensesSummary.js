import React from 'react'
import { connect } from 'react-redux'
import selectExpensesTotal from '../selectors/expenses-total'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

const ExpensesSummary = (props) => (
  <div>
    <p>
      Viewing {props.expenseCount} totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}
    </p>
  </div>
)

const mapStateToProps = (state) => {
  return {
    expenseCount: selectExpenses(state.expenses, state.filters).length,
    expensesTotal: selectExpensesTotal(selectExpenses(state.expenses, state.filters))
  }
}

export { ExpensesSummary }
export default connect(mapStateToProps)(ExpensesSummary)