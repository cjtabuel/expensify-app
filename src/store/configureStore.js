import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import authReducer from '../reducers/auth'
import appSettingsReducer from '../reducers/app-settings'
import userProfileReducer from '../reducers/user-profile'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const appReducer = combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
    auth: authReducer,
    appSettings: appSettingsReducer,
    userProfile: userProfileReducer,
  })

  const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      state = undefined
    }
     
    return appReducer(state, action) 
  }
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
}

export default configureStore
