import { useState, useEffect } from "react";

const PokemonQuiz = ({ pokemons }) => {
  const [currentPokemon, setCurrentPokemon] = useState(null); // 현재 퀴즈에 등장하는 포켓몬
  const [score, setScore] = useState(0); // 점수 관리
  const [userInput, setUserInput] = useState(""); // 사용자 입력
  const [isWrong, setIsWrong] = useState(false); //오답여부
  const [isCorrect, setIsCorrect] = useState(false); //정답여부
  const [canSubmit, setCanSubmit] = useState(true); // 제출 가능 상태 추가

  // 랜덤 포켓몬 선택
  const getRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    return pokemons[randomIndex];
  };

  // 새로운 퀴즈 시작
  const startNewQuiz = () => {
    const randomPokemon = getRandomPokemon();
    setCurrentPokemon(randomPokemon);
    setUserInput(""); // 사용자 입력 초기화
    setIsWrong(false); //새 퀴즈 시작시 false로 변경
    setIsCorrect(false); //새 퀴즈 시작시 정답 false
    setCanSubmit(true); // 새로운 퀴즈 시작 시 제출 가능
  };

  // 사용자가 입력 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPokemon || !canSubmit) return; // 제출 불가 상태에서 동작 차단

    if (userInput.trim() === currentPokemon.name) {
      setScore((prevScore) => prevScore + 1); // 정답 시 점수 증가
      setIsCorrect(true);
    } else {
      setScore((prevScore) => Math.max(prevScore - 1, 0)); // 오답 시 점수 감소, 최소 점수는 0
      setIsWrong(true);
    }
    //퀴즈 시작 전 제출 비활성화.
    setCanSubmit(false);
    // 새로운 퀴즈 시작
    setTimeout(() => {
      startNewQuiz();
    }, 1000);
  };

  // 컴포넌트가 마운트되면 첫 번째 퀴즈 시작
  useEffect(() => {
    startNewQuiz();
  }, [pokemons]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        포켓몬 퀴즈
      </h1>
      <p className="text-center text-lg mb-4">현재 점수: {score}</p>
      {currentPokemon && (
        <div className="text-center">
          <img
            className="w-40 h-40 mx-auto"
            src={currentPokemon.imageUrl}
            alt="포켓몬"
          />
          <p className="text-gray-500">포켓몬을 맞혀보세요!</p>
          {isWrong && <p className="text-red-500">{currentPokemon.name}</p>}
          {isCorrect && <p className="text-blue-500">정답입니다!</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="text-center mt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="포켓몬 이름 입력"
          className="border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default PokemonQuiz;
