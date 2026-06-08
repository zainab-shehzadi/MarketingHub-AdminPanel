"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type AdminAuthGuardProps = {
  children: React.ReactNode;
};

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
      return;
    }

    setIsChecking(false);
  }, [router, pathname]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center">
      </div>
    );
  }

  return <>{children}</>;
}