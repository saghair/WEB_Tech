import React from "react";
import Papa from "papaparse";

function ImportExport({ addFlashcards }) {
  function handleImport(e) {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const cards = results.data.map(row => ({
          question: row.question,
          answer: row.answer,
          subject: row.subject || "",
          id: Date.now() + Math.random()
        }));
        addFlashcards(cards);
      }
    });
  }

  function handleExport(flashcards) {
    const csv = Papa.unparse(flashcards);
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "flashcards.csv";
    a.click();
  }

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleImport} />
      <button onClick={() => handleExport(window.flashcards)}>Export CSV</button>
    </div>
  );
}

export default ImportExport;