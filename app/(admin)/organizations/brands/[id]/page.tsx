

import { notFound } from 'next/navigation';
import { mockBrands, mockBrandAuditHistory, mockBrandScoreTrends } from '@/lib/mock-data';
import { BrandDetailPage } from '@/components/organizations/BrandDetailPage';

interface BrandDetailRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BrandDetailRoute({ params }: BrandDetailRouteProps) {
  const { id } = await params;

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