import React from 'react';
import Login from './pages/login';
import Home from './pages/home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PlantDetail from './pages/plantDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/home' component={Home} />
          <Route path='/detail' component={PlantDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
