import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { firebase } from './firebase/firebase'
import { startSetExpenses } from './actions/expenses'
import { startFetchUserSettings } from './actions/app-settings'
import { startFetchUserProfile } from './actions/user-profile'
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css'
import 'react-dates/lib/css/_datepicker.css'
import './styles/styles.scss'
import ExpensifyApp from './components/ExpensifyApp'
import LoadingPage from './components/LoadingPage'

const store = configureStore()

const jsx = (
  <Provider store={store}>
    <ExpensifyApp />
  </Provider>
)

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'))
    hasRendered = true
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userProviderData = user.providerData[0].providerId
    const isUserEmailVerified = user.emailVerified

    store.dispatch(login(user.uid, userProviderData, user.email, isUserEmailVerified))
    store.dispatch(startSetExpenses())
    store.dispatch(startFetchUserSettings())
    store.dispatch(startFetchUserProfile())
      .then(() => {
        renderApp()
        if (history.location.pathname === '/') {
          history.push('/dashboard')
        }
      })
  } else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})