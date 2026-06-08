'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Building2,
  ChevronDown,
  ExternalLink,
  FolderKanban,
  Mail,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Workspace } from '@/types/workspace';

import { WorkspaceStatCard } from './WorkspaceStatCard';
import { WorkspaceEmptyState } from './WorkspaceEmptyState';
import { ProjectPreviewCard } from './ProjectPreviewCard';

interface AgenciesAccordionProps {
  agencies: Workspace[];
}

const formatDate = (date?: string) => {
  if (!date) return 'N/A';

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};

export function AgenciesAccordion({ agencies }: AgenciesAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!agencies.length) {
    return <WorkspaceEmptyState />;
  }

  return (
    <div className="space-y-4">
      {agencies.map((agency) => {
        const isExpanded = expandedId === agency._id;
        const members = agency.members ?? [];
        const projects = agency.projects ?? [];
        const usedSeats = members.length;
        const ownerName = agency.createdBy?.name || 'N/A';
        const ownerEmail = agency.createdBy?.email || 'N/A';

        return (
          <Card
            key={agency._id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-orange-200 hover:shadow-md"
          >
            <CardHeader
              onClick={() => setExpandedId(isExpanded ? null : agency._id)}
              className="cursor-pointer p-4 transition-colors hover:bg-slate-50 sm:p-5"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <Building2 className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <CardTitle className="break-words text-lg font-semibold text-slate-900">
                        {agency.name}
                      </CardTitle>

                      <StatusBadge status={agency.status} />

                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                      <span className="inline-flex min-w-0 items-center gap-1.5">
                        <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                        <span className="break-all">{ownerEmail}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[560px]">
                  <WorkspaceStatCard label="Members" value={usedSeats} />
                  <WorkspaceStatCard
                    label="Seats"
                    value={`${usedSeats}/${agency.seatsLimit}`}
                  />
                  <WorkspaceStatCard label="Projects" value={projects.length} />
                  <WorkspaceStatCard
                    label="Updated"
                    value={formatDate(agency.updatedAt)}
                  />
                </div>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Owner
                    </p>

                    <div className="mt-3 space-y-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {ownerName}
                      </p>

                      <p className="break-all text-sm text-slate-600">
                        {ownerEmail}
                      </p>

                      <p className="text-sm capitalize text-slate-500">
                        Role: {agency.createdBy?.role || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Workspace Summary
                    </p>

                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Type</span>
                        <span className="font-medium capitalize text-slate-900">
                          {agency.workspaceType}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Status</span>
                        <StatusBadge status={agency.status} />
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Created</span>
                        <span className="font-medium text-slate-900">
                          {formatDate(agency.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Projects ({projects.length})
                      </h3>

                      <p className="mt-1 text-sm text-slate-600">
                        Important project details linked with this workspace.
                      </p>
                    </div>

                    <Link
                      href={`/workspaces/${agency._id}`}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#DE5A3F] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c94d34] sm:w-auto"
                    >
                      View Detail
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>

                  {projects.length > 0 ? (
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {projects.slice(0, 4).map((project) => (
                        <ProjectPreviewCard
                          key={project._id}
                          project={project}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                      <FolderKanban className="mx-auto h-6 w-6 text-slate-400" />

                      <p className="mt-2 text-sm font-medium text-slate-700">
                        No projects found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Project details will appear here once available.
                      </p>
                    </div>
                  )}

                  {projects.length > 4 && (
                    <p className="mt-3 text-xs text-slate-500">
                      Showing 4 of {projects.length} projects. Open detail page
                      to view all records.
                    </p>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}