"use client";

import { useEffect, useRef } from "react";
import { AuditLog } from "@/lib/types";
import { formatDateTime } from "@/lib/formatting";
import { LOG_ACTION_CONFIG, LOG_MODULE_CONFIG } from "@/lib/constants";
import { X } from "lucide-react";

interface LogDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  log: AuditLog | null;
}

const STATUS_COLORS: Record<string, string> = {
  success: "bg-green-50 text-green-700 border-green-200",
  failure: "bg-red-50 text-red-700 border-red-200",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export function LogDetailModal({
  open,
  onOpenChange,
  log,
}: LogDetailModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, onOpenChange]);

  if (!open || !log) return null;

  const statusClass =
    STATUS_COLORS[log.status] || "bg-slate-50 text-slate-700 border-slate-200";

  const formattedDetails = log.details
    ? JSON.stringify(log.details, null, 2)
    : "No additional details";

  return (
    <div className="fixed !mt-0 inset-0 z-[999] flex items-center justify-center bg-slate-950/55 px-4 py-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
        onClick={() => onOpenChange(false)}
      />

      <div
        ref={modalRef}
        className="relative z-10 flex max-h-[92vh] w-full max-w-[900px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#FFF7F4] to-white px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
              Audit Log Details
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              View full activity information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoCard label="Timestamp" value={formatDateTime(log.timestamp)} />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-xs font-medium text-slate-500">Status</p>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}
              >
                {log.status}
              </span>
            </div>

            <InfoCard label="Actor" value={log.actor} />
            <InfoCard
              label="Action"
              value={LOG_ACTION_CONFIG[log.action] ?? log.action}
            />
            <InfoCard
              label="Module"
              value={LOG_MODULE_CONFIG[log.module] ?? log.module}
            />
            <InfoCard
              label="Target Entity"
              value={`${log.targetEntity} #${log.targetId}`}
            />
            <InfoCard label="IP Address" value={log.ipAddress} mono />
            <InfoCard label="User Agent" value={log.userAgent} />
          </div>

        
        </div>

        <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-11 w-full rounded-xl bg-[#DE5A3F] px-5 text-sm font-semibold text-white transition hover:bg-[#c94d34] sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
      <p
        className={`break-words text-sm text-slate-900 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value || "-"}
      </p>
    </div>
  );
}