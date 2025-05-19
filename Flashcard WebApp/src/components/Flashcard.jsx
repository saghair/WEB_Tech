import React from "react";

function Flashcard({ card, flipped, onFlip }) {
  return (
    <div className={`card${flipped ? " flipped" : ""}`} onClick={onFlip}>
      {!flipped ? (
        <div>
          <div className="font-bold">{card.question}</div>
          {card.img && <img src={card.img} alt="visual" style={{ width: 100, height: 100 }} />}
        </div>
      ) : (
        <div>
          <div>{card.answer}</div>
          {card.audio && <audio controls src={card.audio}></audio>}
        </div>
      )}
    </div>
  );
}

export default Flashcard;