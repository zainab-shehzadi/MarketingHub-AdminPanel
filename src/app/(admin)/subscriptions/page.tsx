"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SubscriptionsTable } from "@/components/subscriptions/SubscriptionsTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePaymentStore } from "@/store/payment.store";
import { PaymentSubscriber } from "@/types/payment.types";

export default function SubscriptionsPage() {
  const router = useRouter();
  const { subscribers, getSubscribers, isLoading, error } = usePaymentStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedBillingStatus, setSelectedBillingStatus] = useState("all");

  useEffect(() => {
    getSubscribers({
      page: 1,
      limit: 10,
    });
  }, [getSubscribers]);

  const filteredSubs = useMemo(() => {
    return subscribers.filter((subscriber) => {
      const email = subscriber.user?.email?.toLowerCase() || "";
      const organizationType =
        subscriber.user?.organizationType?.toLowerCase() || "";

      const planName = subscriber.plan?.name?.toLowerCase() || "";
      const planKey =
        subscriber.plan?.key?.toLowerCase() ||
        subscriber.user?.planKey?.toLowerCase() ||
        "";

      const searchValue = searchTerm.toLowerCase();

      const status =
        subscriber.subscription?.status?.toLowerCase() ||
        subscriber.user?.billingStatus?.toLowerCase() ||
        "";

      const billingStatus =
        subscriber.user?.billingStatus?.toLowerCase() || "";

      const matchesSearch =
        !searchTerm ||
        email.includes(searchValue) ||
        organizationType.includes(searchValue) ||
        planName.includes(searchValue) ||
        planKey.includes(searchValue);

      const matchesStatus =
        selectedStatus === "all" || status === selectedStatus;

      const matchesBilling =
        selectedBillingStatus === "all" ||
        billingStatus === selectedBillingStatus;

      return matchesSearch && matchesStatus && matchesBilling;
    });
  }, [subscribers, searchTerm, selectedStatus, selectedBillingStatus]);

  const handleViewDetail = (subscriber: PaymentSubscriber) => {
    const userId = subscriber.user?._id;

    if (!userId) return;

    router.push(`/subscriptions/${userId}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscriptions"
        description="Monitor and manage all customer subscriptions"
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <Input
            placeholder="Search email, organization type, or plan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-slate-200 bg-white pl-10 text-slate-900 placeholder:text-slate-500 focus:border-orange-600 focus:ring-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full border-slate-200 bg-white text-slate-900 sm:min-w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>

            <SelectContent className="border-slate-200 bg-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="past_due">Past Due</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedBillingStatus}
            onValueChange={setSelectedBillingStatus}
          >
            <SelectTrigger className="w-full border-slate-200 bg-white text-slate-900 sm:min-w-[180px]">
              <SelectValue placeholder="All Billing Status" />
            </SelectTrigger>

            <SelectContent className="border-slate-200 bg-white">
              <SelectItem value="all">All Billing Status</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="past_due">Past Due</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <SubscriptionsTable
        subscriptions={filteredSubs}
        isLoading={isLoading}
        onView={handleViewDetail}
      />
    </div>
  );
}