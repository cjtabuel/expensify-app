import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Grid,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { DateRangePicker } from 'react-dates'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  expenseFilters: {
    marginBottom: theme.spacing(3),
  }
}));

export default () => {
  const classes = useStyles();
  const filters = useSelector((state) => state.filters)

  const [searchText, setSearchText] = useState('')
  const [sortByFilter, setSortByFilter] = useState(filters.sortBy)
  const [calendarFocused, setCalendarFocused] = useState(null)

  const dispatch = useDispatch()
  const setStartDateAction = useCallback((startDate) => dispatch(setStartDate(startDate)))
  const setEndDateAction = useCallback((endDate) => dispatch(setEndDate(endDate)))
  const setTextFilterAction = useCallback((searchText) => dispatch(setTextFilter(searchText)))
  const sortByDateAction = useCallback(() => dispatch(sortByDate()))
  const sortByAmountAction = useCallback(() => dispatch(sortByAmount()))

  const handleSearchText = (e) => {
    const searchText = e.target.value
    setSearchText(searchText)
  }
  const handleSortFilter = (e) => {
    const sortByValue = e.target.value
    setSortByFilter(sortByValue);
  }
  const handleDateChange = ({ startDate, endDate }) => {
    setStartDateAction(startDate)
    setEndDateAction(endDate)
  }
  const handleFocusChange = (focusedInput) => {
    setCalendarFocused(focusedInput)
  }

  useEffect(() => {
    setTextFilterAction(searchText)
  }, [searchText])

  useEffect(() => {
    if (sortByFilter === 'date') {
      sortByDateAction()
    } else if (sortByFilter === 'amount') {
      sortByAmountAction()
    }
  }, [sortByFilter])
  return (
    <div className={classes.expenseFilters}>
      <Container fluid='true'>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12} sm={4}>
            <TextField
              id="searcExpenses"
              label="Search Expenses"
              variant="outlined"
              fullWidth
              value={searchText}
              onChange={handleSearchText}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              labelId="sort-filter"
              id="sort-filter"
              displayEmpty
              fullWidth
              variant='outlined'
              value={sortByFilter}
              onChange={handleSortFilter}
            >
              <MenuItem value="" disabled>
                Sort By
            </MenuItem>
              <MenuItem value={'date'}>Date</MenuItem>
              <MenuItem value={'amount'}>Amount</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <DateRangePicker
              startDate={filters.startDate}
              startDateId='start'
              endDate={filters.endDate}
              endDateId='end'
              onDatesChange={handleDateChange}
              focusedInput={calendarFocused}
              onFocusChange={handleFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
              block={true}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}