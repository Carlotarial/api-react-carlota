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

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const page = isNaN(pageParam) ? 1 : pageParam;

  useEffect(() => {
    setError(false);

    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error || !data.results?.length) {
          setError(true);
        } else {
          setCharacters(data.results.slice(0, 15));
          setInfo({ ...data.info, pages: Math.ceil(data.info?.count / 20) });
        }
      })
      .catch(() => setError(true));
  }, [page]);

  const setPage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (error) return <NotFound />;

  return (
    <div className="home">
      <h1 style={{ cursor: "pointer" }} onClick={() => setPage(1)}>
        Rick & Morty Characters
      </h1>

      <div className="character-grid">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} info={info} />
    </div>
  );
}
