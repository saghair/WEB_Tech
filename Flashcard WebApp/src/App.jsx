import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ThemeToggle from "./components/ThemeToggle";
import Auth from "./components/Auth";
import Flashcard from "./components/Flashcard";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import ImportExport from "./components/ImportExport";
// You can import and use hooks, AI, spaced repetition, etc. as needed

function MainApp() {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      answer: "Paris",
      subject: "Geography",
      img: "",
      audio: ""
    }
    // ...other sample cards
  ]);
  const [view, setView] = useState("home");
  const [flipped, setFlipped] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Update window.flashcards for Export (not best practice, but quick for demo)
  window.flashcards = flashcards;

  return (
    <div className="min-h-screen bg-blue-100 text-gray-800 font-sans">
      <ThemeToggle />
      <Auth />
      <nav style={{ display: "flex", gap: 10, margin: "1rem" }}>
        <button onClick={() => setView("home")}>🏠 Home</button>
        <button onClick={() => setView("review")}>Review</button>
        <button onClick={() => setView("quiz")}>Quiz</button>
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setView("leaderboard")}>Leaderboard</button>
        <button onClick={() => setView("importexport")}>Import/Export</button>
      </nav>
      {view === "home" && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <h1>📚 Flashcard Quiz App</h1>
          <div>Welcome {user ? user.displayName : "Guest"}!</div>
        </div>
      )}
      {view === "review" && (
        <div>
          <Flashcard card={flashcards[current]} flipped={flipped} onFlip={() => setFlipped(f => !f)} />
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => setCurrent(c => (c - 1 + flashcards.length) % flashcards.length)}>Prev</button>
            <button onClick={() => setCurrent(c => (c + 1) % flashcards.length)}>Next</button>
          </div>
        </div>
      )}
      {view === "quiz" && (
        <Quiz flashcards={flashcards} onFinish={() => setView("dashboard")} />
      )}
      {view === "dashboard" && (
        <Dashboard score={score} total={flashcards.length} streak={streak} />
      )}
      {view === "leaderboard" && <Leaderboard />}
      {view === "importexport" && <ImportExport addFlashcards={cards => setFlashcards([...flashcards, ...cards])} />}
      {/* Add more screens as needed */}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;