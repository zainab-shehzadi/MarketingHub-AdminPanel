'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { BrandsTable } from '@/components/organizations/BrandsTable';
import { AgenciesAccordion } from '@/components/organizations/AgenciesAccordion';
import { OrganizationFilters } from '@/components/organizations/OrganizationFilters';
import { AddBrandModal } from '@/components/organizations/AddBrandModal';
import { EditBrandModal } from '@/components/organizations/EditBrandModal';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { mockBrands, mockAgencies } from '@/lib/mock-data';
import { Brand } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';

export default function OrganizationsPage() {
  const [activeTab, setActiveTab] = useState('brands');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Modal states
  const [addBrandModalOpen, setAddBrandModalOpen] = useState(false);
  const [editBrandModalOpen, setEditBrandModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<string | null>(null);

  // Filter brands
  let filteredBrands = mockBrands;
  if (searchTerm) {
    filteredBrands = filteredBrands.filter((b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (selectedPlan !== 'all') {
    filteredBrands = filteredBrands.filter((b) => b.plan === selectedPlan);
  }
  if (selectedStatus !== 'all') {
    filteredBrands = filteredBrands.filter((b) => b.status === selectedStatus);
  }

  // Filter agencies
  let filteredAgencies = mockAgencies;
  if (searchTerm) {
    filteredAgencies = filteredAgencies.filter((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (selectedStatus !== 'all') {
    filteredAgencies = filteredAgencies.filter((a) => a.status === selectedStatus);
  }

  const handleAddBrand = (data: any) => {
    console.log('Adding brand:', data);
    setAddBrandModalOpen(false);
  };

  const handleEditBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setEditBrandModalOpen(true);
  };

  const handleSaveEditBrand = (id: string, data: Partial<Brand>) => {
    console.log('Editing brand:', id, data);
    setEditBrandModalOpen(false);
    setSelectedBrand(null);
  };

  const handleDeleteBrand = (id: string) => {
    setBrandToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    console.log('Deleting brand:', brandToDelete);
    setDeleteDialogOpen(false);
    setBrandToDelete(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organizations"
        description="Manage brands and agencies on your platform"
        action={
          <Button onClick={() => setAddBrandModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Organization
          </Button>
        }
      />

      <OrganizationFilters
        onSearchChange={setSearchTerm}
        onPlanChange={setSelectedPlan}
        onStatusChange={setSelectedStatus}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="brands" className="text-white data-[state=active]:bg-blue-600">
            Brands ({filteredBrands.length})
          </TabsTrigger>
          <TabsTrigger value="agencies" className="text-white data-[state=active]:bg-blue-600">
            Agencies ({filteredAgencies.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="brands" className="space-y-4">
          <BrandsTable 
            brands={filteredBrands}
            onEdit={handleEditBrand}
            onDelete={handleDeleteBrand}
          />
        </TabsContent>

        <TabsContent value="agencies" className="space-y-4">
          <AgenciesAccordion agencies={filteredAgencies} />
        </TabsContent>
      </Tabs>

      <AddBrandModal
        open={addBrandModalOpen}
        onOpenChange={setAddBrandModalOpen}
        onSubmit={handleAddBrand}
      />

      <EditBrandModal
        open={editBrandModalOpen}
        onOpenChange={setEditBrandModalOpen}
        brand={selectedBrand}
        onSubmit={handleSaveEditBrand}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Brand"
        description="Are you sure you want to delete this brand? This action cannot be undone."
        actionLabel="Delete"
        isDangerous
        onConfirm={confirmDelete}
      />
    </div>
  );
}
