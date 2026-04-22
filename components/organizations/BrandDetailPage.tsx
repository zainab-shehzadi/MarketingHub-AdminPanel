'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Globe,
  Mail,
  ShieldBan,
  Sparkles,
  Eye,
  ReceiptText,
  ChartColumn,
} from 'lucide-react';

import { Brand } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PlanBadge } from '@/components/shared/PlanBadge';

type AuditItem = {
  id: string;
  date: string;
  status: 'passed' | 'failed';
  issuesFound: number;
  score: number;
};

type ScoreTrendItem = {
  id: string;
  month: string;
  score: number;
  change?: number;
};

interface BrandDetailPageProps {
  brand: Brand;
  audits: AuditItem[];
  scoreTrends: ScoreTrendItem[];
}

function formatDisplayDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatShortDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function BrandDetailPage({
  brand,
  audits,
  scoreTrends,
}: BrandDetailPageProps) {
  const router = useRouter();

  const latestAudit = audits[0];
  const visibilityScore = brand.visibilityScore ?? latestAudit?.score ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
     

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/organizations" className="hover:text-slate-900">
                Brands
              </Link>
              <span>›</span>
              <span className="text-slate-900">{brand.name}</span>
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                {brand.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Detailed organization profile, subscription state, audits, and visibility history.
              </p>
            </div>
          </div>

     
        </div>
      </div>

      <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                <Building2 className="h-8 w-8" />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-950">{brand.name}</h2>
                <a
                  href={`https://${brand.website.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-sm text-slate-500 hover:text-orange-600"
                >
                  {brand.website}
                </a>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-slate-600">Account Status:</span>
                  <StatusBadge status={brand.status} />
                  {brand.plan && <PlanBadge plan={brand.plan} />}
                  {brand.businessType && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {brand.businessType}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={<Eye className="h-5 w-5" />}
          label="Visibility Score"
          value={`${visibilityScore}%`}
        />
        <StatCard
          icon={<Sparkles className="h-5 w-5" />}
          label="Last Audit"
          value={formatShortDate(latestAudit?.date)}
        />
        <StatCard
          icon={<ReceiptText className="h-5 w-5" />}
          label="Agency"
          value={brand.agencyName || 'Direct Brand'}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_1fr]">
        <InfoCard title="Brand Profile">
          <InfoRow icon={<Globe className="h-4 w-4" />} label="Website" value={brand.website} />
          <InfoRow icon={<Mail className="h-4 w-4" />} label="Owner Email" value={brand.ownerEmail} />
          <InfoRow icon={<Building2 className="h-4 w-4" />} label="Agency" value={brand.agencyName || '—'} />
          <InfoRow icon={<CalendarDays className="h-4 w-4" />} label="Created" value={formatDisplayDate(brand.createdAt)} />
          <InfoRow
            icon={<CalendarDays className="h-4 w-4" />}
            label="Account Deleted At"
            value={brand.deletedAt ? formatDisplayDate(brand.deletedAt) : 'Account is still running'}
          />
        </InfoCard>

        <InfoCard title="Subscription Details">
          <InfoRow icon={<ReceiptText className="h-4 w-4" />} label="Plan" value={brand.plan || '—'} />
          <InfoRow icon={<ReceiptText className="h-4 w-4" />} label="Status" valueNode={<StatusBadge status={brand.status} />} />
          <InfoRow icon={<Sparkles className="h-4 w-4" />} label="Business Type" value={brand.businessType || '—'} />
        </InfoCard>
      </div>

      <TableCard title={`Recent Audits (${audits.length})`} icon={<ChartColumn className="h-4 w-4" />}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Issues</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Score</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-4 text-sm font-medium text-slate-900">{formatShortDate(audit.date)}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        audit.status === 'passed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {audit.status === 'passed' ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-800">{audit.issuesFound} found</td>
                  <td className="px-4 py-4 text-sm font-semibold text-blue-600">{audit.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableCard>

      <TableCard title="Visibility Score Trends" icon={<ChartColumn className="h-4 w-4" />}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Month</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Score</th>
              </tr>
            </thead>
            <tbody>
              {scoreTrends.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-4 text-sm font-medium text-slate-900">{item.month}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-blue-600">{item.score}%</span>
                      {typeof item.change === 'number' && (
                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {item.change > 0 ? `+${item.change}` : item.change}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableCard>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
        <div className="mt-6 space-y-5">{children}</div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
  valueNode,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  valueNode?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        {valueNode ? (
          <div className="mt-1">{valueNode}</div>
        ) : (
          <p className="mt-1 text-lg font-medium text-slate-900">{value}</p>
        )}
      </div>
    </div>
  );
}

function TableCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="mb-5 flex items-center gap-2">
          <span className="text-slate-700">{icon}</span>
          <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}