import type { Metadata } from "next";
import { ambilSemuaEkskul } from "@/data/ambil";
import KatalogInteraktif from "@/components/KatalogInteraktif";

export const metadata: Metadata = { title: "Daftar Ekskul" };

type Props = {
  searchParams: Promise<{ [kunci: string]: string | string[] | undefined }>;
};

export default async function DaftarEkskul({ searchParams }: Props) {
  const params = await searchParams;
  const semua = await ambilSemuaEkskul();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Daftar Ekskul</h1>
      <KatalogInteraktif semua={semua} params={params} />
    </div>
  );
}