import { ekskul, pendaftar } from "@/data/ekskul";

export const MAKS_EKSKUL = 2;

function rapikan(teks: string) {
  return teks.trim().toLowerCase().replace(/\s+/g, " ");
}

// nama ekskul yang sudah diikuti satu murid (dikenali dari nama + kelas)
export function ekskulYangDiikuti(nama: string, kelas: string) {
  return pendaftar
    .filter(
      (p) =>
        rapikan(p.nama) === rapikan(nama) &&
        rapikan(p.kelas) === rapikan(kelas)
    )
    .map((p) => ekskul.find((e) => e.id === p.ekskulId))
    .filter((e) => e !== undefined)
    .map((e) => e.nama);
}

export function jumlahEkskulMurid(nama: string, kelas: string) {
  return ekskulYangDiikuti(nama, kelas).length;
}