"use client";

import { useEffect, useRef, useState } from "react";
import { Subscription } from "@/lib/types";
import { X } from "lucide-react";

interface UpdateSeatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: Subscription | null;
  onSubmit: (subscriptionId: string, newSeats: number) => void;
}

export function UpdateSeatsModal({
  open,
  onOpenChange,
  subscription,
  onSubmit,
}: UpdateSeatsModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [seatsValue, setSeatsValue] = useState("");

  const modalRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (subscription) {
      setSeatsValue(subscription.seatsLimit.toString());
    }
  }, [subscription]);

  const closeModal = () => {
    if (isLoading) return;
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, isLoading]);

  if (!open || !subscription) return null;

  const seatsNumber = Number.parseInt(seatsValue, 10);
  const isInvalid =
    Number.isNaN(seatsNumber) ||
    seatsNumber < 1 ||
    seatsNumber < subscription.seatsUsed ||
    seatsNumber > 1000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subscription || isInvalid) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(subscription.id, seatsNumber);
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed !mt-0 inset-0 z-[999] flex items-center justify-center bg-slate-950/55 px-4 py-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
        onClick={closeModal}
      />

      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="relative z-10 flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#FFF7F4] to-white px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
              Update Seat Limit
            </h2>
            <p className="mt-1.5 truncate text-sm leading-6 text-slate-500">
              Update seats for {subscription.organizationName}
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            disabled={isLoading}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="space-y-2">
            <label
              htmlFor="seats"
              className="text-sm font-medium text-slate-700"
            >
              New Seat Limit
            </label>

            <input
              id="seats"
              type="number"
              min={subscription.seatsUsed}
              max={1000}
              value={seatsValue}
              onChange={(e) => setSeatsValue(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
            />

            <p className="text-xs leading-5 text-slate-500">
              Currently using {subscription.seatsUsed} seats. Seat limit cannot
              be less than used seats.
            </p>

            {isInvalid && seatsValue && (
              <p className="text-xs font-medium text-red-600">
                Enter a value between {subscription.seatsUsed} and 1000.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={closeModal}
            disabled={isLoading}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading || isInvalid}
            className="h-11 w-full rounded-xl bg-[#DE5A3F] px-5 text-sm font-semibold text-white transition hover:bg-[#c94d34] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Seats"}
          </button>
        </div>
      </form>
    </div>
  );
}