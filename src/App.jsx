import React, { useState, useEffect } from "react";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import "./App.css";
import Paginador from "./Components/Paginator/Paginator";
import { FavoriteProvider } from "./Context/FavoriteContext";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import PokemonPage from "./Components/PokemonPage/PokemonPage";
import SeachBar from "./Components/SeachBar/SeachBar";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(24, 24 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      console.log(results);
      setPokemons(results);
      setTotalPages(Math.ceil(data.count / 24));
      setLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    const result = await searchPokemon(pokemon);
    if (!result) {
      alert("Ivalid search");
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
  };

  const updateFavoritePokemons = (name) => {
    const update = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      update.splice(isFavorite, 1);
    } else {
      update.push(name);
    }
    setFavorites(update);
  };

  const getFavorites = async (favorites) => {
    try {
      setLoading(true);
      const promises = favorites.map(async (pokemon) => {
        const data = await searchPokemon(pokemon);
        return data;
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setPage(0);
      setTotalPages(1);
      setLoading(false);
    } catch (err) {}
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div className="App">
        <header className="header">
          <h1>PokeMon</h1>
          <nav className="nav">
            <div className="nav-row">
              <SeachBar onSearch={onSearch} />
              <div className="favorites">
                <span>&#10084;&#65039;</span> = {favorites.length}{" "}
              </div>
            </div>
            <div className="btns-container">
              <div className="btns-row">
                <button onClick={() => getFavorites(favorites)}>
                  Favoritos
                </button>
                <button onClick={() => fetchPokemons()}>Mostrar todos</button>
              </div>
              <div className="btns-row">
                <button onClick={() => setPage(0)}>
                  <AiOutlineDoubleLeft />
                </button>
                <Paginador
                  nextPage={nextPage}
                  prevPage={prevPage}
                  page={page + 1}
                  totalPages={totalPages}
                />
                <button onClick={() => setPage(48)}>
                  <AiOutlineDoubleRight />
                </button>
              </div>
            </div>
          </nav>
        </header>
        {loading ? "Loading..." : <PokemonPage pokemons={pokemons} />}
        <div className="container">
          <button onClick={() => setPage(0)}>
            <AiOutlineDoubleLeft />
          </button>
          <Paginador
            nextPage={nextPage}
            prevPage={prevPage}
            page={page + 1}
            totalPages={totalPages}
          />
          <button onClick={() => setPage(48)}>
            <AiOutlineDoubleRight />
          </button>
        </div>
      </div>
    </FavoriteProvider>
  );
}

export default App;
