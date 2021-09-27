import React, { Component } from "react";
import '../css/LandingPage.css';
import { AppBar, Toolbar,IconButton,Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from "react-router-dom";



export  class AppNavBar extends Component {


  goToHome(){
    this.props.history.push( '/');
  }
  goToSearchHistory(){
    this.props.history.push( '/searchhistory/');
  }
  goToFavourites(){
    this.props.history.push( '/favourites/');
  }

  render() {
  
    return (
      <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
    </IconButton>
    <HomeIcon id="home" onClick={() => {
          this.goToHome();
        }} />
    <Button id="history" color="inherit" onClick={() => {
          this.goToSearchHistory();
        }}> History </Button>
      <Button color="inherit" onClick={() => {
          this.goToFavourites();
        }}>Favourites</Button>  </Toolbar>
       </AppBar>
       
    
  
    )}}

export default withRouter(AppNavBar);