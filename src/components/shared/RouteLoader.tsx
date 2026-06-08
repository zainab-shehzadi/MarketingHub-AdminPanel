'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface RouteLoaderProps {
  duration?: number;
  show?: boolean;
  title?: string;
  description?: string;
}

export function RouteLoader({
  duration = 1000,
  show = false,

}: RouteLoaderProps) {
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [routeVisible, setRouteVisible] = useState(false);

  useEffect(() => {
    if (previousPathRef.current !== pathname) {
      setRouteVisible(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setRouteVisible(false);
      }, duration);

      previousPathRef.current = pathname;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, duration]);

  const visible = show || routeVisible;

  if (!visible) return null;

  return (
    <div className="fixed !mt-0 inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-orange-100" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-[#DE5A3F] border-t-[#DE5A3F]" />
        </div>

      
      </div>
    </div>
  );
}