/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
// Import "material" library for building UI with React components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Icon } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import { useState } from 'react';

// Define styling for the header
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontType: 'bold',
    fontFamily: 'sans-serif', 
    fontSize: '24px', 
    color: 'white'
  },
  appBar:{
    backgroundColor: '#4499ff',
    shadows: ['none'],
  },
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "50%",
    margin: "auto",
  },
  icons:{
    height: '36px',
    width: 'auto',
    color: '#4499ff',
  },
  buttons:{
    marginRight: '10px',
    borderRadius: '100px',
  },
}));

// Header component, displayed on every page
// Links to every other page
const Header = () => {
  const classes = useStyles();
  const [showSidebar, setShowSidebar] = useState('none');

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Button className={classes.buttons} 
            variant="contained"
            onClick={() => setShowSidebar(display => display !== 'none' ? 'none' : 'inherit')}>
            <Icon className={classes.icons}>
              <MenuIcon/>
            </Icon>
          </Button>

          <Typography variant="h6" className={classes.title} color="inherit" >
            Campus Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar show={showSidebar}/>
    </div>
  );    
}

export default Header;
