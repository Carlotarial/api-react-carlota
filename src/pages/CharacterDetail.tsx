import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Character } from "../types/Character.tsx";

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data));
  }, [id]);

  if (!character) {
    return <p className="text-white p-6">Cargando...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Link to="/" className="text-indigo-400 underline">
        ← Volver
      </Link>

      <div className="max-w-xl mx-auto bg-gray-800 rounded-xl mt-6 p-6">
        <img
          src={character.image}
          alt={character.name}
          className="rounded-xl mb-4"
        />
        <h1 className="text-2xl font-bold">{character.name}</h1>
        <p>Estado: {character.status}</p>
        <p>Especie: {character.species}</p>
        <p>Género: {character.gender}</p>
        <p>Origen: {character.origin.name}</p>
      </div>
    </div>
  );
}
