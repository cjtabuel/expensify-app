import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import selectExpensesTotal from '../selectors/expenses-total'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

const ExpensesSummary = ({ expenseCount, expensesTotal, hiddenExpensesCount }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00')

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span> 
          
          <p>
            <span>{hiddenExpensesCount}</span> expenses hidden due to filters.
          </p>
          <div className="page-header__actions">
            <Link className="button" to="/create">Add Expense</Link>
          </div>
        </h1>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
    hiddenExpensesCount: state.expenses.length - visibleExpenses.length
  }
}

export { ExpensesSummary }
export default connect(mapStateToProps)(ExpensesSummary)