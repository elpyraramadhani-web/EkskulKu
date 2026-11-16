import { DAFTAR_HARI, DAFTAR_KATEGORI, pendaftar, type Ekskul } from "@/data/ekskul";
import KartuEkskul from "./KartuEkskul";

type Params = { [kunci: string]: string | string[] | undefined };

// ?kategori=a&kategori=b menghasilkan array, ambil yang pertama saja
function satuNilai(nilai: string | string[] | undefined) {
  return Array.isArray(nilai) ? nilai[0] : nilai;
}

export default function KatalogInteraktif({ semua, params }: { semua: Ekskul[]; params: Params }) {
  const kategori =
    DAFTAR_KATEGORI.find((k) => k === satuNilai(params.kategori)) ?? "";
  const hari = DAFTAR_HARI.find((h) => h === satuNilai(params.hari)) ?? "";
  const sisaSaja = satuNilai(params.sisa) === "1"; // ?sisa=1

  const terisiDari = (id: number) =>
    pendaftar.filter((p) => p.ekskulId === id).length;

  const hasil = semua.filter(
    (e) =>
      (kategori === "" || e.kategori === kategori) &&
      (hari === "" || e.hari === hari) &&
      (!sisaSaja || e.kuota - terisiDari(e.id) > 0)
  );

  return (
    <div>
      <form className="mb-4 flex flex-wrap items-center gap-3">
        <select
          name="kategori"
          defaultValue={kategori}
          className="rounded border bg-white px-3 py-2 text-slate-900"
        >
          <option value="">Semua kategori</option>
          {DAFTAR_KATEGORI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <select
          name="hari"
          defaultValue={hari}
          className="rounded border bg-white px-3 py-2 text-slate-900"
        >
          <option value="">Semua hari</option>
          {DAFTAR_HARI.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
                 <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="sisa"
            value="1"
            defaultChecked={sisaSaja}
          />
          Hanya yang masih ada tempat
        </label>

        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Terapkan
        </button>
      </form>

      <p className="mb-3 text-sm text-slate-500">
        {hasil.length} ekskul ditemukan
      </p>

      {hasil.length === 0 ? (
        <p className="text-slate-500">Tidak ada ekskul yang cocok.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((e) => (
            <KartuEkskul
              key={e.id}
              ekskul={e}
              terisi={terisiDari(e.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}