import { useState, useEffect } from "react";
import PokemonInput from "./PokemonInput";
import Loading from "./Loading";

const PokemonList = () => {
  const [allPokemons, setAllPokemons] = useState([]); // 모든 포켓몬 저장
  const [filteredPokemons, setFilteredPokemons] = useState([]); // 필터링된 결과
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 모든 포켓몬의 이름, ID, 이미지 URL을 가져오는 함수
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
      const batchSize = 50; // 한 번에 처리할 포켓몬 개수
      const totalBatches = Math.ceil(data.results.length / batchSize); // 총 배치 수
      const delayPerBatch = (100 / totalBatches).toFixed(0); // 각 배치 사이 딜레이 (밀리초)

      for (let i = 0; i < data.results.length; i += batchSize) {
        const batch = data.results.slice(i, i + batchSize);

        const batchDetails = await Promise.all(
          batch.map(async (pokemon) => {
            const detailResponse = await fetch(
              pokemon.url.replace("pokemon", "pokemon-species")
            );

            if (!detailResponse.ok) {
              console.warn(
                "포켓몬 데이터를 가져오는 데 실패했습니다:",
                pokemon.name
              );
              return null;
            }

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

        // 각 배치 간 딜레이 추가
        await delay(delayPerBatch); // 계산된 딜레이 적용
      }

      setAllPokemons(pokemonDetails.filter((pokemon) => pokemon.name));
      setFilteredPokemons(pokemonDetails.slice(0, 1025)); // 초기 10개 표시
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 검색어를 기준으로 실시간 필터링
  const searchPokemonByName = (searchName) => {
    const trimmedName = searchName.trim();
    if (trimmedName === "") {
      setFilteredPokemons(allPokemons.slice(0, 1025)); // 검색어가 없으면 초기 10개 표시
    } else {
      const results = allPokemons.filter((pokemon) =>
        pokemon.name.includes(trimmedName)
      );
      setFilteredPokemons(results); // 필터링 결과 업데이트
    }
  };

  // 컴포넌트가 처음 렌더링될 때 모든 포켓몬의 이름과 ID 가져오기
  useEffect(() => {
    fetchAllPokemonData();
  }, []);

  // 로딩 상태
  if (loading) {
    return <Loading />;
  }

  // 에러 상태
  if (error) {
    return <p className="text-center text-red-500 text-lg">에러: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        포켓몬 검색
      </h1>
      <PokemonInput onSearch={searchPokemonByName} />
      {filteredPokemons.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {filteredPokemons.map((pokemon) => (
            <li
              key={pokemon.id}
              className="bg-white shadow-md rounded overflow-hidden p-4 text-center"
            >
              <span className="block text-gray-500 text-sm">#{pokemon.id}</span>
              <img
                className="w-20 h-20 mx-auto"
                src={pokemon.imageUrl}
                alt={pokemon.name}
              />
              <p className="mt-2 text-gray-700 font-medium capitalize">
                {pokemon.name}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 mt-6">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default PokemonList;
