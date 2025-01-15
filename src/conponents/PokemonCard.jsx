import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
const cardImages = [
  { src: "/images/1.png", matched: false },
  { src: "/images/6.png", matched: false },
  { src: "/images/7.png", matched: false },
  { src: "/images/143.png", matched: false },
  { src: "/images/382.png", matched: false },
  { src: "/images/493.png", matched: false },
];

function PokemonCard() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null); //첫번째 선택 카드
  const [choiceTwo, setChoiceTwo] = useState(null); //두번째 선택 카드
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };
  //카드 선택시 기억하기
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
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

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">포켓몬 카드게임</h1>
      <button
        onClick={shuffleCards}
        className="px-6 py-2 mb-8 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-700 transition"
      >
        New Game
      </button>
      <p>턴수:{turns}</p>
      <div className="grid grid-cols-4 gap-4">
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
