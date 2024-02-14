import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <img src="logo.png" width={50} height={"auto"} />
      <div className="ul-header">
        <button>login</button>
        <button>sign up</button>
      </div>
    </header>
  );
}
