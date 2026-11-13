"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ekskul, pendaftar, tambahPendaftar, JAM_SESI } from "@/data/ekskul";

export type HasilDaftar = {
  berhasil: boolean;
  pesan: string;
  galat: { nama?: string; kelas?: string };
  isian: { nama: string; kelas: string };
};

function jeda(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// huruf besar atau kecil tidak dibedakan
function sama(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export async function daftarEkskul(
  _sebelum: HasilDaftar,
  formData: FormData
): Promise<HasilDaftar> {
  const ekskulId = Number(formData.get("ekskulId"));
  const nama = String(formData.get("nama") ?? "").trim();
  const kelas = String(formData.get("kelas") ?? "").trim();
  const isian = { nama, kelas };

  await jeda(800); // supaya tombol "Memproses..." terlihat

  // 1. galat per kolom
  const galat: HasilDaftar["galat"] = {};
  if (nama.length < 3) galat.nama = "Nama minimal 3 huruf.";
  if (kelas.length < 3) galat.kelas = "Kelas minimal 3 karakter.";
  if (Object.keys(galat).length > 0) {
    return { berhasil: false, pesan: "", galat, isian };
  }

  // id dari DevTools bisa saja diubah: periksa di server
  const tujuan = ekskul.find((e) => e.id === ekskulId);
  if (!tujuan) {
    return { berhasil: false, pesan: "Ekskul tidak ditemukan.", galat: {}, isian };
  }

  // 2. sudah terdaftar di ekskul ini
  const anggotaIni = pendaftar.filter((p) => p.ekskulId === tujuan.id);
  if (anggotaIni.some((p) => sama(p.nama, nama) && sama(p.kelas, kelas))) {
    return {
      berhasil: false,
      pesan: `${nama} (${kelas}) sudah terdaftar di ${tujuan.nama}.`,
      galat: {},
      isian,
    };
  }

  // 3. kuota penuh
  if (anggotaIni.length >= tujuan.kuota) {
    return {
      berhasil: false,
      pesan: `Kuota ${tujuan.nama} sudah penuh (${tujuan.kuota} orang).`,
      galat: {},
      isian,
    };
  }

  // 4. bentrok: murid yang sama sudah ikut ekskul lain di hari dan sesi yang sama
  for (const p of pendaftar) {
    if (!sama(p.nama, nama) || !sama(p.kelas, kelas)) continue;
    const lain = ekskul.find((e) => e.id === p.ekskulId);
    if (
      lain &&
      lain.id !== tujuan.id &&
      lain.hari === tujuan.hari &&
      lain.sesi === tujuan.sesi
    ) {
      return {
        berhasil: false,
        pesan: `Jadwal bentrok dengan ${lain.nama} (${lain.hari}, sesi ${lain.sesi}).`,
        galat: {},
        isian,
      };
    }
  }

  // semua lolos: simpan
  const nomor = tambahPendaftar({ ekskulId: tujuan.id, nama, kelas });

  const toples = await cookies();
  const umur = 60 * 60 * 24 * 30;
  toples.set("nama", nama, { maxAge: umur });
  toples.set("kelas", kelas, { maxAge: umur });

  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${tujuan.id}`);
  revalidatePath("/saya");

  return {
    berhasil: true,
    pesan: `Pendaftaran #${nomor} berhasil: ${tujuan.nama}, ${tujuan.hari}, sesi ${tujuan.sesi} (${JAM_SESI[tujuan.sesi]}).`,
    galat: {},
    isian,
  };
}

export async function batalkanPendaftaran(formData: FormData) {
  const nomor = Number(formData.get("nomor"));
  const toples = await cookies();
  const namaSaya = toples.get("nama")?.value ?? "";
  const kelasSaya = toples.get("kelas")?.value ?? "";

  const i = pendaftar.findIndex((p) => p.nomor === nomor);
  // jangan percaya browser: periksa lagi di server bahwa ini pendaftaran miliknya
  if (i === -1) return;
  if (!sama(pendaftar[i].nama, namaSaya) || !sama(pendaftar[i].kelas, kelasSaya)) {
    return;
  }

  const [batal] = pendaftar.splice(i, 1);

  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${batal.ekskulId}`);
  revalidatePath("/saya");
}