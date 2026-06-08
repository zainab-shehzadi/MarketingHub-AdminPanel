import { notFound } from 'next/navigation';
import {
  mockBrands,
  mockBrandAuditHistory,
  mockBrandScoreTrends,
} from '@/lib/mock-data';
import { BrandDetailPage } from '@/components/organizations/BrandDetailPage';

interface BrandDetailRouteProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return mockBrands.map((brand) => ({
    id: brand.id,
  }));
}

export default function BrandDetailRoute({ params }: BrandDetailRouteProps) {
  const { id } = params;

  const brand = mockBrands.find((item) => item.id === id);

  if (!brand) {
    notFound();
  }

  const audits = mockBrandAuditHistory[id] ?? [];
  const scoreTrends = mockBrandScoreTrends[id] ?? [];

  return (
    <BrandDetailPage
      brand={brand}
      audits={audits}
      scoreTrends={scoreTrends}
    />
  );
}