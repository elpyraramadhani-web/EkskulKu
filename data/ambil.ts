import { ekskul, pendaftar } from "@/data/ekskul";

//Pura pura mengangambil data dari database yang agal lambat
function jeda(ms: number) {
    return new Promise((r)=> setTimeout(r, ms));
}

export async function ambilSemuaEkskul() {
    await jeda(1000);
    return ekskul;
}

export async function ambilEkskul(id: number) {
    await jeda(500);
    return ekskul.find((e)=> e.id === id);
}

//Daftar anggota satu ekskul, urut nomor pendaftaran 
export async function ambilAnggota(eskulId: number) {
    await jeda(1500);
    return pendaftar.filter((p) => p.ekskulId === eskulId).sort((a, b) => a.nomor - b.nomor)
}