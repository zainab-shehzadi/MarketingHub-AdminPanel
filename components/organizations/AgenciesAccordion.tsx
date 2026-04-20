'use client';

import { Agency } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { BrandsTable } from './BrandsTable';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface AgenciesAccordionProps {
  agencies: Agency[];
  onViewBrand?: (brand: any) => void;
}

export function AgenciesAccordion({ agencies, onViewBrand }: AgenciesAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {agencies.map((agency) => (
        <Card key={agency.id} className="border-slate-700 bg-slate-800/50">
          <CardHeader
            onClick={() => setExpandedId(expandedId === agency.id ? null : agency.id)}
            className="cursor-pointer hover:bg-slate-700/30 flex-row items-center justify-between p-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    expandedId === agency.id ? 'rotate-180' : ''
                  }`}
                />
                <div>
                  <CardTitle className="text-lg">{agency.name}</CardTitle>
                  <p className="text-xs text-slate-400 mt-1">{agency.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{agency.brandCount} brands</p>
                <p className="text-xs text-slate-400">{agency.totalSeatsUsed} seats used</p>
              </div>
              <StatusBadge status={agency.status} />
            </div>
          </CardHeader>

          {expandedId === agency.id && agency.brands && agency.brands.length > 0 && (
            <CardContent className="p-4 border-t border-slate-700">
              <BrandsTable brands={agency.brands} onView={onViewBrand} />
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
