import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import type { Character } from "../types/Character.tsx";

interface ApiInfo {
  next: string | null;
  prev: string | null;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [info, setInfo] = useState<ApiInfo | null>(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      });
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Rick and Morty Characters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} info={info} />
    </div>
  );
}
