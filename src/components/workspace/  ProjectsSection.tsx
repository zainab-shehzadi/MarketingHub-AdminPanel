import type { ReactNode } from 'react';
import {
  Building2,
  Globe,
  MapPin,
  Target,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import type { WorkspaceProject } from '@/types/workspace';

type ProjectsSectionProps = {
  projects: WorkspaceProject[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm ring-0 transition-all">
      <CardContent className="p-5 sm:p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 sm:text-xl">
            Projects
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Projects attached to this workspace.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No projects found.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {projects.map((project) => {
              const basics = project.organizationBasics;

              return (
                <div
                  key={project._id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base font-semibold text-slate-950">
                        {basics?.organizationName || 'Untitled Project'}
                      </h4>

                      <p className="mt-1 text-sm capitalize text-slate-500">
                        {basics?.industry || 'No industry available'}
                      </p>
                    </div>

                    <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                      {project.status || 'Active'}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm">
                    <ProjectInfo
                      icon={<Globe className="h-4 w-4" />}
                      label="Website"
                      value={basics?.websiteUrl}
                      normalCase
                    />

                    <ProjectInfo
                      icon={<MapPin className="h-4 w-4" />}
                      label="Location"
                      value={basics?.businessLocation}
                    />

                    <ProjectInfo
                      icon={<Target className="h-4 w-4" />}
                      label="Target Audience"
                      value={basics?.targetAudience}
                    />

                    <ProjectInfo
                      icon={<Building2 className="h-4 w-4" />}
                      label="Company Size"
                      value={basics?.companySize}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProjectInfo({
  icon,
  label,
  value,
  normalCase = false,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
  normalCase?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p
          className={`mt-0.5 break-words font-medium text-slate-800 ${
            normalCase ? 'normal-case' : 'capitalize'
          }`}
        >
          {value || 'Not available'}
        </p>
      </div>
    </div>
  );
}