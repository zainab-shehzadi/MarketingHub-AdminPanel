"use client";

import { useEffect, useRef, useState } from "react";
import { Brand } from "@/lib/types";
import { Check, ChevronDown, X } from "lucide-react";

interface EditBrandModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand: Brand | null;
  onSubmit: (id: string, data: Partial<Brand>) => void;
}

type BrandPlan = "starter" | "professional" | "enterprise";
type BrandVisibility = "public" | "private";

const planOptions: BrandPlan[] = ["starter", "professional", "enterprise"];
const visibilityOptions: BrandVisibility[] = ["public", "private"];

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function EditBrandModal({
  open,
  onOpenChange,
  brand,
  onSubmit,
}: EditBrandModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [visibilityOpen, setVisibilityOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<Brand>>({});

  const modalRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!brand) return;

    setFormData({
      name: brand.name,
      website: brand.website,
      ownerEmail: brand.ownerEmail,
      plan: brand.plan,
      visibility: brand.visibility,
    });
  }, [brand]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (planOpen || visibilityOpen) {
        setPlanOpen(false);
        setVisibilityOpen(false);
        return;
      }

      onOpenChange(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setPlanOpen(false);
        setVisibilityOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, planOpen, visibilityOpen, onOpenChange]);

  if (!open || !brand) return null;

  const closeModal = () => {
    setPlanOpen(false);
    setVisibilityOpen(false);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(brand.id, formData);
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/55 px-4 py-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
        onClick={closeModal}
      />

      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="relative z-10 flex max-h-[92vh] w-full max-w-[560px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#FFF7F4] to-white px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
              Edit Brand
            </h2>
            <p className="mt-1.5 truncate text-sm leading-6 text-slate-500">
              Updating {brand.name}
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label
                htmlFor="edit-brand-name"
                className="text-sm font-medium text-slate-700"
              >
                Brand Name
              </label>

              <input
                id="edit-brand-name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter brand name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="edit-website"
                className="text-sm font-medium text-slate-700"
              >
                Website
              </label>

              <input
                id="edit-website"
                value={formData.website || ""}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="example.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="edit-owner-email"
                className="text-sm font-medium text-slate-700"
              >
                Owner Email
              </label>

              <input
                id="edit-owner-email"
                type="email"
                value={formData.ownerEmail || ""}
                onChange={(e) =>
                  setFormData({ ...formData, ownerEmail: e.target.value })
                }
                placeholder="owner@example.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Plan</p>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setPlanOpen((prev) => !prev);
                    setVisibilityOpen(false);
                  }}
                  className={`flex h-11 w-full items-center justify-between rounded-xl border px-3 text-left text-sm font-medium outline-none transition ${
                    planOpen
                      ? "border-[#DE5A3F] bg-[#FFF7F4] text-slate-900 shadow-[0_0_0_3px_rgba(222,90,63,0.12)]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span>{formatLabel(String(formData.plan || "starter"))}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      planOpen ? "rotate-180 text-[#DE5A3F]" : "text-slate-500"
                    }`}
                  />
                </button>

                {planOpen && (
                  <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#DE5A3F] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-[#FFF7F4] px-4 py-2">
                      <p className="text-sm font-semibold text-[#DE5A3F]">
                        Select Plan
                      </p>

                      <button
                        type="button"
                        onClick={() => setPlanOpen(false)}
                        className="rounded-full p-1 text-slate-500 hover:bg-white hover:text-slate-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {planOptions.map((plan) => {
                      const selected = formData.plan === plan;

                      return (
                        <button
                          key={plan}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, plan });
                            setPlanOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition ${
                            selected
                              ? "bg-[#FFF4F1] text-[#DE5A3F]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {formatLabel(plan)}
                          {selected && <Check className="h-4 w-4" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Visibility</p>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setVisibilityOpen((prev) => !prev);
                    setPlanOpen(false);
                  }}
                  className={`flex h-11 w-full items-center justify-between rounded-xl border px-3 text-left text-sm font-medium outline-none transition ${
                    visibilityOpen
                      ? "border-[#DE5A3F] bg-[#FFF7F4] text-slate-900 shadow-[0_0_0_3px_rgba(222,90,63,0.12)]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span>
                    {formatLabel(String(formData.visibility || "public"))}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      visibilityOpen
                        ? "rotate-180 text-[#DE5A3F]"
                        : "text-slate-500"
                    }`}
                  />
                </button>

                {visibilityOpen && (
                  <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#DE5A3F] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-[#FFF7F4] px-4 py-2">
                      <p className="text-sm font-semibold text-[#DE5A3F]">
                        Select Visibility
                      </p>

                      <button
                        type="button"
                        onClick={() => setVisibilityOpen(false)}
                        className="rounded-full p-1 text-slate-500 hover:bg-white hover:text-slate-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {visibilityOptions.map((visibility) => {
                      const selected = formData.visibility === visibility;

                      return (
                        <button
                          key={visibility}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, visibility });
                            setVisibilityOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition ${
                            selected
                              ? "bg-[#FFF4F1] text-[#DE5A3F]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {formatLabel(visibility)}
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
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-xl bg-[#DE5A3F] px-5 text-sm font-medium text-white transition hover:bg-[#c94d34] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}