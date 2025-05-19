import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, orderBy, limit, getDocs } from "firebase/firestore";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function fetchLeaders() {
      const db = getFirestore();
      const q = query(collection(db, "users"), orderBy("score", "desc"), limit(10));
      const snap = await getDocs(q);
      setLeaders(snap.docs.map(doc => doc.data()));
    }
    fetchLeaders();
  }, []);

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Leaderboard</h2>
      <ol>
        {leaders.map((u, i) => (
          <li key={i}>{u.displayName || u.email}: {u.score} pts</li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;