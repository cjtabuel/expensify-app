import React from 'react'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'
import { connect } from 'react-redux'

class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense)
    this.props.history.push('/')
  }
  onRemoveExpense = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id })
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <h1>Edit Expense</h1>
        <ExpenseForm 
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemoveExpense}>remove</button>
      </div> 
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id , expense)),
    startRemoveExpense: ({ id }) => dispatch(startRemoveExpense({ id })) 
  }
}

export { EditExpensePage }
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)