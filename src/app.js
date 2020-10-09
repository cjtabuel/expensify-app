import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense, removeExpense, editExpense } from './actions/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

// store.dispatch(addExpense({description: 'Water bill', amount: 200.00}))
// store.dispatch(addExpense({description: 'Gas bill', amount: 300.00}))
// store.dispatch(addExpense({description: 'Rent', amount: 100.00}))

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))