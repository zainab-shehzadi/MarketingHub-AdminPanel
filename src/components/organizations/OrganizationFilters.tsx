'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface OrganizationFiltersProps {
  onSearchChange?: (value: string) => void;
  onPlanChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
}

export function OrganizationFilters({ onSearchChange, onPlanChange, onStatusChange }: OrganizationFiltersProps) {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <Input
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearchChange?.(e.target.value);
          }}
          className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-orange-600 focus:ring-orange-600"
        />
      </div>

      <Select onValueChange={onPlanChange}>
        <SelectTrigger className="bg-white border-slate-200 text-slate-900 w-full md:w-48 focus:border-orange-600 focus:ring-orange-600">
          <SelectValue placeholder="All Plans" />
        </SelectTrigger>
        <SelectContent className="bg-white border-slate-200">
          <SelectItem value="all">All Plans</SelectItem>
          <SelectItem value="starter">Starter</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onStatusChange}>
        <SelectTrigger className="bg-white border-slate-200 text-slate-900 w-full md:w-48 focus:border-orange-600 focus:ring-orange-600">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent className="bg-white border-slate-200">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      {search && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSearch('');
            onSearchChange?.('');
          }}
          className="border-slate-200 text-slate-700 hover:bg-slate-100"
        >
          <X className="w-4 h-4 mr-2" />
          Clear
        </Button>
      )}
    </div>
  );
}
