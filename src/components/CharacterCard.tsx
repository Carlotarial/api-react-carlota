import { Link } from "react-router-dom";
import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  const statusColor =
    character.status === "Alive"
      ? "green"
      : character.status === "Dead"
      ? "red"
      : "gray";

  return (
    <Link to={`/character/${character.id}`} className="character-link">
      <div className="character-card">
        <img src={character.image} alt={character.name} />
        <div className="character-info">
          <h2>{character.name}</h2>
          <p>{character.species}</p>
          <p style={{ color: statusColor, fontWeight: 600 }}>
            {character.status}
          </p>
        </div>
      </div>
    </Link>
  );
}
