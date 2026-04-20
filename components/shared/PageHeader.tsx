import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageHeader({ title, description, action, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-slate-700">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {crumb.href ? (
                <a href={crumb.href} className="text-blue-400 hover:text-blue-300">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-slate-400">{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && <span className="text-slate-600">/</span>}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {description && <p className="text-slate-400 mt-1">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
