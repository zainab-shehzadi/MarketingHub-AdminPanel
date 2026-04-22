'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  ShieldCheck,
  User2,
  Clock3,
} from 'lucide-react';

import { User } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UserDetailPageProps {
  user: User;
}

function formatDate(value: Date | string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getRoleBadge(role: string) {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-700';
    case 'moderator':
      return 'bg-amber-100 text-amber-700';
    default:
      return 'bg-emerald-100 text-emerald-700';
  }
}

export function UserDetailPage({ user }: UserDetailPageProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            User Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View complete information about this user account.
          </p>
        </div>

     
      </div>

      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <User2 className="h-8 w-8" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-slate-950">{user.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{user.email}</p>

              <div className="mt-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getRoleBadge(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <DetailCard
          title="Profile Information"
          items={[
            {
              icon: <User2 className="h-4 w-4" />,
              label: 'Full Name',
              value: user.name,
            },
            {
              icon: <Mail className="h-4 w-4" />,
              label: 'Email Address',
              value: user.email,
            },
            {
              icon: <ShieldCheck className="h-4 w-4" />,
              label: 'Role',
              value: user.role,
            },
          ]}
        />

        <DetailCard
          title="Account Activity"
          items={[
            {
              icon: <CalendarDays className="h-4 w-4" />,
              label: 'Created At',
              value: formatDate(user.createdAt),
            },
            {
              icon: <Clock3 className="h-4 w-4" />,
              label: 'Last Login',
              value: formatDate(user.lastLogin),
            },
          ]}
        />
      </div>
    </div>
  );
}

function DetailCard({
  title,
  items,
}: {
  title: string;
  items: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-950">{title}</h3>

        <div className="mt-6 space-y-5">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                {item.icon}
              </div>

              <div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-1 text-lg font-medium capitalize text-slate-900">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}