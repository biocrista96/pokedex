import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./layout/Home/Home";
import PokemonList from "./views/PokemonsList/PokemonList";
import PokemonDetail from "./views/PokemonDetail/PokemonDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<PokemonList />}></Route>
            <Route path={"/pokemon/:name"} element={<PokemonDetail />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
