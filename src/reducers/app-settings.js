const appSettingsReducerDefaultState = {
  currencySettings: {
    value: 'USD',
    label: '$'
  },
  darkMode: false
}

const appSettingsReducer = (state = appSettingsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENCY':
      return {
        currencySettings: {
          ...state.currencySettings,
          value: action.value,
          label: action.label
        },
        darkMode: state.darkMode
      }
    case 'SET_DARK_MODE':
      return {
        ...state,
        darkMode: action.darkMode
      }
    case 'FETCH_CURRENCY_SETTING':
      return {
        currencySettings: {
          ...state.currencySettings,
          ...action.currencySetting
        },
        darkMode: state.darkMode
      }
    default:
      return state
  }
}

export { appSettingsReducer as default }