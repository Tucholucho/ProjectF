import './App.css';
import {useState, useEffect} from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {useDispatch, UseSelector} from "react-redux";
import{
  getrAllRecipes,
  getDailyRecipes,
  unfilterRecipe,
  filteredRecipe,
  orderRecipes,
  orderDailyRecipes,
} from "./redux/actions";
import Nav from "./components/Nav/Nav"

function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
    </div>
  );
}

export default App;
