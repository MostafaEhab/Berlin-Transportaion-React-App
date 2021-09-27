import '../css/LandingPage.css';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from '../css/LandingPage.css';
import InputBase from '@material-ui/core/InputBase';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import AppNavBar from './AppNavBar';

export class LandingPage extends Component {
  constructor(){
    super();
    this.state ={
    stop: '', 
    isLoading: true,
    titleSearch : '',
    stopsInfo:[],
    numberOfStops:0,
    input:'',
    favorite: false,
    seen: false,
    listOfFavorites: [],

  }
  this.handleSearch = this.handleSearch.bind(this);
  this.handleAddFavourite= this.handleAddFavourite.bind(this);
  this.handleRemoveFavourite= this.handleRemoveFavourite.bind(this);
  this.goToDepartures= this.goToDepartures.bind(this);
  this.handleChange= this.handleChange.bind(this);
  this.goToSearchHistory= this.goToSearchHistory.bind(this);
  this.goToFavourites= this.goToFavourites.bind(this);


  }
  async componentDidMount() {
    this.setState({ isLoading: false });

  }
  
    async componentDidUpdate() {

      
      await axios.get('https://v5.vbb.transport.rest/locations?query='+ this.state.titleSearch).then((response) => {
      this.setState({
        stopsInfo:response.data,
        numberOfStops:response.data.length,
      });
         });

  }
  
  handleSearch(event) {
    this.setState({ titleSearch: event.target.value })
    setTimeout(() => {  if (localStorage.getItem('search:'+event.target.value ) === null) {
      localStorage.setItem('search:'+event.target.value, JSON.stringify(this.state.stopsInfo)); } }, 2000);

   
  }
  handleAddFavourite(){
    if (localStorage.getItem('favourite:'+this.state.input ) === null) {
    localStorage.setItem('favourite:'+this.state.input , JSON.stringify(this.state.stopsInfo)); 
    this.setState({favorite: true});
 }  
  }
  handleRemoveFavourite(){
    localStorage.removeItem('favourite:'+this.state.input); 
    this.setState({favorite: false});
  }
  goToDepartures(stopId) {
    this.props.history.push( '/stops/' + stopId);
  }
  handleChange (event) {
    this.setState({input: event.target.value});
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
    else if (this.state.numberOfStops===0){
  return (
    <Grid container>
      <AppNavBar/>
     <h1 id="title">
      Berlin Transportation
     </h1>
    <span id ="enterStop">
      <span id="searchBar">
        
    <InputBase
                placeholder='Please enter a stop'
                fullWidth
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={this.state.input}
                onChange= {(input) =>  this.handleChange(input)}
                inputProps={{ 'aria-label': 'search' }}
                endAdornment={<SearchIcon/>}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    this.handleSearch(e);
                  }
                }}
              />
              </span>
    </span>

    </Grid>
  );}
  else {
    return (
      <Grid container>
            <AppNavBar/>
       <h1 id="title">
        Berlin Transportation
       </h1>
      <span id ="enterStopResults">
      <h3 id="stopheader">{this.state.input}  
      <span id="Favourite">
      {localStorage.getItem('favourite:'+this.state.input)!== null? 
                <FavoriteIcon
                onClick={() => {
                  this.handleRemoveFavourite();
                }}/>:
                <FavoriteBorderIcon
                  onClick={() => {
                    this.handleAddFavourite();
                  }}  
                
                />} </span></h3>  
      </span>
         <span>
      <span id="stopNames">
        
      <h3> Stops</h3>
      {this.state.stopsInfo.map((index) => (
        <diV id="stop" onClick={() => {
          this.goToDepartures(index.id);
        }}>
          {index.name}
          
        </diV>
        ))}
      </span> 

      <span id="availableOptions">
        <h3> Available options </h3>
        {this.state.stopsInfo.map((index) => (
        <diV  id="rowSeparation">
          {index.products && index.products.suburban ?
            <span> suburban </span> : null}
             {index.products && index.products.subway ?
            <span> subway </span> : null}
             {index.products && index.products.tram ?
            <span> tram </span> : null}
             {index.products && index.products.bus ?
            <span> bus</span> : null}
             {index.products && index.products.ferry ?
            <span> ferry </span> : null}
             {index.products && index.products.express ?
            <span> express </span> : null}
             {index.products && index.products.regional ?
            <span> regional </span> : null}
        </diV>
        ))} 
      </span>
      </span>  
       
      </Grid>
    );}
}} 
export default LandingPage;

