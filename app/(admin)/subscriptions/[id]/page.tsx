'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockSubscriptions } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { UpdateSeatsModal } from '@/components/subscriptions/UpdateSeatsModal';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { PlanBadge } from '@/components/shared/PlanBadge';
import { Edit, Trash2, Home } from 'lucide-react';
import { formatDateTime, formatCurrency } from '@/lib/formatting';

interface SubscriptionDetailPageProps {
  params: {
    id: string;
  };
}

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  active: { bg: 'bg-green-900/30', text: 'text-green-300', border: 'border-green-700' },
  trialing: { bg: 'bg-blue-900/30', text: 'text-blue-300', border: 'border-blue-700' },
  past_due: { bg: 'bg-yellow-900/30', text: 'text-yellow-300', border: 'border-yellow-700' },
  canceled: { bg: 'bg-red-900/30', text: 'text-red-300', border: 'border-red-700' },
};

export default function SubscriptionDetailPage({ params }: SubscriptionDetailPageProps) {
  const router = useRouter();
  const subscription = mockSubscriptions.find((s) => s.id === params.id);
  const [updateSeatsModalOpen, setUpdateSeatsModalOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  if (!subscription) {
    return (
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className="text-blue-400 hover:text-blue-300">
              <Home className="w-4 h-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-600" />
          <BreadcrumbItem>
            <BreadcrumbLink href="/subscriptions" className="text-blue-400 hover:text-blue-300">
              Subscriptions
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-600" />
          <BreadcrumbItem className="text-slate-400">Not Found</BreadcrumbItem>
        </Breadcrumb>
        <div className="text-center py-12">
          <p className="text-slate-400 mb-4">Subscription not found</p>
          <Button
            onClick={() => router.push('/subscriptions')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Back to Subscriptions
          </Button>
        </div>
      </div>
    );
  }

  const handleCancel = async () => {
    setIsCanceling(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/subscriptions');
    } finally {
      setIsCanceling(false);
    }
  };

  const seatsPercentage = (subscription.seatsUsed / subscription.seatsLimit) * 100;
  const statusConfig = STATUS_COLORS[subscription.status];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="text-blue-400 hover:text-blue-300">
                <Home className="w-4 h-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-600" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/subscriptions" className="text-blue-400 hover:text-blue-300">
                Subscriptions
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-600" />
            <BreadcrumbItem className="text-slate-400">{subscription.organizationName}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUpdateSeatsModalOpen(true)}
            className="border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Seats
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCancelDialogOpen(true)}
            className="border-red-700 text-red-400 hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-700 bg-slate-800 p-6">
          <p className="text-slate-400 text-sm mb-2">Organization</p>
          <p className="text-slate-100 text-lg font-semibold">{subscription.organizationName}</p>
        </Card>

        <Card className="border-slate-700 bg-slate-800 p-6">
          <p className="text-slate-400 text-sm mb-2">Plan</p>
          <PlanBadge plan={subscription.plan} />
        </Card>

        <Card className="border-slate-700 bg-slate-800 p-6">
          <p className="text-slate-400 text-sm mb-2">Status</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </span>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-700 bg-slate-800 p-6 space-y-4">
          <h3 className="text-slate-100 font-semibold">Billing Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Monthly Price:</span>
              <span className="text-slate-200 font-semibold">{formatCurrency(subscription.monthlyPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Billing Cycle:</span>
              <span className="text-slate-200">
                {subscription.billingCycleStart.toLocaleDateString()} - {subscription.billingCycleEnd.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Next Renewal:</span>
              <span className="text-slate-200 text-sm">{formatDateTime(subscription.nextRenewalDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Created:</span>
              <span className="text-slate-200 text-sm">{formatDateTime(subscription.startDate)}</span>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-800 p-6 space-y-4">
          <h3 className="text-slate-100 font-semibold">Seat Usage</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Used Seats:</span>
              <span className="text-slate-200 font-semibold">
                {subscription.seatsUsed} / {subscription.seatsLimit}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  seatsPercentage > 90
                    ? 'bg-red-500'
                    : seatsPercentage > 70
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(seatsPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">
              {seatsPercentage.toFixed(1)}% capacity used
            </p>
            <Button
              onClick={() => setUpdateSeatsModalOpen(true)}
              variant="outline"
              size="sm"
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-700 mt-2"
            >
              <Edit className="w-4 h-4 mr-2" />
              Update Seat Limit
            </Button>
          </div>
        </Card>
      </div>

      <UpdateSeatsModal
        open={updateSeatsModalOpen}
        onOpenChange={setUpdateSeatsModalOpen}
        subscription={subscription}
        onSubmit={(subId, newSeats) => {
          console.log('Updating seats for subscription:', subId, 'to:', newSeats);
          setUpdateSeatsModalOpen(false);
        }}
      />

      <ConfirmationDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        title="Cancel Subscription"
        description={`Are you sure you want to cancel the subscription for "${subscription.organizationName}"? This action cannot be undone.`}
        actionLabel="Cancel Subscription"
        isDangerous
        isLoading={isCanceling}
        onConfirm={handleCancel}
      />
    </div>
  );
}
