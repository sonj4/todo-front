import React from "react";
import "./Header.css";

export default function Header({ signOut, user }) {
  console.log(user);
  return (
    <header>
      <img src="logo.png" width={50} height={"auto"} />
      <p>Hi {user.signInDetails.loginId}!</p>
      <button onClick={signOut}>ODJAVI SE</button>
    </header>
  );
}
