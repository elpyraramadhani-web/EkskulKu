import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ekskul, pendaftar, JAM_SESI } from "@/data/ekskul";
import { batalkanPendaftaran } from "@/app/actions";

export const metadata: Metadata = { title: "Ekskul Saya" };

export default async function EkskulSaya() {
  const toples = await cookies();
  const nama = toples.get("nama")?.value ?? "";
  const kelas = toples.get("kelas")?.value ?? "";

  // tanpa cookie
  if (nama === "" || kelas === "") {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">Ekskul Saya</h1>
        <p className="text-slate-500">
          Kamu belum mendaftar apa pun.{" "}
          <Link href="/ekskul" className="text-blue-600 underline">
            Lihat daftar ekskul
          </Link>
        </p>
      </div>
    );
  }

  // pendaftaran milik nama dan kelas di cookie (huruf besar atau kecil tidak dibedakan)
  const milikku = pendaftar
    .filter(
      (p) =>
        p.nama.toLowerCase() === nama.toLowerCase() &&
        p.kelas.toLowerCase() === kelas.toLowerCase()
    )
    .flatMap((p) => {
      const e = ekskul.find((x) => x.id === p.ekskulId);
      return e ? [{ p, e }] : [];
    });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Ekskul Saya</h1>

      {milikku.length === 0 ? (
        <>
          <p className="mb-3 text-slate-600">
            {nama} · {kelas}
          </p>
          <p className="text-slate-500">Belum ada ekskul yang diikuti.</p>
        </>
      ) : (
        <>
          <p className="mb-4 text-slate-600">
            {nama} · {kelas} · {milikku.length} ekskul diikuti
          </p>
          <ul className="space-y-3">
            {milikku.map(({ p, e }) => (
              <li
                key={p.nomor}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white p-4 text-slate-900"
              >
                <div>
                  <Link
                    href={`/ekskul/${e.id}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {e.nama}
                  </Link>
                  <p className="text-sm text-slate-500">
                    {e.hari} · Sesi {e.sesi} ({JAM_SESI[e.sesi]})
                  </p>
                </div>
                <form action={batalkanPendaftaran}>
                  <input type="hidden" name="nomor" value={p.nomor} />
                  <button className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">
                    Batalkan
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}