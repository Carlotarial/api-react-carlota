import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Character } from "../types/Character";
import NotFound from "../pages/NotFound";

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setCharacter(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (error) return <NotFound />;

  if (loading || !character) return <p className="loading">Cargando...</p>;

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        ← Volver
      </Link>

      <div className="detail-card">
        <img src={character.image} alt={character.name} />
        <h1>{character.name}</h1>
        <p>
          <strong>Estado:</strong> {character.status}
        </p>
        <p>
          <strong>Especie:</strong> {character.species}
        </p>
        <p>
          <strong>Género:</strong> {character.gender}
        </p>
        <p>
          <strong>Origen:</strong> {character.origin.name}
        </p>
      </div>
    </div>
  );
}
