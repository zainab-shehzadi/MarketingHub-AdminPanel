'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CreditCard,
  Edit,
  Layers3,
  Trash2,
  Users,
} from 'lucide-react';

import { Subscription } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlanBadge } from '@/components/shared/PlanBadge';
import { UpdateSeatsModal } from '@/components/subscriptions/UpdateSeatsModal';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';

interface SubscriptionDetailPageProps {
  subscription: Subscription;
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

function getStatusClasses(status: string) {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-700';
    case 'suspended':
      return 'bg-amber-100 text-amber-700';
    case 'expired':
      return 'bg-slate-100 text-slate-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

export function SubscriptionDetailPage({
  subscription,
}: SubscriptionDetailPageProps) {
  const router = useRouter();

  const [currentSubscription, setCurrentSubscription] = useState(subscription);
  const [updateSeatsModalOpen, setUpdateSeatsModalOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const seatsPercentage =
    (currentSubscription.seatsUsed / currentSubscription.seatsLimit) * 100;

  const handleUpdateSeats = (subscriptionId: string, newSeats: number) => {
    if (subscriptionId !== currentSubscription.id) return;

    setCurrentSubscription((prev) => ({
      ...prev,
      seatsLimit: newSeats,
    }));

    setUpdateSeatsModalOpen(false);
  };

  const handleCancel = async () => {
    setCurrentSubscription((prev) => ({
      ...prev,
      status: 'cancelled',
      billingStatus: 'cancelled',
    }));

    setCancelDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => router.push('/subscriptions')}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Subscriptions
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Subscription Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage this organization subscription.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setUpdateSeatsModalOpen(true)}
            className="rounded-xl"
          >
            <Edit className="mr-2 h-4 w-4" />
            Update Seats
          </Button>

          <Button
            variant="outline"
            onClick={() => setCancelDialogOpen(true)}
            className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Cancel Subscription
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Building2 className="h-8 w-8" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-slate-950">
                {currentSubscription.organizationName}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                  {currentSubscription.organizationType}
                </span>
                <PlanBadge plan={currentSubscription.currentPlan} />
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                    currentSubscription.status
                  )}`}
                >
                  {currentSubscription.status}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Layers3 className="h-5 w-5" />}
          label="Current Plan"
          value={currentSubscription.currentPlan}
          capitalize
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Seats Used"
          value={`${currentSubscription.seatsUsed}/${currentSubscription.seatsLimit}`}
        />
        <StatCard
          icon={<CreditCard className="h-5 w-5" />}
          label="Billing Status"
          value={currentSubscription.billingStatus.replace('_', ' ')}
          capitalize
        />
        <StatCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Renewal Date"
          value={formatDate(currentSubscription.renewalDate)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <InfoCard title="Subscription Information">
          <InfoRow label="Organization Name" value={currentSubscription.organizationName} />
          <InfoRow label="Organization Type" value={currentSubscription.organizationType} capitalize />
          <InfoRow label="Current Plan" value={currentSubscription.currentPlan} capitalize />
          <InfoRow label="Billing Cycle" value={currentSubscription.billingCycle} capitalize />
          <InfoRow label="Created At" value={formatDate(currentSubscription.createdAt)} />
          <InfoRow label="Renewal Date" value={formatDate(currentSubscription.renewalDate)} />
        </InfoCard>

        <InfoCard title="Seat Usage">
          <div className="space-y-4">
            <InfoRow
              label="Seat Capacity"
              value={`${currentSubscription.seatsUsed} / ${currentSubscription.seatsLimit}`}
            />

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Usage</span>
                <span className="font-medium text-slate-900">
                  {seatsPercentage.toFixed(0)}%
                </span>
              </div>

              <div className="h-3 w-full rounded-full bg-slate-100">
                <div
                  className={`h-3 rounded-full transition-all ${
                    seatsPercentage > 90
                      ? 'bg-red-500'
                      : seatsPercentage > 70
                      ? 'bg-yellow-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(seatsPercentage, 100)}%` }}
                />
              </div>
            </div>

            <Button
              onClick={() => setUpdateSeatsModalOpen(true)}
              className="w-full bg-orange-600 text-white hover:bg-orange-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              Update Seat Limit
            </Button>
          </div>
        </InfoCard>
      </div>

      <UpdateSeatsModal
        open={updateSeatsModalOpen}
        onOpenChange={setUpdateSeatsModalOpen}
        subscription={currentSubscription}
        onSubmit={handleUpdateSeats}
      />

      <ConfirmationDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        title="Cancel Subscription"
        description={`Are you sure you want to cancel the subscription for "${currentSubscription.organizationName}"? This action cannot be undone.`}
        actionLabel="Cancel Subscription"
        isDangerous
        onConfirm={handleCancel}
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  capitalize,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className={`mt-2 text-2xl font-semibold text-slate-950 ${capitalize ? 'capitalize' : ''}`}>
            {value}
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
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
        <div className="mt-6 space-y-4">{children}</div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm font-medium text-slate-900 ${capitalize ? 'capitalize' : ''}`}>
        {value}
      </span>
    </div>
  );
}