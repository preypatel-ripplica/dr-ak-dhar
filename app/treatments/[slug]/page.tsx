import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreatmentPage from "@/components/TreatmentPage";
import { getTreatment, getTreatmentSlugs } from "@/lib/cms";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getTreatmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) return { title: "Treatment" };
  return {
    title: treatment.title,
    description: treatment.summary,
  };
}

export default async function TreatmentSlugPage({ params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) notFound();
  return <TreatmentPage treatment={treatment} />;
}

