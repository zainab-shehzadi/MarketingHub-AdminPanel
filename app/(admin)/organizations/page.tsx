'use client';

import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

import { PageHeader } from '@/components/shared/PageHeader';
import { BrandsTable } from '@/components/organizations/BrandsTable';
import { AgenciesAccordion } from '@/components/organizations/AgenciesAccordion';
import { OrganizationFilters } from '@/components/organizations/OrganizationFilters';
import { AddBrandModal } from '@/components/organizations/AddBrandModal';
import { EditBrandModal } from '@/components/organizations/EditBrandModal';
import { AddAgencyModal } from '@/components/organizations/AddAgencyModal';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { Pagination } from '@/components/shared/Pagination';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useBrands, useAgencies } from '@/lib/hooks/useDataManagement';
import { mockBrands, mockAgencies } from '@/lib/mock-data';
import { Brand, Agency } from '@/lib/types';

const ITEMS_PER_PAGE = 5;

type OrganizationTab = 'brands' | 'agencies';
type AgencyStatus = 'active' | 'inactive' | 'suspended';

export default function OrganizationsPage() {
  const [activeTab, setActiveTab] = useState<OrganizationTab>('brands');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const brandsManager = useBrands(mockBrands);
  const agenciesManager = useAgencies(mockAgencies);

  const [brandPage, setBrandPage] = useState(1);
  const [agencyPage, setAgencyPage] = useState(1);

  const [addBrandModalOpen, setAddBrandModalOpen] = useState(false);
  const [editBrandModalOpen, setEditBrandModalOpen] = useState(false);
  const [isAddAgencyOpen, setIsAddAgencyOpen] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<string | null>(null);

  const filteredBrands = useMemo(() => {
    let result = brandsManager.data;

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (brand) =>
          brand.name.toLowerCase().includes(query) ||
          brand.ownerEmail.toLowerCase().includes(query)
      );
    }

    if (selectedPlan !== 'all') {
      result = result.filter((brand) => brand.plan === selectedPlan);
    }

    if (selectedStatus !== 'all') {
      result = result.filter((brand) => brand.status === selectedStatus);
    }

    return result;
  }, [brandsManager.data, searchTerm, selectedPlan, selectedStatus]);

  const filteredAgencies = useMemo(() => {
    let result = agenciesManager.data;

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (agency) =>
          agency.name.toLowerCase().includes(query) ||
          agency.ownerEmail?.toLowerCase().includes(query)
      );
    }

    if (selectedStatus !== 'all') {
      result = result.filter((agency) => agency.status === selectedStatus);
    }

    return result;
  }, [agenciesManager.data, searchTerm, selectedStatus]);

  const totalBrandPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);
  const paginatedBrands = filteredBrands.slice(
    (brandPage - 1) * ITEMS_PER_PAGE,
    brandPage * ITEMS_PER_PAGE
  );

  const totalAgencyPages = Math.ceil(filteredAgencies.length / ITEMS_PER_PAGE);
  const paginatedAgencies = filteredAgencies.slice(
    (agencyPage - 1) * ITEMS_PER_PAGE,
    agencyPage * ITEMS_PER_PAGE
  );

  const pageTitle = useMemo(() => {
    return activeTab === 'brands' ? 'Brand History' : 'Managed Agencies';
  }, [activeTab]);

  const pageDescription = useMemo(() => {
    return activeTab === 'brands'
      ? 'View and manage all registered brands.'
      : 'View agencies and the brands managed under them.';
  }, [activeTab]);

  const handleAddBrand = (data: any) => {
    const newBrand: Omit<Brand, 'id'> = {
      name: data.name,
      website: data.website,
      ownerEmail: data.ownerEmail,
      plan: data.plan,
      status: 'active',
      seatsUsed: 0,
      seatsLimit: Number.parseInt(data.seatsLimit, 10),
      createdAt: new Date().toISOString(),
    };

    brandsManager.add(newBrand);
    setAddBrandModalOpen(false);
    setBrandPage(1);
  };

  const handleEditBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setEditBrandModalOpen(true);
  };

  const handleSaveEditBrand = (id: string, data: any) => {
    brandsManager.update(id, {
      name: data.name,
      website: data.website,
      ownerEmail: data.ownerEmail,
      plan: data.plan,
    });

    setEditBrandModalOpen(false);
    setSelectedBrand(null);
  };

  const handleDeleteBrand = (id: string) => {
    setBrandToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!brandToDelete) return;

    brandsManager.remove(brandToDelete);
    setDeleteDialogOpen(false);
    setBrandToDelete(null);

    if (paginatedBrands.length === 1 && brandPage > 1) {
      setBrandPage((prev) => prev - 1);
    }
  };

  const handleCreateAgency = (payload: {
    name: string;
    description: string;
    status: AgencyStatus;
    brandIds: string[];
  }) => {
    const linkedBrands = brandsManager.data.filter((brand) =>
      payload.brandIds.includes(brand.id)
    );

    const newAgency: Omit<Agency, 'id'> = {
      name: payload.name,
      description: payload.description,
      status: payload.status,
      brandCount: linkedBrands.length,
      totalSeatsUsed: linkedBrands.reduce(
        (sum, brand) => sum + (brand.seatsUsed ?? 0),
        0
      ),
      brands: linkedBrands,
      ownerEmail: '',
    };

    agenciesManager.add(newAgency);
    setIsAddAgencyOpen(false);
    setAgencyPage(1);
  };
const handleToggleBrandBan = (id: string) => {
  const brand = brandsManager.data.find((item) => item.id === id);
  if (!brand) return;

  brandsManager.update(id, {
    status: brand.status === 'banned' ? 'unbanned' : 'banned',
  });
};
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organizations"
        description="Manage brands and agencies on your platform"
        action={
          activeTab === 'brands' ? (
            <Button
              onClick={() => setAddBrandModalOpen(true)}
              className="bg-orange-600 text-white hover:bg-orange-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Brand
            </Button>
          ) : (
            <Button
              onClick={() => setIsAddAgencyOpen(true)}
              className="rounded-xl bg-[#DE5A3F] text-white hover:bg-[#c94d34]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Agency
            </Button>
          )
        }
      />

      <OrganizationFilters
        onSearchChange={setSearchTerm}
        onPlanChange={setSelectedPlan}
        onStatusChange={setSelectedStatus}
      />

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as OrganizationTab)}
        className="space-y-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{pageTitle}</h2>
            <p className="mt-1 text-sm text-slate-600">{pageDescription}</p>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <TabsList className="h-auto w-full max-w-[420px] rounded-2xl border border-slate-200 bg-slate-100/80 p-1.5 shadow-sm">
            <TabsTrigger
              value="brands"
              className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-[#DE5A3F] data-[state=active]:shadow-sm"
            >
              Brands ({filteredBrands.length})
            </TabsTrigger>

            <TabsTrigger
              value="agencies"
              className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-[#DE5A3F] data-[state=active]:shadow-sm"
            >
              Agencies ({filteredAgencies.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="brands" className="space-y-4 pt-4">
        <BrandsTable
  brands={paginatedBrands}
  onEdit={handleEditBrand}
  onDelete={handleDeleteBrand}
  onToggleBan={handleToggleBrandBan}
/>
          {totalBrandPages > 1 && (
            <Pagination
              currentPage={brandPage}
              totalPages={totalBrandPages}
              onPageChange={setBrandPage}
              totalItems={filteredBrands.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          )}
        </TabsContent>

        <TabsContent value="agencies" className="space-y-4 pt-4">
          <AgenciesAccordion agencies={paginatedAgencies} />

          {totalAgencyPages > 1 && (
            <Pagination
              currentPage={agencyPage}
              totalPages={totalAgencyPages}
              onPageChange={setAgencyPage}
              totalItems={filteredAgencies.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          )}
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

      <AddAgencyModal
        open={isAddAgencyOpen}
        onOpenChange={setIsAddAgencyOpen}
        brands={brandsManager.data}
        onSubmit={handleCreateAgency}
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