import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Link from '@mui/material/Link';


const useStyles = makeStyles(theme => ({
  appBar: {
    maxHeight:'60px',
    top: "auto",
    bottom: 0,
    textAlign:"center",
   // color:'#2D4250'
  },
  footer: {
    display:"flex",
    justifyContent:"center",
  }
}));
export const Footer = () => {
  const classes = useStyles();

  return (
    <React.Fragment >
      <CssBaseline />
      <AppBar  style={{backgroundColor:'#2D4250'}}  className={classes.appBar}>
        <Toolbar className={classes.footer}>
        <Link href="https://www.highradius.com/privacy-policy/"  target="_blank" color='#0a8ee5'  underline="always">' Privacy Policy '</Link>
          <Typography align="center" >| © 2022 Highradius.All Rights Reserved.</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

