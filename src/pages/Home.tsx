import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import type { Character } from "../types/Character";
import NotFound from "../pages/NotFound";

interface ApiInfo {
  next: string | null;
  prev: string | null;
  pages: number;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<ApiInfo | null>(null);
  const [error, setError] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const name = searchParams.get("name") || "";
  const species = searchParams.get("species") || "";
  const status = searchParams.get("status") || "";

  useEffect(() => {
    setError(false);

    const query = new URLSearchParams({
      page: page.toString(),
      name,
      species,
      status,
    }).toString();

    fetch(`https://rickandmortyapi.com/api/character?${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setCharacters(data.results);
          setInfo(data.info);
        }
      })
      .catch(() => setError(true));
  }, [page, name, species, status]);

  const updateParam = (key: string, value: string) => {
    const params = Object.fromEntries(searchParams);
    if (value) params[key] = value;
    else delete params[key];
    params.page = "1";
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({ page: "1" });
  };

  if (error) return <NotFound />;

  return (
    <div className="home">
      <h1 onClick={clearFilters} style={{ cursor: "pointer" }}>
        Rick & Morty Characters
      </h1>

      <div className="filters-toggle">
        <button
          className="filter-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
        </button>
      </div>

      {showFilters && (
        <div className="filters-bar">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => updateParam("name", e.target.value)}
          />

          <input
            type="text"
            placeholder="Especie"
            value={species}
            onChange={(e) => updateParam("species", e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => updateParam("status", e.target.value)}
          >
            <option value="">Estado</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>

          <button className="clear-filters" onClick={clearFilters}>
            Eliminar filtros
          </button>
        </div>
      )}

      <div className="character-grid">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <Pagination
        page={page}
        setPage={(p) =>
          setSearchParams({
            ...Object.fromEntries(searchParams),
            page: p.toString(),
          })
        }
        info={info}
      />
    </div>
  );
}
