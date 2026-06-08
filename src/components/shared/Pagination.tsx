'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type PaginationProps = {
  pagination: PaginationMeta | null;
  isLoading?: boolean;
  itemLabel?: string;
  onPageChange: (page: number) => void;
};

export function Pagination({
  pagination,
  isLoading = false,
  itemLabel = 'items',
  onPageChange,
}: PaginationProps) {
  if (!pagination || pagination.totalPages <= 0) return null;

  const { page, totalPages, total, hasNextPage, hasPrevPage } = pagination;

  const handlePrevious = () => {
    if (!hasPrevPage || isLoading) return;
    onPageChange(Math.max(page - 1, 1));
  };

  const handleNext = () => {
    if (!hasNextPage || isLoading) return;
    onPageChange(Math.min(page + 1, totalPages));
  };

  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 sm:flex-row">
      <p className="text-sm text-slate-600">
        Page <span className="font-medium text-slate-900">{page}</span> of{' '}
        <span className="font-medium text-slate-900">{totalPages}</span> — Total{' '}
        <span className="font-medium text-slate-900">{total}</span> {itemLabel}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasPrevPage || isLoading}
          onClick={handlePrevious}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <button
          type="button"
          disabled={!hasNextPage || isLoading}
          onClick={handleNext}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}