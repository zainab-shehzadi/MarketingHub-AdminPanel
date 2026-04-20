'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { PlansTable } from '@/components/plans/PlansTable';
import { AddPlanModal } from '@/components/plans/AddPlanModal';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { mockPlans } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function PlansPage() {
  const [addPlanModalOpen, setAddPlanModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  const handleAddPlan = (data: any) => {
    console.log('Adding plan:', data);
    setAddPlanModalOpen(false);
  };

  const handleDeletePlan = (id: string) => {
    setPlanToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    console.log('Deleting plan:', planToDelete);
    setDeleteDialogOpen(false);
    setPlanToDelete(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plans"
        description="Manage subscription plans and pricing"
        action={
          <Button onClick={() => setAddPlanModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        }
      />

      <PlansTable plans={mockPlans} onDelete={handleDeletePlan} />

      <AddPlanModal
        open={addPlanModalOpen}
        onOpenChange={setAddPlanModalOpen}
        onSubmit={handleAddPlan}
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
