"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Brand } from "@/lib/types";
import { Check, ChevronDown, Search, X } from "lucide-react";

type AgencyStatus = "active" | "inactive" | "suspended";

interface AddAgencyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brands: Brand[];
  onSubmit: (payload: {
    name: string;
    description: string;
    status: AgencyStatus;
    brandIds: string[];
  }) => void;
}

const statusOptions: AgencyStatus[] = ["active", "inactive", "suspended"];

export function AddAgencyModal({
  open,
  onOpenChange,
  brands,
  onSubmit,
}: AddAgencyModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<AgencyStatus>("active");
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef<HTMLFormElement | null>(null);

  const selectedBrands = useMemo(
    () => brands.filter((brand) => selectedBrandIds.includes(brand.id)),
    [brands, selectedBrandIds]
  );

  const filteredBrands = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    if (!keyword) return brands;

    return brands.filter((brand) =>
      `${brand.name} ${brand.ownerEmail} ${brand.website}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [brands, search]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("active");
    setSelectedBrandIds([]);
    setStatusDropdownOpen(false);
    setBrandsDropdownOpen(false);
    setSearch("");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrandIds((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      status,
      brandIds: selectedBrandIds,
    });

    handleClose();
  };

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (statusDropdownOpen || brandsDropdownOpen) {
        setStatusDropdownOpen(false);
        setBrandsDropdownOpen(false);
        return;
      }

      handleClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setStatusDropdownOpen(false);
        setBrandsDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, statusDropdownOpen, brandsDropdownOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/55 px-4 py-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
        onClick={handleClose}
      />

      <form
        ref={wrapperRef}
        onSubmit={handleSubmit}
        className="relative z-10 flex max-h-[92vh] w-full max-w-[620px] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#FFF7F4] to-white px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
              Add Agency
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Create a new agency and assign existing brands.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
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
                htmlFor="agency-name"
                className="text-sm font-medium text-slate-700"
              >
                Agency Name
              </label>

              <input
                id="agency-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter agency name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="agency-description"
                className="text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="agency-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description"
                className="min-h-[100px] w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Status</p>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setStatusDropdownOpen((prev) => !prev);
                    setBrandsDropdownOpen(false);
                  }}
                  className={`flex h-12 w-full items-center justify-between rounded-xl border px-3 text-left text-sm font-medium capitalize outline-none transition ${
                    statusDropdownOpen
                      ? "border-[#DE5A3F] bg-[#FFF7F4] text-slate-900 shadow-[0_0_0_3px_rgba(222,90,63,0.12)]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span>{status}</span>

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
                    {statusOptions.map((item) => {
                      const isSelected = status === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setStatus(item);
                            setStatusDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium capitalize transition ${
                            isSelected
                              ? "bg-[#FFF4F1] text-[#DE5A3F]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {item}
                          {isSelected && <Check className="h-4 w-4" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">
                Assign Brands
              </p>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setBrandsDropdownOpen((prev) => !prev);
                    setStatusDropdownOpen(false);
                  }}
                  className={`flex h-12 w-full items-center justify-between rounded-xl border px-3 text-left text-sm outline-none transition ${
                    brandsDropdownOpen
                      ? "border-[#DE5A3F] bg-[#FFF7F4] text-slate-900 shadow-[0_0_0_3px_rgba(222,90,63,0.12)]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">
                    {selectedBrandIds.length > 0
                      ? `${selectedBrandIds.length} brand${
                          selectedBrandIds.length > 1 ? "s" : ""
                        } selected`
                      : "Select brands"}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      brandsDropdownOpen
                        ? "rotate-180 text-[#DE5A3F]"
                        : "text-slate-500"
                    }`}
                  />
                </button>
{brandsDropdownOpen && (
  <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#DE5A3F] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
    <div className="flex items-center justify-between border-b border-slate-100 bg-[#FFF7F4] px-4 py-2">
      <p className="text-sm font-semibold text-[#DE5A3F]">Select Brands</p>

      <button
        type="button"
        onClick={() => setBrandsDropdownOpen(false)}
        className="rounded-full p-1 text-slate-500 hover:bg-white hover:text-slate-900"
      >
        <X className="h-4 w-4" />
      </button>
    </div>

    <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
      <Search className="h-4 w-4 shrink-0 text-slate-400" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search brands..."
        className="h-9 w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
    </div>
    <div className="max-h-56 overflow-y-auto p-1">
                      {filteredBrands.length > 0 ? (
                        filteredBrands.map((brand) => {
                          const checked = selectedBrandIds.includes(brand.id);

                          return (
                            <button
                              key={brand.id}
                              type="button"
                              onClick={() => toggleBrand(brand.id)}
                              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition ${
                                checked
                                  ? "bg-[#FFF4F1]"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <div className="min-w-0">
                                <p
                                  className={`truncate text-sm font-medium ${
                                    checked
                                      ? "text-[#DE5A3F]"
                                      : "text-slate-900"
                                  }`}
                                >
                                  {brand.name}
                                </p>

                                <p className="truncate text-xs text-slate-500">
                                  {brand.ownerEmail}
                                </p>
                              </div>

                              <Check
                                className={`h-4 w-4 shrink-0 ${
                                  checked
                                    ? "text-[#DE5A3F] opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                            </button>
                          );
                        })
                      ) : (
                        <p className="px-3 py-4 text-center text-sm text-slate-500">
                          No brand found.
                        </p>
                      )}
                    </div>
  </div>
)}
              
              </div>

              {selectedBrands.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedBrands.map((brand) => (
                    <span
                      key={brand.id}
                      className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#FFF4F1] px-3 py-1.5 text-sm font-medium text-[#DE5A3F]"
                    >
                      <span className="truncate">{brand.name}</span>

                      <button
                        type="button"
                        onClick={() => toggleBrand(brand.id)}
                        className="shrink-0"
                        aria-label={`Remove ${brand.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={handleClose}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!name.trim()}
            className="h-11 w-full rounded-xl bg-[#DE5A3F] px-5 text-sm font-medium text-white transition hover:bg-[#c94d34] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Create Agency
          </button>
        </div>
      </form>
    </div>
  );
}