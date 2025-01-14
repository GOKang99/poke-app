import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import PokemonList from "./conponents/PokemonList";
import NotFound from "./conponents/Notfound";
import PokemonQuiz from "./conponents/PokemonQuiz";
import Navigator from "./conponents/Navigator";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generation, setGeneration] = useState(1); // 세대 상태 추가

  const generationRanges = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 898],
    9: [899, 1025],
  };

  const filterPokemonsByGeneration = (gen) => {
    const [start, end] = generationRanges[gen];
    return allPokemons.filter(
      (pokemon) => pokemon.id >= start && pokemon.id <= end
    );
  };

  const fetchAllPokemonData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1025`
      );
      if (!response.ok) {
        throw new Error("포켓몬 목록을 가져오는 데 실패했습니다.");
      }

      const data = await response.json();
      const pokemonDetails = [];
      const batchSize = 50;
      const totalBatches = Math.ceil(data.results.length / batchSize);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      for (let i = 0; i < data.results.length; i += batchSize) {
        const batch = data.results.slice(i, i + batchSize);
        const batchDetails = await Promise.all(
          batch.map(async (pokemon) => {
            const detailResponse = await fetch(
              pokemon.url.replace("pokemon", "pokemon-species")
            );
            if (!detailResponse.ok) return null;
            const detailData = await detailResponse.json();
            const koreanNameEntry = detailData.names.find(
              (nameEntry) => nameEntry.language.name === "ko"
            );
            return {
              id: detailData.id,
              name: koreanNameEntry ? koreanNameEntry.name : null,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailData.id}.png`,
            };
          })
        );
        pokemonDetails.push(
          ...batchDetails.filter((pokemon) => pokemon !== null)
        );
        await delay(100);
      }
      setAllPokemons(pokemonDetails.filter((pokemon) => pokemon.name));
      setFilteredPokemons(filterPokemonsByGeneration(generation));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemonData();
  }, []);

  useEffect(() => {
    setFilteredPokemons(filterPokemonsByGeneration(generation));
  }, [generation, allPokemons]);

  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route
          path="/"
          element={
            <PokemonList
              pokemons={filteredPokemons}
              loading={loading}
              error={error}
              onSearch={(searchName) => {
                const results = allPokemons.filter((pokemon) =>
                  pokemon.name.includes(searchName.trim())
                );
                setFilteredPokemons(results);
              }}
              onGenerationChange={setGeneration}
            />
          }
        ></Route>
        <Route
          path="/quiz"
          element={<PokemonQuiz pokemons={filteredPokemons} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
