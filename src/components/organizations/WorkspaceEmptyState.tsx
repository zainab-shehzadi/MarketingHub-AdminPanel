import { Building2 } from 'lucide-react';

export function WorkspaceEmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
        <Building2 className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900">
        No workspaces found
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Workspaces will appear here once available.
      </p>
    </div>
  );
}