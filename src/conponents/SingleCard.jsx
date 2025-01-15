import React from "react";
import "./SingleCard.css";
function SingleCard({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card);
    console.log(card);
  };
  return (
    <div
      className={`card border-2 border-gray-300 rounded-lg shadow-md ${
        flipped ? "flipped" : ""
      }`}
      key={card.id}
    >
      <div className="relative">
        <div className={flipped ? "flipped" : ""}>
          <img
            className="front w-32 h-32 object-cover rounded-lg"
            src={card.src}
            alt="card front"
          />
          <img
            className="back w-32 h-32 object-cover rounded-lg"
            src="/logo.png"
            alt="card back"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
