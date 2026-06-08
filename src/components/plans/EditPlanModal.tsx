"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import type { Plan, PlanName } from "@/lib/types";
import type { PlanFormData } from "./AddPlanModal";

interface EditPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
  onSubmit: (id: string, data: PlanFormData) => void;
}

const planOptions: PlanName[] = ["starter", "professional", "enterprise"];
const statusOptions: Array<"available" | "deprecated"> = [
  "available",
  "deprecated",
];

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function EditPlanModal({
  open,
  onOpenChange,
  plan,
  onSubmit,
}: EditPlanModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [featuresInput, setFeaturesInput] = useState("");
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const modalRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState<PlanFormData>({
    name: "starter",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [],
    status: "available",
  });

  useEffect(() => {
    if (!plan) return;

    setFormData({
      name: plan.name as PlanName,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      features: plan.features,
      status: plan.status,
    });

    setFeaturesInput(plan.features.join(", "));
  }, [plan]);

  const closeModal = () => {
    if (isLoading) return;
    setPlanDropdownOpen(false);
    setStatusDropdownOpen(false);
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (planDropdownOpen || statusDropdownOpen) {
        setPlanDropdownOpen(false);
        setStatusDropdownOpen(false);
        return;
      }

      closeModal();
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setPlanDropdownOpen(false);
        setStatusDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, planDropdownOpen, statusDropdownOpen, isLoading]);

  if (!open || !plan) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const features = featuresInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      onSubmit(plan.id, {
        ...formData,
        features,
      });

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
        className="relative z-10 flex max-h-[92vh] w-full max-w-[620px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#FFF7F4] to-white px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
              Edit Plan
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Update plan pricing, features, and status.
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
          <div className="grid gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Plan Name</p>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setPlanDropdownOpen((prev) => !prev);
                    setStatusDropdownOpen(false);
                  }}
                  className={`flex h-11 w-full items-center justify-between rounded-xl border px-3 text-left text-sm font-medium outline-none transition ${
                    planDropdownOpen
                      ? "border-[#DE5A3F] bg-[#FFF7F4] text-slate-900 shadow-[0_0_0_3px_rgba(222,90,63,0.12)]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span>{formatLabel(formData.name)}</span>

                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      planDropdownOpen
                        ? "rotate-180 text-[#DE5A3F]"
                        : "text-slate-500"
                    }`}
                  />
                </button>

                {planDropdownOpen && (
                  <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#DE5A3F] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-[#FFF7F4] px-4 py-2">
                      <p className="text-sm font-semibold text-[#DE5A3F]">
                        Select Plan
                      </p>

                      <button
                        type="button"
                        onClick={() => setPlanDropdownOpen(false)}
                        className="rounded-full p-1 text-slate-500 hover:bg-white hover:text-slate-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {planOptions.map((item) => {
                      const selected = formData.name === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, name: item });
                            setPlanDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition ${
                            selected
                              ? "bg-[#FFF4F1] text-[#DE5A3F]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {formatLabel(item)}
                          {selected && <Check className="h-4 w-4" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="edit-monthly-price"
                  className="text-sm font-medium text-slate-700"
                >
                  Monthly Price ($)
                </label>

                <input
                  id="edit-monthly-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.monthlyPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyPrice: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="edit-yearly-price"
                  className="text-sm font-medium text-slate-700"
                >
                  Yearly Price ($)
                </label>

                <input
                  id="edit-yearly-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.yearlyPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearlyPrice: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="edit-plan-features"
                className="text-sm font-medium text-slate-700"
              >
                Features
              </label>

              <textarea
                id="edit-plan-features"
                placeholder="Comma separated features"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                required
                className="min-h-[96px] w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Status</p>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setStatusDropdownOpen((prev) => !prev);
                    setPlanDropdownOpen(false);
                  }}
                  className={`flex h-11 w-full items-center justify-between rounded-xl border px-3 text-left text-sm font-medium outline-none transition ${
                    statusDropdownOpen
                      ? "border-[#DE5A3F] bg-[#FFF7F4] text-slate-900 shadow-[0_0_0_3px_rgba(222,90,63,0.12)]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span>{formatLabel(formData.status)}</span>

                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      statusDropdownOpen
                        ? "rotate-180 text-[#DE5A3F]"
                        : "text-slate-500"
                    }`}
                  />
                </button>

                {statusDropdownOpen && (
                  <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#DE5A3F] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-[#FFF7F4] px-4 py-2">
                      <p className="text-sm font-semibold text-[#DE5A3F]">
                        Select Status
                      </p>

                      <button
                        type="button"
                        onClick={() => setStatusDropdownOpen(false)}
                        className="rounded-full p-1 text-slate-500 hover:bg-white hover:text-slate-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {statusOptions.map((item) => {
                      const selected = formData.status === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, status: item });
                            setStatusDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition ${
                            selected
                              ? "bg-[#FFF4F1] text-[#DE5A3F]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {formatLabel(item)}
                          {selected && <Check className="h-4 w-4" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
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
            disabled={isLoading || !plan}
            className="h-11 w-full rounded-xl bg-[#DE5A3F] px-5 text-sm font-semibold text-white transition hover:bg-[#c94d34] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}