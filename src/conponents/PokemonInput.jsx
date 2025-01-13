import { useState } from "react";

const PokemonInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // 입력 값을 상태로 관리
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 동작 방지

    if (inputValue.trim() !== "") {
      onSearch(inputValue.trim()); // 부모 컴포넌트로 입력 값 전달
    } else {
      alert("유효한 포켓몬 이름을 입력해주세요"); // 잘못된 값 처리
    }
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
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
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          검색
        </button>
      </div>
    </form>
  );
};

export default PokemonInput;
