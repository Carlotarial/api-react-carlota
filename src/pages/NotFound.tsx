import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <h1>404 - Página no encontrada</h1>
      <p>La página que buscas no existe.</p>
      <img
        src="https://i.pinimg.com/originals/69/26/48/69264848b938c47b734070fb4d342100.gif"
        alt="Rick & Morty GIF"
      />
      <Link
        to="/?page=1"
        style={{
          color: "#0b4f6c",
          textDecoration: "underline",
          marginTop: "2rem",
          display: "inline-block",
        }}
      >
        Volver a la página principal
      </Link>
    </div>
  );
}
