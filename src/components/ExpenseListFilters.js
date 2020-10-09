import React from 'react'
import { connect } from 'react-redux'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters'
import { DateRangePicker } from 'react-dates'

class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  }
  onTextChange = (e) => {
    const searchText = e.target.value
    this.props.setTextFilter(searchText)
  }
  onChangeSort = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate()
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount()
    }
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate)
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  }
  render() {
    return (
      <div>
        <input 
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange}/>
        <select
          value={this.props.filters.sortBy} 
          onChange={this.onChangeSort}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker 
          startDate = {this.props.filters.startDate}
          startDateId = 'start'
          endDate = {this.props.filters.endDate}
          endDateId = 'end'
          onDatesChange = {this.onDatesChange}
          focusedInput = {this.state.calendarFocused}
          onFocusChange = {this.onFocusChange}
          showClearDates = {true}
          numberOfMonths = {1}
          isOutsideRange = {() => false}
        />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (searchText) => dispatch(setTextFilter(searchText)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
  }
}

export { ExpenseListFilters }
export default connect(mapStateToProps, mapDispatchToProps) (ExpenseListFilters)