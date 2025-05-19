import React from "react";

function Dashboard({ score, total, streak }) {
  return (
    <div style={{ margin: "2rem" }}>
      <h2>Your Progress</h2>
      <div>Quiz Score: <b>{score}/{total}</b></div>
      <div>Current Streak: <b>{streak}</b></div>
      <div>Total Flashcards: <b>{total}</b></div>
    </div>
  );
}

export default Dashboard;