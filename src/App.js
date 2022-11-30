import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './pages/meals';
import Drinks from './pages/drinks';
import Profile from './pages/profile';
import Favorite from './pages/favorite-recipes';
import Done from './pages/done-recipes';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorite-recipes" component={ Favorite } />
        <Route path="/done-recipes" component={ Done } />
      </Switch>
    </div>
  );
}

export default App;
