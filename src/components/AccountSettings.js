import React from 'react'
import { useSelector } from 'react-redux'
import UpdatePasswordForm from './UpdatePasswordForm'
import AccountManagement from './AccountManagement'
import UpdateEmailForm from './UpdateEmailForm'
import CurrencySetting from './CurrencySetting'

import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

const AccountSettings = () => {
  const loginMethod = useSelector((state) => state.auth.loginMethod)

  return (
    <div>
      <Container fixed>
        <Grid container spacing={0} alignItems="center" justify='center'>
          <Grid item xs={12}>
            <Typography variant="h5" align="left">
              <Box fontWeight={300} m={1}>
                Account Settings
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
        </Grid>

        <CurrencySetting />
        {loginMethod === 'password' && <UpdateEmailForm />}
        {loginMethod === 'password' && <UpdatePasswordForm />}
        <AccountManagement />
      </Container>
    </div>
  )
}



export default AccountSettings