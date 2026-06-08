import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageHeader({
  title,
  description,
  action,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="space-y-4 border-b border-slate-200 pb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-orange-600 hover:text-orange-700"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-slate-600">{crumb.label}</span>
              )}

              {idx < breadcrumbs.length - 1 && (
                <span className="text-slate-400">/</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              {description}
            </p>
          )}
        </div>

        {action && <div className="w-full sm:w-auto">{action}</div>}
      </div>
    </div>
  );
}