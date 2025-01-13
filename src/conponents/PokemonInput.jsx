import { useState } from "react";

const PokemonInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // 입력 값을 상태로 관리

    if (value.trim() === "") {
      onSearch(""); // 검색어가 없으면 모든 결과를 표시
    } else {
      onSearch(value.trim()); // 검색어로 결과 필터링
    }
  };

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="pokemon-input"
        >
          포켓몬 이름으로 검색:
        </label>
        <input
          id="pokemon-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="이름을 입력하세요"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          aria-label="포켓몬 이름 입력"
        />
      </div>
      <div className="flex items-center justify-between"></div>
    </form>
  );
};

export default PokemonInput;
