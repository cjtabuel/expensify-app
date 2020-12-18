import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSetCurrencySetting } from '../actions/app-settings'

import {
  Box,
  Button,
  TextField,
  MenuItem,
  Grid,
  ListItemIcon,
  Typography,
  Snackbar,
} from '@material-ui/core'

import MuiAlert from '@material-ui/lab/Alert';

import currencyFixtures from '../fixtures/currencyFixtures'
import SettingsIcon from '@material-ui/icons/Settings';
import SaveIcon from '@material-ui/icons/Save'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CurrencySetting = () => {
  // dispatch actions
  const dispatch = useDispatch()
  const setCurrencySettingAction = useCallback((currency) => dispatch(startSetCurrencySetting(currency)))

  // fetch user currency setting
  const currencySettings = useSelector((state) => state.appSettings.currencySettings)

  // set user currency preferences
  const [currency, setCurrency] = useState(currencySettings)

  // set save success msg
  const [saveSuccess, setSaveSucccessMsg] = useState(false)

  const handleCurrencySetting = () => {
    setCurrencySettingAction(currency)
      .then(() => {
        setSaveSucccessMsg(true)
      })
  }
  const handleChange = (e) => {
    const currencyOptions = currencyFixtures.find((option) => option.value === e.target.value)
    setCurrency(currencyOptions)
  }
  const handleCloseSaveSuccessMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaveSucccessMsg(false);
  };

  return (
    <div>
      <Grid container direction="row" alignItems="center" justify="flex-start" spacing={1}>
        <Grid item xs={1}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
        </Grid>
        <Grid item>
          <Typography variant="h6" align="left">
            <Box fontWeight={300} m={1}>
              Application Settings
              </Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={currency.value}
              onChange={handleChange}
              helperText="Please select your currency"
              variant="outlined"
            >
              {currencyFixtures.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label} {option.value} <span>123.45</span>
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="caption" align="center">
            &#8226; This setting will be applied as the currency for your expenses
        </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleCurrencySetting}
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
      </Grid>
      <Snackbar
        open={saveSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSaveSuccessMsg}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
        <Alert onClose={handleCloseSaveSuccessMsg} severity="success">
          Your currency setting has been updated successfully!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CurrencySetting