import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../actions/auth'
import { setDarkModeTheme } from '../actions/app-settings'

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Box
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 210,
  },
  fullList: {
    width: 'auto',
  },
  toolbar: theme.mixins.toolbar,
}));

const Header2 = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  // const darkModeSetting = useSelector((state) => state.appSettings.darkMode)
  const darkModeSetting = JSON.parse(localStorage.getItem('themePreference'))

  const [toggle, setToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(darkModeSetting)

  const startLogoutAction = useCallback(() => dispatch(startLogout()))
  const setDarkModeAction = useCallback((darkMode) => dispatch(setDarkModeTheme(darkMode)))

  const toggleDrawer = () => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setToggle(!toggle);
  }
  const onSetDarkMode = () => {
    setDarkMode(!darkMode)
  }
  const handleUserLogout = () => {
    startLogoutAction()
  }

  useEffect(() => {
    setDarkModeAction(darkMode)
    localStorage.setItem('themePreference', darkMode)
  }, [darkMode])

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Box fontWeight={300} m={1}>
              <Link className="appbar__item" to="/">
                Expensify
              </Link>
            </Box>
          </Typography>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer('right', true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
        <SwipeableDrawer
          anchor={'right'}
          open={toggle}
          onClose={toggleDrawer()}
          onOpen={toggleDrawer()}
        >
          <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <Link className="appbar__item" to="/dashboard">
                <ListItem button key={2}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Dashboard'} />
                </ListItem>
              </Link>
              <Link className="appbar__item" to="/profile">
                <ListItem button key={3}>
                  <ListItemIcon>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Profile'} />
                </ListItem>
              </Link>
              <Link className="appbar__item" to="/settings">
                <ListItem button key={2}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Settings'} />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </div>
          <ListItem button key={4}>
            <ListItemIcon>
              <Switch
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                size="small"
                checked={darkMode}
                onChange={onSetDarkMode}
              />
            </ListItemIcon>
            <ListItemText primary={'Dark mode'} />
          </ListItem>
          <Divider />
          <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
          >
            <ListItem button key={1} onClick={handleUserLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Sign Out'} />
            </ListItem>
          </div>
        </SwipeableDrawer>
      </div>
    </div>
  );
}

export { Header2 as default }

