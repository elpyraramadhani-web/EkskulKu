"use client";
import { useActionState } from "react";
import { daftarEkskul, type HasilDaftar } from "@/app/actions";

export default function FormDaftar({
  ekskulId,
  namaAwal,
  kelasAwal,
}: {
  ekskulId: number;
  namaAwal: string;
  kelasAwal: string;
}) {
  const awal: HasilDaftar = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: namaAwal, kelas: kelasAwal },
  };
  const [hasil, aksi, sedangKirim] = useActionState(daftarEkskul, awal);

  return (
    <form action={aksi} className="mt-6 space-y-3 border-t pt-4">
      <h2 className="text-lg font-semibold">Daftar ekskul ini</h2>
      <input type="hidden" name="ekskulId" value={ekskulId} />

      <div>
        <input
          name="nama"
          defaultValue={hasil.isian.nama}
          placeholder="Nama"
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.nama && (
          <p className="mt-1 text-sm text-red-600">{hasil.galat.nama}</p>
        )}
      </div>

      <div>
        <input
          name="kelas"
          defaultValue={hasil.isian.kelas}
          placeholder="Kelas (misalnya XI RPL 1)"
          className="block w-full rounded border px-3 py-2"
        />
        {hasil.galat.kelas && (
          <p className="mt-1 text-sm text-red-600">{hasil.galat.kelas}</p>
        )}
      </div>

      {hasil.pesan && (
        <p className={hasil.berhasil ? "text-green-700" : "text-red-600"}>
          {hasil.pesan}
        </p>
      )}

      <button
        disabled={sedangKirim}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {sedangKirim ? "Memproses..." : "Daftar"}
      </button>
    </form>
  );
}