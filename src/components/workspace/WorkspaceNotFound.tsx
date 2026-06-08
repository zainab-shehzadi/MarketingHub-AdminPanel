import { ArrowLeft, CircleAlert } from 'lucide-react';

type WorkspaceNotFoundProps = {
  onBack: () => void;
};

export function WorkspaceNotFound({ onBack }: WorkspaceNotFoundProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-amber-700 transition hover:text-amber-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to workspaces
      </button>

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
          <CircleAlert className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-amber-900">
            Workspace detail not available
          </h2>

          <p className="mt-1 text-sm text-amber-700">
            Please open this page from the workspace list because this page is
            using already fetched workspace data.
          </p>
        </div>
      </div>
    </div>
  );
}