"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  FolderKanban,
  Search,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { AgenciesAccordion } from "@/components/organizations/AgenciesAccordion";
import { Pagination } from "@/components/shared/Pagination";
import { useWorkspaceStore } from "@/store/workspace.store";
import type { WorkspaceType } from "@/types/workspace";

const ITEMS_PER_PAGE = 10;

type OrganizationTab = "brands" | "agencies";
type WorkspaceStatusFilter = "all" | "active" | "archived";

function getWorkspaceTypeByTab(tab: OrganizationTab): WorkspaceType {
  return tab === "brands" ? "brand" : "agency";
}

export default function OrganizationsPage() {
  const [activeTab, setActiveTab] = useState<OrganizationTab>("agencies");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<WorkspaceStatusFilter>("all");
  const [page, setPage] = useState(1);

  const { workspaces, pagination, isLoading, error, getWorkspaces } =
    useWorkspaceStore();

  const currentWorkspaceType = useMemo(() => {
    return getWorkspaceTypeByTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    getWorkspaces({
      page,
      limit: ITEMS_PER_PAGE,
      type: currentWorkspaceType,
      status: selectedStatus !== "all" ? selectedStatus : undefined,
      q: searchTerm.trim() || undefined,
    });
  }, [page, currentWorkspaceType, selectedStatus, searchTerm, getWorkspaces]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, searchTerm, selectedStatus]);

  const workspaceStats = useMemo(() => {
    const activeWorkspaces = workspaces.filter(
      (workspace) => workspace.status?.toLowerCase() === "active"
    ).length;

    const totalMembers = workspaces.reduce((total, workspace) => {
      return total + (workspace.members?.length ?? 0);
    }, 0);

    const totalProjects = workspaces.reduce((total, workspace) => {
      return (
        total + (workspace.projectCount ?? workspace.projects?.length ?? 0)
      );
    }, 0);

    return {
      totalWorkspaces: pagination?.total ?? workspaces.length,
      activeWorkspaces,
      totalMembers,
      totalProjects,
    };
  }, [workspaces, pagination?.total]);

  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Organizations"
        description="Manage brand and agency workspaces, members, projects, seats, and account status from one place."
      />

      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-100/80 p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("agencies")}
            className={`min-w-[180px] rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "agencies"
                ? "bg-white text-[#DE5A3F] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Agencies
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("brands")}
            className={`min-w-[180px] rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "brands"
                ? "bg-white text-[#DE5A3F] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Brands
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OrganizationStatCard
          title={`Total ${activeTab === "brands" ? "Brands" : "Agencies"}`}
          value={workspaceStats.totalWorkspaces}
          subtitle={`All ${activeTab === "brands" ? "brand" : "agency"} workspaces`}
          icon={<BriefcaseBusiness className="h-5 w-5" />}
        />

        <OrganizationStatCard
          title="Active Workspaces"
          value={workspaceStats.activeWorkspaces}
          subtitle="Currently active accounts"
          icon={<Building2 className="h-5 w-5" />}
        />

        <OrganizationStatCard
          title="Total Members"
          value={workspaceStats.totalMembers}
          subtitle="Members across current page"
          icon={<Users className="h-5 w-5" />}
        />

        <OrganizationStatCard
          title="Projects"
          value={workspaceStats.totalProjects}
          subtitle="Projects across current page"
          icon={<FolderKanban className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_180px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search workspace name or project organization name"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/10"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(event) =>
            setSelectedStatus(event.target.value as WorkspaceStatusFilter)
          }
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/10"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
            Loading {activeTab === "brands" ? "brands" : "agencies"}...
          </div>
        ) : (
          <>
            <AgenciesAccordion agencies={workspaces} />

            {totalPages > 1 ? (
              <Pagination
                pagination={pagination}
                isLoading={isLoading}
                itemLabel={activeTab === "brands" ? "brands" : "agencies"}
                onPageChange={setPage}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

function OrganizationStatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-500">{title}</p>

          <p className="mt-3 text-2xl font-bold text-slate-950">{value}</p>

          <p className="mt-4 text-xs text-slate-500">{subtitle}</p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>
      </div>
    </div>
  );
}