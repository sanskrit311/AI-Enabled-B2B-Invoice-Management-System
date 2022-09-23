import { Box, Typography } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Button } from '@mui/material'
import { AppBar } from '@mui/material'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import logo2  from './images/logo.svg'
import logo  from './images/Group 20399.svg'
const useStyles = makeStyles({
  logo: {
    maxWidth: 200,
    marginTop: 0
  },
  logo2: {
    maxWidth: 200,
    marginLeft: '433px'
  },
  typo: {
    flexGrow: 1,
     textAlign: "center",
   
    
  },
  appbar:{
    minHeight: 90,
   
  },
 
});

export const Header = () => {
  const classes = useStyles();
  return (
    
    <AppBar position ="sticky"  style={{ backgroundColor:'#2D4250'}} className={classes.appbar} > 
    <Toolbar  > 
    
    
    <img src={logo} alt="logo" className={classes.logo} />  
    <img src={logo2} alt="logo2"  className={classes.logo2} />  
   
      
    </Toolbar>
    <Typography style={{marginLeft: '50px',fontSize: '1.5rem'}}>Invoice List</Typography>
    </AppBar>
  )
}
