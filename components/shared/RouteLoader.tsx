'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface RouteLoaderProps {
  duration?: number;
}

export function RouteLoader({ duration = 1000 }: RouteLoaderProps) {
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (previousPathRef.current !== pathname) {
      setVisible(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, duration);

      previousPathRef.current = pathname;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray/10 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-orange-100" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#DE5A3F] border-r-[#DE5A3F]" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">Loading page...</p>
          <p className="text-xs text-slate-500">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}