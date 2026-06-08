import { Card, CardContent } from '@/components/ui/card';
import type { DetailCardItem } from './helpers';

type DetailCardProps = {
  title: string;
  description?: string;
  items: DetailCardItem[];
};

export function DetailCard({ title, description, items }: DetailCardProps) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm ring-0 transition-all">
      <CardContent className="p-5 sm:p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 sm:text-xl">
            {title}
          </h3>

          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>

        <div className="mt-6 divide-y divide-slate-100">
          {items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                {item.icon}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>

                <div className="mt-1 break-words text-sm font-semibold capitalize text-slate-950 sm:text-base">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}