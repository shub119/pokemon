import React from "react";
import "./PokemonPage.css";
import Pokemon from "../Pokemon/Pokemon";

export default function PokemonPage({ pokemons }) {
  return (
    <div className="pokedex-container">
      {pokemons.map((pokemon) => {
        return <Pokemon pokemon={pokemon} key={pokemon.name} />;
      })}
    </div>
  );
}
