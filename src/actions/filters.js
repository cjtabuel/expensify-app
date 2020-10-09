// SET_TEXT_FILTER
const setTextFilter = (searchText = '') => {
  return {
    type: 'SET_TEXT_FILTER',
    text: searchText
  }
}

// SORT_BY_AMOUNT
const sortByAmount = () => {
  return {
    type: 'SORT_BY_AMOUNT'
  }
}

// SORT_BY_DATE
const sortByDate = () => {
  return {
    type: 'SORT_BY_DATE'
  }
}

// SET_START_DATE
const setStartDate = (startDate) => {
  return {
    type: 'SET_START_DATE',
    startDate
  }
}

// SET_END_DATE
const setEndDate = (endDate) => {
  return {
    type: 'SET_END_DATE',
    endDate
  }
}

export {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
}