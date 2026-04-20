'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SubscriptionsTable } from '@/components/subscriptions/SubscriptionsTable';
import { UpdateSeatsModal } from '@/components/subscriptions/UpdateSeatsModal';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { mockSubscriptions } from '@/lib/mock-data';
import { Subscription } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBillingStatus, setSelectedBillingStatus] = useState('all');
  
  // Modal states
  const [updateSeatsModalOpen, setUpdateSeatsModalOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [subscriptionToCancel, setSubscriptionToCancel] = useState<string | null>(null);

  let filteredSubs = mockSubscriptions;

  if (searchTerm) {
    filteredSubs = filteredSubs.filter((s) =>
      s.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedStatus !== 'all') {
    filteredSubs = filteredSubs.filter((s) => s.status === selectedStatus);
  }

  if (selectedBillingStatus !== 'all') {
    filteredSubs = filteredSubs.filter((s) => s.billingStatus === selectedBillingStatus);
  }

  const handleUpdateSeats = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setUpdateSeatsModalOpen(true);
  };

  const handleCancelSubscription = (id: string) => {
    setSubscriptionToCancel(id);
    setCancelDialogOpen(true);
  };

  const confirmCancel = async () => {
    console.log('Canceling subscription:', subscriptionToCancel);
    setCancelDialogOpen(false);
    setSubscriptionToCancel(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscriptions"
        description="Monitor and manage all customer subscriptions"
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedBillingStatus} onValueChange={setSelectedBillingStatus}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="all">All Billing Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="past_due">Past Due</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <SubscriptionsTable 
        subscriptions={filteredSubs}
        onUpdateSeats={handleUpdateSeats}
        onCancel={handleCancelSubscription}
      />

      <UpdateSeatsModal
        open={updateSeatsModalOpen}
        onOpenChange={setUpdateSeatsModalOpen}
        subscription={selectedSubscription}
        onSubmit={(subId, newSeats) => {
          console.log('Updating seats:', subId, newSeats);
          setUpdateSeatsModalOpen(false);
          setSelectedSubscription(null);
        }}
      />

      <ConfirmationDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        title="Cancel Subscription"
        description="Are you sure you want to cancel this subscription? This action cannot be undone."
        actionLabel="Cancel Subscription"
        isDangerous
        onConfirm={confirmCancel}
      />
    </div>
  );
}
