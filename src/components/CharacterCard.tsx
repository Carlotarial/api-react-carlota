import { Link } from "react-router-dom";
import type { Character } from "../types/Character";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <Link to={`/character/${character.id}`} className="character-link">
      <div className="character-card">
        <img src={character.image} alt={character.name} />
        <div className="character-info">
          <h2>{character.name}</h2>
          <p>{character.species}</p>
        </div>
      </div>
    </Link>
  );
}
