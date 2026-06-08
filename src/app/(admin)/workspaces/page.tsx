'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BriefcaseBusiness,
  Building2,
  FolderKanban,
  Search,
  Users,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useWorkspaceStore } from '@/store/workspace.store';
import { Workspace } from '@/types/workspace';
import { WorkspaceTable } from '@/components/workspace/WorkspaceTable';
import { useRouter } from 'next/navigation';
import { RouteLoader } from '@/components/shared/RouteLoader';
import { Pagination } from '@/components/shared/Pagination';
function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default function WorkspacesPage() {

  const router = useRouter();

  const {
    workspaces,
    pagination,
    isLoading,
    error,
    getWorkspaces,
    setSelectedWorkspace,
  } = useWorkspaceStore();
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const limit = 10;

  const handleViewWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    router.push(`/workspaces/${workspace._id}`);
  };
  useEffect(() => {
    getWorkspaces({
      page,
      limit,
      workspaceType: selectedType === 'all' ? undefined : selectedType,
      status: selectedStatus === 'all' ? undefined : selectedStatus,
    });
  }, [getWorkspaces, page, selectedType, selectedStatus]);

  const filteredWorkspaces = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) return workspaces;

    return workspaces.filter((workspace) => {
      const createdBy = workspace.createdBy;
      const searchableText = [
        workspace.name,
        workspace.workspaceType,
        workspace.status,
        createdBy?.name,
        createdBy?.email,
        createdBy?.role,
        createdBy?.organizationType,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(value);
    });
  }, [workspaces, searchTerm]);

  const stats = useMemo(() => {
    const totalWorkspaces = workspaces.length;
    const activeWorkspaces = workspaces.filter(
      (workspace) => workspace.status === 'active'
    ).length;

    const totalMembers = workspaces.reduce(
      (total, workspace) => total + (workspace.members?.length ?? 0),
      0
    );

    const totalProjects = workspaces.reduce(
      (total, workspace) => total + (workspace.projects?.length ?? 0),
      0
    );

    return {
      totalWorkspaces,
      activeWorkspaces,
      totalMembers,
      totalProjects,
    };
  }, [workspaces]);


  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>

          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Workspaces
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Manage all brand and agency workspaces, members, projects, seats,
            and account status from one place.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Workspaces"
          value={pagination?.total ?? stats.totalWorkspaces}
          icon={BriefcaseBusiness}
          description="All fetched workspaces"
        />

        <StatCard
          title="Active Workspaces"
          value={stats.activeWorkspaces}
          icon={Building2}
          description="Currently active accounts"
        />

        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          icon={Users}
          description="Members across current page"
        />

        <StatCard
          title="Projects"
          value={stats.totalProjects}
          icon={FolderKanban}
          description="Projects across current page"
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <Input
            placeholder="Search by workspace name, owner email, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 border-slate-200 bg-white pl-10 text-slate-900 placeholder:text-slate-500 focus:border-orange-600 focus:ring-orange-600"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
        >
          <option value="all">All Types</option>
          <option value="brand">Brand</option>
          <option value="agency">Agency</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <>
        <RouteLoader
          show={isLoading}
          title="Loading workspaces..."
          description="Please wait while we fetch workspace data"
        />

        {!isLoading && (
          <WorkspaceTable
            workspaces={filteredWorkspaces}
            onView={handleViewWorkspace}
          />
        )}
      </>
      <Pagination
        pagination={pagination}
        isLoading={isLoading}
        itemLabel="users"
        onPageChange={setPage}
      />

    </div>
  );
}