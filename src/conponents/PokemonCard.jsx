import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
// const cardImages = [
//   { src: "/images/1.png", matched: false },
//   { src: "/images/6.png", matched: false },
//   { src: "/images/7.png", matched: false },
//   { src: "/images/143.png", matched: false },
//   { src: "/images/382.png", matched: false },
//   { src: "/images/493.png", matched: false },
// ];

function PokemonCard({ pokemons }) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null); //첫번째 선택 카드
  const [choiceTwo, setChoiceTwo] = useState(null); //두번째 선택 카드
  const [disabled, setDisabled] = useState(false);
  const [initialFlip, setInitialFlip] = useState(true); // 초기 애니메이션 상태
  const [level, setLevel] = useState("초급"); //레벨 상태 초급

  //레벨에 따른 등장 포켓몬 개수
  const getPokemonCount = () => {
    return level === "초급" ? 6 : 8;
  };

  //포켓몬 선택 함수
  const getRandomPokemons = () => {
    const shuffled = [...pokemons].sort(() => Math.random() - 0.5); // 포켓몬 배열 섞기
    return shuffled.slice(0, getPokemonCount()); //
  };

  //카드 데이터 생성
  const generateCardImages = () => {
    const selectedPokemons = getRandomPokemons();
    return selectedPokemons.map((pokemon) => ({
      src: pokemon.imageUrl,
      matched: false,
    }));
  };

  //카드 섞기
  const shuffleCards = () => {
    const selectedPokemons = generateCardImages();
    const shuffledCards = [...selectedPokemons, ...selectedPokemons]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);

    setInitialFlip(true); // 초기 애니메이션 활성화
    setTimeout(() => {
      setInitialFlip(false);
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: false }))
      );
    }, shuffledCards.length * 110);
  };

  //카드 선택시 기억하기
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //두가지 카드가 틀렸을 때 선택 카드 초기화, 턴+1
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  //카드 선택 후 두 카드가 같은지 확인
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        //카드가 같으면 카드를 유지
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        //맞았을 때
        resetTurn();
      } else {
        // 틀렸을 때
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // 모든 카드가 매칭된 상태인지 확인
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setTimeout(() => alert("축하합니다! 다음 단계에 도전해보세요!"), 500);
    }
  }, [cards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 ">포켓몬 카드게임</h1>
      <button
        onClick={shuffleCards}
        className="px-6 py-2 mb-8 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-700 transition"
      >
        New Game
      </button>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="mb-4 px-4 py-2 border rounded"
      >
        <option value="초급">초급</option>
        <option value="중급">중급</option>
      </select>
      <p>턴수:{turns}</p>
      <div
        className={`grid grid-cols-4 gap-4 ${
          initialFlip ? "initial-flip" : ""
        }`}
      >
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
