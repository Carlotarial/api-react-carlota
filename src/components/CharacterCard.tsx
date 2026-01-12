import { Link } from "react-router-dom";
import type { Character } from "../types/Character.tsx";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <Link to={`/character/${character.id}`}>
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
        <img src={character.image} alt={character.name} />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{character.name}</h2>
          <p className="text-sm text-gray-400">{character.species}</p>
        </div>
      </div>
    </Link>
  );
}
