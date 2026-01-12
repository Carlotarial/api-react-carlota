interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  info: {
    next: string | null;
    prev: string | null;
  } | null;
}

export default function Pagination({ page, setPage, info }: Props) {
  if (!info) return null;

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        className="px-4 py-2 bg-indigo-600 rounded disabled:opacity-50"
        disabled={!info.prev}
        onClick={() => setPage(page - 1)}
      >
        Anterior
      </button>

      <span className="flex items-center">Página {page}</span>

      <button
        className="px-4 py-2 bg-indigo-600 rounded disabled:opacity-50"
        disabled={!info.next}
        onClick={() => setPage(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
