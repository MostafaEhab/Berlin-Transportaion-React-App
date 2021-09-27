import '../css/LandingPage.css';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../css/StopDetails.css'
import AppNavBar from './AppNavBar';


export class StopDetails extends Component {
    constructor(props){
      super(props);
      this.state={
          isLoading: true,
          tripsInfo:[],
      }
      this.stopId = props.match.params.id;

    }
    async componentDidMount() {
        await axios.get('https://v5.vbb.transport.rest/stops/'+this.stopId+'/departures?duration=5').then((response) => {
      this.setState({
       tripsInfo:response.data
      });
         });

        this.setState({ isLoading: false });
    
      }
      render() {
        if (this.state.isLoading) {
          return (
            <div id="loading">
              <CircularProgress />
            </div>
          );
        } 
        else {
      return (
        <Grid container>
         <AppNavBar/>
      <Grid xs={5}> </Grid>
      <Grid xs={2}> <h1 id='Stoptitle'>Stop Details</h1> </Grid> 
      <Grid xs={5}> </Grid>
      <Grid xs={2}> </Grid>
      <Grid xs={2}> 
     <div> <h3>Trip Number</h3></div> 
       {this.state.tripsInfo.map((index) => (
       <diV id="rowSeparation"> {index.tripId} </diV>  
         ))}
       </Grid>
      <Grid xs={2}> <h3>Transportation Type</h3>
      {this.state.tripsInfo.map((index) => (
       <diV id="rowSeparation"> {index.line.product} / {index.line.name} </diV>  
         ))}
      </Grid>
      <Grid xs={2}> <h3>Planned Departure</h3> 
      {this.state.tripsInfo.map((index) => (
       <diV id="rowSeparation"> {index.plannedWhen} </diV>  
         ))}
      </Grid>
      <Grid xs={2}> <h3>Delay</h3>
      {this.state.tripsInfo.map((index) => (
          <diV id="rowSeparation">
      {index.delay ?
        <diV> {index.delay} </diV>   : 0}
      </diV>
      
         ))} </Grid>
      <Grid xs={2}> </Grid>


       </Grid> 
      )
        }

}
}

    export default StopDetails;
