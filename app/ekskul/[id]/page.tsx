import { Suspense } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ambilEkskul } from "@/data/ambil";
import { JAM_SESI } from "@/data/ekskul";
import AnggotaEkskul from "@/components/AnggotaEkskul";
import FormDaftar from "@/components/FormDaftar";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const ekskul = await ambilEkskul(Number(id));
  return { title: ekskul ? ekskul.nama : "Ekskul tidak ditemukan" };
}

export default async function DetailEkskul({ params }: Props) {
  const { id } = await params;
  const ekskul = await ambilEkskul(Number(id));
  if (!ekskul) notFound();

  const toples = await cookies();
  const namaAwal = toples.get("nama")?.value ?? "";
  const kelasAwal = toples.get("kelas")?.value ?? "";

  return (
    <article className="rounded-xl border bg-white p-6 text-slate-900">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {ekskul.kategori}
      </span>
      <h1 className="mt-2 text-3xl font-bold">{ekskul.nama}</h1>
      <p className="mt-1 text-slate-500">
        {ekskul.hari} · Sesi {ekskul.sesi} ({JAM_SESI[ekskul.sesi]})
      </p>
      <p className="text-slate-600">Pembina: {ekskul.pembina}</p>

      <FormDaftar
        ekskulId={ekskul.id}
        namaAwal={namaAwal}
        kelasAwal={kelasAwal}
      />

      <section className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">Anggota terdaftar</h2>
        <Suspense fallback={<p className="text-slate-400">Memuat anggota...</p>}>
          <AnggotaEkskul ekskulId={ekskul.id} kuota={ekskul.kuota} />
        </Suspense>
      </section>
    </article>
  );
}