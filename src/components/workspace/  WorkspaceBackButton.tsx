'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type WorkspaceBackButtonProps = {
  className?: string;
};

export function WorkspaceBackButton({ className = '' }: WorkspaceBackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Back to workspaces
    </button>
  );
}