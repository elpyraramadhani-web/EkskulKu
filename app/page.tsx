import Link from "next/link";

export default function Beranda() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Selamat Datang di EkskulKu</h1>
      <p className="max-w-md text-lg text-slate-500">
        Lihat daftar ekstrakurikuler, pilih yang kamu suka, dan temukan
        kegiatan seru di sekolahmu.
      </p>
      <Link
        href="/ekskul"
        className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Lihat Ekskul
      </Link>
    </div>
  );
}