import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import LandingPage from './layout/LandingPage';
import StopDetails from './layout/StopDetails';
import SearchHistory from './layout/SearchHistory';
import Favourites from './layout/Favourites';


const App = () => {

  return (
      <Router>
        <Route exact path='/' component={LandingPage}></Route>
        <Route exact path='/stops/:id' component={StopDetails}></Route>
        <Route exact path='/searchhistory' component={SearchHistory}></Route>
        <Route exact path='/favourites' component={Favourites}></Route>

      </Router>
  );
};

export default App;
