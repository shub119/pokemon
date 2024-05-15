import React, { useState } from "react";
import "./SeachBar.css";
import { AiOutlineSearch } from "react-icons/ai";

export default function SeachBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    if (e.target.value === 0) {
      setSearch(null);
    } else {
      setSearch(e.target.value.trim());
    }
  };

  const onClick = () => {
    onSearch(search.toLowerCase());
  };

  return (
    <div className="buscador">
      <form onSubmit={onClick}>
        <div className="buscador-input">
          <input
            type="text"
            placeholder="Buscar Pokemon..."
            onChange={onChange}
          />
        </div>
        <div className="buscador-btn">
          <button onClick={onClick}>
            <AiOutlineSearch className="buscador-icon" />
          </button>
        </div>
      </form>
    </div>
  );
}
