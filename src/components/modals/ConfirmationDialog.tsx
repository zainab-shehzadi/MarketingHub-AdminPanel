"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  actionLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  actionLabel = "Confirm",
  cancelLabel = "Cancel",
  isDangerous = false,
  isLoading = false,
  onConfirm,
}: ConfirmationDialogProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onOpenChange(false);
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !isLoading
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
  }, [open, isLoading, onOpenChange]);

  if (!open) return null;

  const handleConfirm = async () => {
    await onConfirm();
  };

  const handleCancel = () => {
    if (!isLoading) onOpenChange(false);
  };

  return (
    <div className="fixed !mt-0 inset-0 z-[999] flex items-center justify-center bg-slate-950/55 px-4 py-4 backdrop-blur-sm">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[440px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
              isDangerous
                ? "bg-red-50 text-red-600"
                : "bg-[#FFF4F1] text-[#DE5A3F]"
            }`}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={`h-11 w-full rounded-xl px-5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${
              isDangerous
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#DE5A3F] hover:bg-[#c94d34]"
            }`}
          >
            {isLoading ? "Loading..." : actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}