'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between py-4 px-2">
      <div className="text-sm text-slate-600">
        Showing {startItem} to {endItem} of {totalItems} items
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {startPage > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(1)}
              className={currentPage === 1 ? 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}
            >
              1
            </Button>
            {startPage > 2 && <span className="text-slate-400">...</span>}
          </>
        )}

        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(page)}
            className={currentPage === page ? 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}
          >
            {page}
          </Button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-slate-400">...</span>}
            <Button
              variant={currentPage === totalPages ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(totalPages)}
              className={currentPage === totalPages ? 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
