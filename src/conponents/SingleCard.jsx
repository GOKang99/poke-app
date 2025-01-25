import React from "react";
import "./SingleCard.css";
function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };
  return (
    <div
      className={`card border-2 border-gray-300 rounded-lg shadow-md ${
        flipped ? "flipped" : ""
      }`}
      key={card.id}
    >
      <div className="relative" onClick={handleClick}>
        <div className={flipped ? "flipped" : ""}>
          <img
            className="front w-20 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
            src={card.src}
            alt="card front"
          />
          <img
            className="back w-20 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
            src="/logo.png"
            alt="card back"
          />
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
