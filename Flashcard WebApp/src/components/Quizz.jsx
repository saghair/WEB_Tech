import React, { useState } from "react";

function Quiz({ flashcards, onFinish }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");

  if (step >= flashcards.length) {
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <div>Score: {score}/{flashcards.length}</div>
        <button onClick={onFinish}>Back to Home</button>
      </div>
    );
  }

  const card = flashcards[step];
  const isMCQ = step % 2 === 0;
  let options = [
    card.answer,
    ...flashcards.filter(c => c.id !== card.id).slice(0, 3).map(c => c.answer)
  ].sort(() => Math.random() - 0.5);

  const checkAnswer = (ans) => {
    if (ans.trim().toLowerCase() === card.answer.trim().toLowerCase()) setScore(s => s + 1);
    setStep(s => s + 1);
    setInput("");
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div className="font-bold">{card.question}</div>
      {isMCQ ? (
        <div>
          {options.map((opt, i) => (
            <button key={i} onClick={() => checkAnswer(opt)}>{opt}</button>
          ))}
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); checkAnswer(input); }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Your answer" />
          <button type="submit">Submit</button>
        </form>
      )}
      <div style={{ marginTop: 8 }}>Progress: {step + 1}/{flashcards.length}</div>
    </div>
  );
}

export default Quiz;