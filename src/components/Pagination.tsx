interface Props {
  page: number;
  setPage: (newPage: number) => void;
  info: {
    next: string | null;
    prev: string | null;
  } | null;
}

export default function Pagination({ page, setPage, info }: Props) {
  if (!info) return null;

  return (
    <div className="pagination">
      <button disabled={!info.prev} onClick={() => setPage(page - 1)}>
        ← Anterior
      </button>

      <span>Página {page}</span>

      <button disabled={!info.next} onClick={() => setPage(page + 1)}>
        Siguiente →
      </button>
    </div>
  );
}
