import React from 'react'
import ExpenseList from './ExpenseList'
import ExpenseList2 from './ExpenseList2'
import ExpenseListFilters from './ExpenseListFilters'
import ExpensesSummary from './ExpensesSummary'
import ExpensesSummary2 from './ExpensesSummary2'
import ExpenseListFilters2 from './ExpenseListFilters2'

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary2 />
    <ExpenseListFilters2 />
    <ExpenseList2 />
  </div>
)

export default ExpenseDashboardPage