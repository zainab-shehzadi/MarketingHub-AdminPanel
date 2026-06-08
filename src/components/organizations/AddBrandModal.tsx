"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddBrandModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BrandFormData) => void;
}

export interface BrandFormData {
  name: string;
  website: string;
  ownerEmail: string;
  plan: "starter" | "professional" | "enterprise";
  visibility: "public" | "private";
}

export function AddBrandModal({
  open,
  onOpenChange,
  onSubmit,
}: AddBrandModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BrandFormData>({
    name: "",
    website: "",
    ownerEmail: "",
    plan: "starter",
    visibility: "public",
  });

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      onSubmit(formData);

      setFormData({
        name: "",
        website: "",
        ownerEmail: "",
        plan: "starter",
        visibility: "public",
      });

      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end justify-center bg-slate-950/55 px-4 py-4 backdrop-blur-sm sm:items-center">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-[520px] overflow-hidden rounded-t-[24px] border border-slate-200 bg-white shadow-2xl sm:rounded-[24px]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
              Add New Brand
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Create a new brand in the system.
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

        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(92vh-92px)] overflow-y-auto px-5 py-5 sm:px-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="brand-name" className="text-sm font-medium text-slate-700">
                Brand Name
              </Label>
              <Input
                id="brand-name"
                placeholder="e.g., My Brand"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-orange-600 focus:ring-orange-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium text-slate-700">
                Website
              </Label>
              <Input
                id="website"
                placeholder="e.g., example.com"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-orange-600 focus:ring-orange-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner-email" className="text-sm font-medium text-slate-700">
                Owner Email
              </Label>
              <Input
                id="owner-email"
                type="email"
                placeholder="owner@example.com"
                value={formData.ownerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, ownerEmail: e.target.value })
                }
                className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-orange-600 focus:ring-orange-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan" className="text-sm font-medium text-slate-700">
                Plan
              </Label>
              <Select
                value={formData.plan}
                onValueChange={(value: BrandFormData["plan"]) =>
                  setFormData({ ...formData, plan: value })
                }
              >
                <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white text-slate-900 focus:border-orange-600 focus:ring-orange-600">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent className="z-[1000] border-slate-200 bg-white">
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility" className="text-sm font-medium text-slate-700">
                Visibility
              </Label>
              <Select
                value={formData.visibility}
                onValueChange={(value: BrandFormData["visibility"]) =>
                  setFormData({ ...formData, visibility: value })
                }
              >
                <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white text-slate-900 focus:border-orange-600 focus:ring-orange-600">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent className="z-[1000] border-slate-200 bg-white">
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading || !formData.name}
              className="h-11 w-full rounded-xl bg-orange-600 px-6 text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isLoading ? "Creating..." : "Create Brand"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}