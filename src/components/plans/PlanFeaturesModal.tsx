"use client";

import { useEffect, useRef } from "react";
import type { Plan } from "@/lib/types";
import { CheckCircle2, X } from "lucide-react";

interface PlanFeaturesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
}

export function PlanFeaturesModal({
  open,
  onOpenChange,
  plan,
}: PlanFeaturesModalProps) {
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

  if (!open || !plan) return null;

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
        className="relative z-10 flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#FFF7F4] to-white px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <h2 className="text-xl font-bold capitalize tracking-[-0.02em] text-slate-900 sm:text-2xl">
              {plan.name} Plan Features
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Full feature list included in this subscription plan.
            </p>
          </div>

        
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {plan.features.length > 0 ? (
            <div className="space-y-3">
              {plan.features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#DE5A3F]" />
                  <span className="break-words">{feature}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              No features found for this plan.
            </div>
          )}
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