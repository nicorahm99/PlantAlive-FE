import React from 'react';
import Login from './pages/login';
import Home from './pages/home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PlantDetail from './pages/plantDetail';
import NewPlant from './pages/newPlant';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/home' component={Home} />
          <Route path='/detail/:plantId' component={PlantDetail} />
          <Route path='/new' component={NewPlant} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
