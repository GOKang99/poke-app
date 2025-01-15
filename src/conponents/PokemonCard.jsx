import { useState } from "react";
const cardImages = [
  { src: "/images/1.png" },
  { src: "/images/6.png" },
  { src: "/images/7.png" },
  { src: "/images/143.png" },
  { src: "/images/382.png" },
  { src: "/images/493.png" },
];

function PokemonCard() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    console.log(cards);
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
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            className="card border-2 border-gray-300 rounded-lg shadow-md"
            key={card.id}
          >
            <div>
              <img
                className="front w-full rounded-lg"
                src={card.src}
                alt="card front"
              />
              <img
                className="back w-full rounded-lg"
                src="/logo.png"
                alt="card back"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
