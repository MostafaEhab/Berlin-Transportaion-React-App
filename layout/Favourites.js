import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import '../css/LandingPage.css';
import Grid from '@material-ui/core/Grid';

import AppNavBar from './AppNavBar';




export  class Favourites extends Component {
  constructor(){
    super();
    this.state ={
      localStorageContent:[],
      isLoading: true,
      titleSearch:'',
      stopInfo:null,

  }
  this.getInfoFromStorage = this.getInfoFromStorage.bind(this);

}
async componentDidMount() {
  for (var i = 0; i < localStorage.length; i++){
    if(localStorage.key(i).charAt(0)==="f")
    this.state.localStorageContent[i]= localStorage.key(i);
}

this.setState({ isLoading: false });
}    
 
  handleClick = () => {
    this.props.toggle();
  };
  goToDepartures(stopId) {
    this.props.history.push('/stops/' + stopId  );
  }
  getInfoFromStorage(event) {
    this.setState({ titleSearch: event.target.value })
   
  }
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
    if (this.state.isLoading) {
      return (
        <div id="loading">
          <CircularProgress />
        </div>
      );
    } 
    else if(this.state.stopInfo== null) {
    return (
      <Grid container> 
       <AppNavBar/>
        <Grid xs={2}></Grid>
          <span>
          {this.state.localStorageContent.map((index) => (
           <span>
       <Grid ><h2 id="stopOffline">{index.substring(10)}</h2>  </Grid>
        <h3> Stops</h3>
        {JSON.parse(localStorage.getItem(index)).map((i) => (
          <diV id="stop"  onClick={() => {
          this.goToDepartures(i.id);
        }}>
            {i.name}
          </diV>
          ))}
        <span >
          <h3> Available options </h3>
          {JSON.parse(localStorage.getItem(index)).map((i) => (
          <diV  id="rowSeparation">
           {i.products && i.products.suburban ?
            <span> suburban </span> : null}
             {i.products && i.products.subway ?
            <span> subway </span> : null}
             {i.products && i.products.tram ?
            <span> tram </span> : null}
             {i.products && i.products.bus ?
            <span> bus</span> : null}
             {i.products && i.products.ferry ?
            <span> ferry </span> : null}
             {i.products && i.products.express ?
            <span> express </span> : null}
             {i.products && i.products.regional ?
            <span> regional </span> : null}
          </diV>
          ))} 
        </span> 

          </span>
          
          
          ))}
          </span>
          </Grid> 
       
    );
  } else {
    
  }
}
}
export default Favourites;