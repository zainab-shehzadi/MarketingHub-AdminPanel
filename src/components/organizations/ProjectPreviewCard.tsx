import { FolderKanban, Globe2, MapPin, Target } from 'lucide-react';

interface ProjectPreviewCardProps {
  project: any;
}

export function ProjectPreviewCard({ project }: ProjectPreviewCardProps) {
  const basics = project.organizationBasics;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-orange-200 hover:bg-orange-50/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="break-words text-sm font-semibold text-slate-900">
            {basics?.organizationName || 'Untitled Project'}
          </h4>

          <p className="mt-1 text-xs capitalize text-slate-500">
            {basics?.projectType || 'Project'} • {project.status || 'N/A'}
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm">
          <FolderKanban className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        {basics?.industry && (
          <p className="flex items-center gap-2">
            <Target className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="capitalize">{basics.industry}</span>
          </p>
        )}

        {basics?.websiteUrl && (
          <p className="flex min-w-0 items-center gap-2">
            <Globe2 className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{basics.websiteUrl}</span>
          </p>
        )}

        {basics?.businessLocation && (
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
            <span>{basics.businessLocation}</span>
          </p>
        )}
      </div>

      {basics?.targetAudience && (
        <p className="mt-3 line-clamp-2 rounded-xl bg-white px-3 py-2 text-xs text-slate-600">
          {basics.targetAudience}
        </p>
      )}
    </div>
  );
}