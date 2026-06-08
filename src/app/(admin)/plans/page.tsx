
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarClock,
  Layers3,
  Plus,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { PlansTable } from "@/components/plans/PlansTable";
import { AddPlanModal } from "@/components/plans/AddPlanModal";
import { EditPlanModal } from "@/components/plans/EditPlanModal";
import { ConfirmationDialog } from "@/components/modals/ConfirmationDialog";
import { PlanFeaturesModal } from "@/components/plans/PlanFeaturesModal";

import { usePaymentStore } from "@/store/payment.store";
import type { PaymentCatalogPlan } from "@/types/payment.types";

export default function PlansPage() {
  const { plans, getCatalog, isCatalogLoading, error } = usePaymentStore();

  const [addPlanModalOpen, setAddPlanModalOpen] = useState(false);
  const [editPlanModalOpen, setEditPlanModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [featuresModalOpen, setFeaturesModalOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<PaymentCatalogPlan | null>(
    null
  );
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const [featuresPlan, setFeaturesPlan] =
    useState<PaymentCatalogPlan | null>(null);

  useEffect(() => {
    getCatalog();
  }, [getCatalog]);

  const stats = useMemo(() => {
    const paidPlans = plans.filter((plan) => !plan.isFree).length;
    const freePlans = plans.filter((plan) => plan.isFree).length;

    const avgMonthly =
      plans.length > 0
        ? Math.round(
            plans.reduce((sum, plan) => sum + (plan.price?.monthly || 0), 0) /
              plans.length /
              100
          )
        : 0;

    const totalFeatures = plans.reduce(
      (sum, plan) => sum + (plan.entitlements?.features?.length || 0),
      0
    );

    return {
      totalPlans: plans.length,
      paidPlans,
      freePlans,
      avgMonthly,
      totalFeatures,
    };
  }, [plans]);

  const handleEditPlan = (plan: PaymentCatalogPlan) => {
    setSelectedPlan(plan);
    setEditPlanModalOpen(true);
  };

  const handleDeletePlan = (id: string) => {
    setPlanToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleViewFeatures = (plan: PaymentCatalogPlan) => {
    setFeaturesPlan(plan);
    setFeaturesModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!planToDelete) return;

    setDeleteDialogOpen(false);
    setPlanToDelete(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plans"
        description="Manage subscription plans, pricing, lifecycle status, and included features."
        action={
          <button
            type="button"
            onClick={() => setAddPlanModalOpen(true)}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#DE5A3F] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c94d34] sm:w-auto"
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">Create Plan</span>
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Plans"
          value={String(stats.totalPlans)}
          subtitle="All catalog plans"
          icon={<Layers3 className="h-5 w-5" />}
        />

        <StatsCard
          title="Paid Plans"
          value={String(stats.paidPlans)}
          subtitle={`${stats.freePlans} free plan`}
          icon={<ShieldCheck className="h-5 w-5" />}
        />

        <StatsCard
          title="Avg Monthly Price"
          value={`$${stats.avgMonthly}`}
          subtitle="Across all plans"
          icon={<Wallet className="h-5 w-5" />}
        />

        <StatsCard
          title="Total Features"
          value={String(stats.totalFeatures)}
          subtitle="Combined features count"
          icon={<CalendarClock className="h-5 w-5" />}
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <PlansTable
        plans={plans}
        isLoading={isCatalogLoading}
        onEdit={handleEditPlan}
        onDelete={handleDeletePlan}
        onViewFeatures={handleViewFeatures}
      />

      <AddPlanModal
        open={addPlanModalOpen}
        onOpenChange={setAddPlanModalOpen}
        onSubmit={() => {
          setAddPlanModalOpen(false);
          getCatalog();
        }}
      />

      <EditPlanModal
        open={editPlanModalOpen}
        onOpenChange={setEditPlanModalOpen}
        plan={selectedPlan as any}
        onSubmit={() => {
          setEditPlanModalOpen(false);
          setSelectedPlan(null);
          getCatalog();
        }}
      />

      <PlanFeaturesModal
        open={featuresModalOpen}
        onOpenChange={setFeaturesModalOpen}
        plan={featuresPlan as any}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Plan"
        description="Are you sure you want to delete this plan? This action cannot be undone."
        actionLabel="Delete"
        isDangerous
        onConfirm={confirmDelete}
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-500">
              {title}
            </p>

            <p className="mt-2 break-words text-xl font-semibold tracking-tight text-slate-950 md:text-2xl lg:text-3xl">
              {value}
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 sm:h-11 sm:w-11">
            {icon}
          </div>
        </div>

        <p className="text-xs leading-5 text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}