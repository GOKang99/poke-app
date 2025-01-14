import PokemonInput from "./PokemonInput";
import Loading from "./Loading";

const PokemonList = ({
  pokemons,
  loading,
  error,
  onSearch,
  onGenerationChange,
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">에러: {error}</p>;
  }

  const handleGenerationChange = (event) => {
    onGenerationChange(Number(event.target.value));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        포켓몬 검색
      </h1>
      <PokemonInput onSearch={onSearch} />
      <div className="mt-4 flex justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
          <button
            key={gen}
            value={gen}
            onClick={handleGenerationChange}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {gen}세대
          </button>
        ))}
      </div>
      {pokemons.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {pokemons.map((pokemon) => (
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
