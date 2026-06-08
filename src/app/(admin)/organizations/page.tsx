'use client';

import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { BrandsTable } from '@/components/organizations/BrandsTable';
import { AgenciesAccordion } from '@/components/organizations/AgenciesAccordion';
import { OrganizationFilters } from '@/components/organizations/OrganizationFilters';
import { AddBrandModal } from '@/components/organizations/AddBrandModal';
import { EditBrandModal } from '@/components/organizations/EditBrandModal';
import { Pagination } from '@/components/shared/Pagination';
import { useBrands } from '@/lib/hooks/useDataManagement';
import { mockBrands, mockAgencies } from '@/lib/mock-data';
import { Brand, Agency } from '@/lib/types';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { useWorkspaceStore } from '@/store/workspace.store';

const ITEMS_PER_PAGE = 10;

type OrganizationTab = 'brands' | 'agencies';
export default function OrganizationsPage() {
  const [activeTab, setActiveTab] = useState<OrganizationTab>('brands');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const brandsManager = useBrands(mockBrands);
  const {
    workspaces,
    pagination,
    isLoading,
    getWorkspaces,
  } = useWorkspaceStore();
  const [brandPage, setBrandPage] = useState(1);
  const [agencyPage, setAgencyPage] = useState(1);

  const [addBrandModalOpen, setAddBrandModalOpen] = useState(false);
  const [editBrandModalOpen, setEditBrandModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<string | null>(null);
  useEffect(() => {
    if (activeTab !== 'agencies') return;

    getWorkspaces({
      page: agencyPage,
      limit: ITEMS_PER_PAGE,
      status: selectedStatus !== 'all' ? selectedStatus : undefined,
      search: searchTerm || undefined,
    });
  }, [activeTab, agencyPage, selectedStatus, searchTerm, getWorkspaces]);
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

  const filteredWorkspaces = useMemo(() => {
    return workspaces ?? [];
  }, [workspaces]);

  const totalWorkspacePages = pagination?.totalPages ?? 1;
  const paginatedWorkspaces = filteredWorkspaces;
  const totalBrandPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);
  const paginatedBrands = filteredBrands.slice(
    (brandPage - 1) * ITEMS_PER_PAGE,
    brandPage * ITEMS_PER_PAGE
  );
  useEffect(() => {
    setAgencyPage(1);
  }, [searchTerm, selectedStatus]);
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
      status: 'banned',
      visibility: 'public',
      seatsUsed: 0,
      seatsLimit: Number.parseInt(data.seatsLimit, 10),
      createdAt: new Date(),
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


  const handleToggleBrandBan = (id: string) => {
    const brand = brandsManager.data.find((item) => item.id === id);
    if (!brand) return;

    brandsManager.update(id, {
      status: brand.status === 'banned' ? 'unbanned' : 'banned',
    });
  };
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Organizations"
        description="Manage brands and agencies on your platform"

      />

      <OrganizationFilters
        onSearchChange={setSearchTerm}
        onPlanChange={setSelectedPlan}
        onStatusChange={setSelectedStatus}
      />

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{pageTitle}</h2>
          <p className="mt-1 text-sm text-slate-600">{pageDescription}</p>
        </div>

        <div className="flex justify-center pt-2">
          <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-100/80 p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('brands')}
              className={`min-w-[180px] rounded-xl px-5 py-3 text-sm font-semibold transition ${activeTab === 'brands'
                ? 'bg-white text-[#DE5A3F] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Brands ({filteredBrands.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('agencies')}
              className={`min-w-[180px] rounded-xl px-5 py-3 text-sm font-semibold transition ${activeTab === 'agencies'
                ? 'bg-white text-[#DE5A3F] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Workspaces ({pagination?.total ?? filteredWorkspaces.length})
            </button>
          </div>
        </div>

        {activeTab === 'brands' ? (
          <div className="space-y-4">
            <BrandsTable
              brands={paginatedBrands}
              onEdit={handleEditBrand}
              onDelete={handleDeleteBrand}
              onToggleBan={handleToggleBrandBan}
            />

            {totalBrandPages > 1 && (
              <Pagination
                onPageChange={setBrandPage}
                pagination={pagination}
                isLoading={isLoading}
                itemLabel="brands"
              />
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {isLoading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
                Loading agencies...
              </div>
            ) : (
              <>
                <AgenciesAccordion agencies={paginatedWorkspaces} />
                {totalWorkspacePages > 1 && (
                  <Pagination
                    pagination={pagination}
                    isLoading={isLoading}
                    itemLabel="workspaces"
                    onPageChange={setAgencyPage}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
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