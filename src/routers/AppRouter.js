import React from 'react'
import { useSelector } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import NotFoundPage from '../components/NotFoundPage'
import ProfilePage from '../components/ProfilePage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import LoginPage2 from '../components/LoginPage2'
import SignUpForm from '../components/SignUpForm'
import Header2 from '../components/Header2'
import ResetPassword from '../components/ResetPassword'
import AccountSettings from '../components/AccountSettings'


const history = createBrowserHistory()

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.uid)

  return (
    <Router history={history}>
      <div>
      {isAuthenticated && <Header2 />}
        <Switch>
          <PublicRoute path="/" component={LoginPage2} exact={true} />
          <PublicRoute path="/signup" component={SignUpForm} />
          <PublicRoute path="/resetpassword" component={ResetPassword} />
          <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
          <PrivateRoute path="/settings" component={AccountSettings} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/create" component={AddExpensePage} />
          <PrivateRoute path="/edit/:id" component={EditExpensePage} />
          <Route component={NotFoundPage} />
          
        </Switch>
      </div>
    </Router>
  )
}



export { history }
export default AppRouter