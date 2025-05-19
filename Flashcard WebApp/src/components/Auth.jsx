import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Auth() {
  const { user, signIn, signOut } = useAuth();

  return (
    <div style={{ margin: "1rem" }}>
      {user ? (
        <div>
          <span>Welcome, {user.displayName || user.email}!</span>
          <button onClick={signOut}>Log Out</button>
        </div>
      ) : (
        <button onClick={signIn}>Login with Google</button>
      )}
    </div>
  );
}

export default Auth;