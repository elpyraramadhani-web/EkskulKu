import { pendaftar } from "@/data/ekskul";

export const MAKS_EKSKUL = 2;

function rapikan(teks: string) {
  return teks.trim().toLowerCase().replace(/\s+/g, " ");
}

// murid dikenali dari nama + kelas
export function jumlahEkskulMurid(nama: string, kelas: string) {
  return pendaftar.filter(
    (p) => rapikan(p.nama) === rapikan(nama) && rapikan(p.kelas) === rapikan(kelas)
  ).length;
}