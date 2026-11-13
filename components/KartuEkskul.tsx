import Link from "next/link";
import { JAM_SESI, type Ekskul } from "@/data/ekskul";

export default function KartuEkskul({
  ekskul,
  terisi,
}: {
  ekskul: Ekskul;
  terisi: number;
}) {
  const sisa = ekskul.kuota - terisi;

  return (
    <div className="rounded-xl border bg-white p-4 text-slate-900 shadow-sm">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {ekskul.kategori}
      </span>
      <h2 className="mt-2 text-lg font-semibold">{ekskul.nama}</h2>
      <p className="text-sm text-slate-500">
        {ekskul.hari} · Sesi {ekskul.sesi} ({JAM_SESI[ekskul.sesi]})
      </p>
      <p
        className={
          sisa <= 0 ? "text-sm font-bold text-red-600" : "text-sm text-green-700"
        }
      >
        {sisa <= 0 ? "Penuh" : `Sisa ${sisa} dari ${ekskul.kuota} tempat`}
      </p>
      <Link
        href={`/ekskul/${ekskul.id}`}
        className="mt-3 inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
      >
        Lihat detail
      </Link>
    </div>
  );
}