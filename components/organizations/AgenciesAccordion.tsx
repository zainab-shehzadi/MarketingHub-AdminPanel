// 'use client';

// import { Agency } from '@/lib/types';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { StatusBadge } from '@/components/shared/StatusBadge';
// import { BrandsTable } from './BrandsTable';
// import { ChevronDown } from 'lucide-react';
// import { useState } from 'react';

// interface AgenciesAccordionProps {
//   agencies: Agency[];
//   onViewBrand?: (brand: any) => void;
// }

// export function AgenciesAccordion({ agencies, onViewBrand }: AgenciesAccordionProps) {
//   const [expandedId, setExpandedId] = useState<string | null>(null);

//   return (
//     <div className="space-y-3">
//       {agencies.map((agency) => (
//         <Card key={agency.id} className="border-slate-200 bg-white shadow-sm">
//           <CardHeader
//             onClick={() => setExpandedId(expandedId === agency.id ? null : agency.id)}
//             className="cursor-pointer hover:bg-slate-50 flex-row items-center justify-between p-4 transition-colors"
//           >
//             <div className="flex-1">
//               <div className="flex items-center gap-3">
//                 <ChevronDown
//                   className={`w-4 h-4 text-slate-600 transition-transform ${
//                     expandedId === agency.id ? 'rotate-180' : ''
//                   }`}
//                 />
//                 <div>
//                   <CardTitle className="text-lg text-slate-900">{agency.name}</CardTitle>
//                   <p className="text-xs text-slate-600 mt-1">{agency.description}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-slate-900">{agency.brandCount} brands</p>
//                 <p className="text-xs text-slate-600">{agency.totalSeatsUsed} seats used</p>
//               </div>
//               <StatusBadge status={agency.status} />
//             </div>
//           </CardHeader>

//           {expandedId === agency.id && agency.brands && agency.brands.length > 0 && (
//             <CardContent className="p-4 border-t border-slate-200">
//               <BrandsTable brands={agency.brands} onView={onViewBrand} />
//             </CardContent>
//           )}
//         </Card>
//       ))}
//     </div>
//   );
// }


'use client';

import { Agency, Brand } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { BrandsTable } from './BrandsTable';
import { ChevronDown, Building2, Layers3 } from 'lucide-react';
import { useState } from 'react';

interface AgenciesAccordionProps {
  agencies: Agency[];
  onViewBrand?: (brand: Brand) => void;
}

export function AgenciesAccordion({ agencies, onViewBrand }: AgenciesAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {agencies.map((agency) => {
        const isExpanded = expandedId === agency.id;

        return (
          <Card
            key={agency.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <CardHeader
              onClick={() => setExpandedId(isExpanded ? null : agency.id)}
              className="cursor-pointer p-5 transition-colors hover:bg-slate-50"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <Building2 className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg font-semibold text-slate-900">
                        {agency.name}
                      </CardTitle>

                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <p className="mt-1 text-sm text-slate-600">
                      {agency.description || 'Managed agency workspace with linked brands.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Brands
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {agency.brandCount}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Seats
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {agency.totalSeatsUsed}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Status
                    </p>
                    <div className="mt-1 flex justify-center">
                      <StatusBadge status={agency.status} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Type
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-slate-900">
                      <Layers3 className="h-4 w-4 text-orange-600" />
                      Managed Agency
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            {isExpanded && agency.brands?.length > 0 && (
              <CardContent className="border-t border-slate-200 p-5">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Linked Brands ({agency.brands.length})
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    View all brands assigned under this agency.
                  </p>
                </div>

                <BrandsTable brands={agency.brands} onView={onViewBrand} />
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}