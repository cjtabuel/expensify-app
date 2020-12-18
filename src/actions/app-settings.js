import db from '../firebase/firebase'

// SET_DARK_MODE
const setDarkModeTheme = (darkMode) => ({
    type: 'SET_DARK_MODE',
    darkMode
})

// SET_CURRENCY
const setCurrencySetting = ({ value, label } = {}) => ({
  type: 'SET_CURRENCY',
  value,
  label
})

const startSetCurrencySetting = (currency = {}, uid) => {
  return (dispatch, getState) => {
    const {
      value = 'USD',
      label = '$'
    } = currency

    const userUID = getState().auth.uid || uid

    const currencySetting = { value, label }
    return db.ref(`users/${userUID}/appSettings/currencySettings`)
      .set(currencySetting)
      .then(() => {
        dispatch(setCurrencySetting(currencySetting))
      })
  }
}

// FETCH_CURRENCY_SETTING
const fetchUserSettings = (currencySetting) => ({
  type: 'FETCH_CURRENCY_SETTING',
  currencySetting
})

const startFetchUserSettings = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    
    return db.ref(`users/${uid}/appSettings/currencySettings/`).once('value')
      .then((snapshot) => {        
        if (snapshot.val() !== null) {
          dispatch(fetchUserSettings(snapshot.val()))
        }
      })
  }
}


export {
  setDarkModeTheme,
  setCurrencySetting,
  startSetCurrencySetting,
  // startEditCurrencySetting,
  startFetchUserSettings
}