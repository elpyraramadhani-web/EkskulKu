import Link from "next/link";

export default function EkskulTidakAda() {
  return (
    <div className="rounded-xl border bg-white p-6 text-center text-slate-900">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-slate-500">Ekskul tidak ditemukan.</p>
      <Link
        href="/ekskul"
        className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Kembali ke daftar ekskul
      </Link>
    </div>
  );
}