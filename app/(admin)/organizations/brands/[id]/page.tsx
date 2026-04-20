'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockBrands } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PlanBadge } from '@/components/shared/PlanBadge';
import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { Edit, Trash2, Home } from 'lucide-react';
import { formatDateTime } from '@/lib/formatting';

interface BrandDetailPageProps {
  params: {
    id: string;
  };
}

export default function BrandDetailPage({ params }: BrandDetailPageProps) {
  const router = useRouter();
  const brand = mockBrands.find((b) => b.id === params.id);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!brand) {
    return (
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard" className="text-blue-400 hover:text-blue-300">
              <Home className="w-4 h-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-600" />
          <BreadcrumbItem>
            <BreadcrumbLink href="/organizations" className="text-blue-400 hover:text-blue-300">
              Organizations
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-600" />
          <BreadcrumbItem className="text-slate-400">Not Found</BreadcrumbItem>
        </Breadcrumb>
        <div className="text-center py-12">
          <p className="text-slate-400 mb-4">Brand not found</p>
          <Button
            onClick={() => router.push('/organizations')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Back to Organizations
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/organizations');
    } finally {
      setIsDeleting(false);
    }
  };

  const seatsPercentage = (brand.seatsUsed / brand.seatsLimit) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="text-blue-400 hover:text-blue-300">
                <Home className="w-4 h-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-600" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/organizations" className="text-blue-400 hover:text-blue-300">
                Organizations
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-600" />
            <BreadcrumbItem className="text-slate-400">{brand.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            className="border-red-700 text-red-400 hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-700 bg-slate-800 p-6">
          <p className="text-slate-400 text-sm mb-2">Brand Name</p>
          <p className="text-slate-100 text-lg font-semibold">{brand.name}</p>
        </Card>

        <Card className="border-slate-700 bg-slate-800 p-6">
          <p className="text-slate-400 text-sm mb-2">Status</p>
          <StatusBadge status={brand.status} />
        </Card>

        <Card className="border-slate-700 bg-slate-800 p-6">
          <p className="text-slate-400 text-sm mb-2">Plan</p>
          <PlanBadge plan={brand.plan} />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-700 bg-slate-800 p-6 space-y-4">
          <h3 className="text-slate-100 font-semibold">Organization Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Website:</span>
              <span className="text-slate-200">{brand.website}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Owner Email:</span>
              <span className="text-slate-200 text-sm">{brand.ownerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Visibility:</span>
              <span className="text-slate-200 capitalize">{brand.visibility}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Created:</span>
              <span className="text-slate-200 text-sm">{formatDateTime(brand.createdAt)}</span>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-800 p-6 space-y-4">
          <h3 className="text-slate-100 font-semibold">Seat Usage</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Used Seats:</span>
              <span className="text-slate-200 font-semibold">
                {brand.seatsUsed} / {brand.seatsLimit}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  seatsPercentage > 90
                    ? 'bg-red-500'
                    : seatsPercentage > 70
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(seatsPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">
              {((brand.seatsUsed / brand.seatsLimit) * 100).toFixed(1)}% capacity
            </p>
          </div>
        </Card>
      </div>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Brand"
        description={`Are you sure you want to delete "${brand.name}"? This action cannot be undone.`}
        actionLabel="Delete"
        isDangerous
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
