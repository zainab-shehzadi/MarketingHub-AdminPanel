'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Hash,
  Mail,
  ShieldCheck,
  User2,
} from 'lucide-react';

import { useWorkspaceStore } from '@/store/workspace.store';

import { WorkspaceNotFound } from './WorkspaceNotFound';


import {
  EmptyValue,
  getStatusBadge,
  getTypeBadge,
} from './helpers';
import { WorkspaceHero } from './  WorkspaceHero';
import { WorkspaceSummaryGrid } from './  WorkspaceSummaryItem';
import { DetailCard } from './  WorkspaceDetailCard';
import { SeatUsageCard } from './  SeatUsageCard';
import { MembersSection } from './  MembersSection';
import { ProjectsSection } from './  ProjectsSection';

type WorkspaceDetailPageProps = {
  workspaceId: string;
};

export function WorkspaceDetailPage({
  workspaceId,
}: WorkspaceDetailPageProps) {
  const router = useRouter();

  const getWorkspaceById = useWorkspaceStore((state) => state.getWorkspaceById);

  const workspace = useMemo(() => {
    return getWorkspaceById(workspaceId);
  }, [getWorkspaceById, workspaceId]);

  const handleBack = () => {
    router.push('/organizations');
  };

  if (!workspace) {
    return <WorkspaceNotFound onBack={handleBack} />;
  }

  const statusBadge = getStatusBadge(workspace.status);

  const membersCount = workspace.members?.length ?? 0;
  const projectsCount = workspace.projects?.length ?? 0;
  const usedSeats = membersCount;
  const seatsLimit = workspace.seatsLimit ?? 0;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to workspaces
      </button>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <WorkspaceHero
          workspace={workspace}
          usedSeats={usedSeats}
          seatsLimit={seatsLimit}
        />

        <WorkspaceSummaryGrid
          workspace={workspace}
          membersCount={membersCount}
          projectsCount={projectsCount}
          seatsLimit={seatsLimit}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <DetailCard
          title="Workspace Information"
          description="Core workspace identity and ownership details."
          items={[
            {
              icon: <Building2 className="h-4 w-4" />,
              label: 'Workspace Name',
              value: workspace.name || <EmptyValue />,
            },
            {
              icon: <BriefcaseBusiness className="h-4 w-4" />,
              label: 'Workspace Type',
              value: (
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getTypeBadge(
                    workspace.workspaceType
                  )}`}
                >
                  {workspace.workspaceType || 'Workspace'}
                </span>
              ),
            },
            {
              icon: <BadgeCheck className="h-4 w-4" />,
              label: 'Status',
              value: (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusBadge.className}`}
                >
                  {statusBadge.icon}
                  {statusBadge.label}
                </span>
              ),
            },
            {
              icon: <Hash className="h-4 w-4" />,
              label: 'Workspace ID',
              value: (
                <span className="break-all normal-case">{workspace._id}</span>
              ),
            },
          ]}
        />

        <DetailCard
          title="Owner Information"
          description="User who created or owns this workspace."
          items={[
            {
              icon: <User2 className="h-4 w-4" />,
              label: 'Owner Name',
              value: workspace.createdBy?.name || <EmptyValue />,
            },
            {
              icon: <Mail className="h-4 w-4" />,
              label: 'Owner Email',
              value: workspace.createdBy?.email ? (
                <span className="break-all normal-case">
                  {workspace.createdBy.email}
                </span>
              ) : (
                <EmptyValue />
              ),
            },
            {
              icon: <ShieldCheck className="h-4 w-4" />,
              label: 'Owner Role',
              value: workspace.createdBy?.role || <EmptyValue />,
            },
            {
              icon: <Building2 className="h-4 w-4" />,
              label: 'Organization Type',
              value: workspace.createdBy?.organizationType || <EmptyValue />,
            },
          ]}
        />
      </div>

      <SeatUsageCard usedSeats={usedSeats} seatsLimit={seatsLimit} />

      <MembersSection workspace={workspace} />

      <ProjectsSection projects={workspace.projects || []} />
    </div>
  );
}