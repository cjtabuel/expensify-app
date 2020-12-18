import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment';
import numeral from 'numeral'
import { makeStyles } from '@material-ui/core/styles';

import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    textDecoration: 'none'
  },
  cardSubtitle: {
    color: '#888888',
    fontSize: '.9rem'
  },
  cardTitle: {
    margin: 0,
    wordBreak: "break-all"
  }, 
  cardHeader: {
    backgroundColor: '#ff6666',
  },
  cardSpacing: {
    marginBottom: theme.spacing(1)
  },
  expenseListHeader: {
    backgroundColor: '#f7f7f7',
  }
}));

export default ({ id, description, amount, createdAt }) => {
  const classes = useStyles();
  const currencySettings = useSelector((state) => state.appSettings.currencySettings)
  
  return (
    <>
      <Container fixed>
        <Link to={`/edit/${id}`} className={classes.card}>
          <Card className={classes.cardSpacing}>
            <CardHeader
              className={classes.cardHeader}
            />
            <CardContent>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='flex-start'
                spacing={0}
              >
                <Grid item xs={8} sm={8}>
                  <Typography align='left' className={classes.cardTitle}>
                    {description}
                  </Typography>
                  <Typography align='left' className={classes.cardSubtitle}>
                    {moment(createdAt).format('MMM Do YYYY')}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography align='right'>
                    {currencySettings.label}{numeral(amount / 100).format('0,0.00')}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Link>
      </Container>
    </>
  )
}