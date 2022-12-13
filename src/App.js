import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './pages/meals';
import Drinks from './pages/drinks';
import Done from './pages/DoneRecipes';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';
import ProfilePage from './pages/profile-pages';
import Favorite from './pages/FavoriteRecipes';

function App() {
  return (
    <div>

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ ProfilePage } />
        <Route exact path="/favorite-recipes" component={ Favorite } />
        <Route exact path="/done-recipes" component={ Done } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      </Switch>
    </div>
  );
}

export default App;
