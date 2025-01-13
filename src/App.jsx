import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PokemonList from "./conponents/PokemonList";
import NotFound from "./conponents/Notfound";
import PokemonQuiz from "./conponents/PokemonQuiz";
import Navigator from "./conponents/Navigator";

function App() {
  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path="/" element={<PokemonList />}></Route>
        <Route path="/quiz" element={<PokemonQuiz />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
