"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => void;
}

export interface UserFormData {
  email: string;
  name: string;
  role: "admin" | "moderator" | "user";
}

const roleOptions: UserFormData["role"][] = ["user", "moderator", "admin"];

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function AddUserModal({
  open,
  onOpenChange,
  onSubmit,
}: AddUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    name: "",
    role: "user",
  });

  const modalRef = useRef<HTMLFormElement | null>(null);

  const closeModal = () => {
    if (isLoading) return;
    setRoleOpen(false);
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (roleOpen) {
        setRoleOpen(false);
        return;
      }

      closeModal();
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setRoleOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, roleOpen, isLoading]);

  if (!open) return null;

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      role: "user",
    });
    setRoleOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
      });

      resetForm();
      onOpenChange(false);
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
          <div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
              Add New User
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Create a new user account in the system
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
              <label
                htmlFor="user-name"
                className="text-sm font-medium text-slate-700"
              >
                Full Name
              </label>

              <input
                id="user-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                required
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="user-email"
                className="text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <input
                id="user-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                required
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#DE5A3F] focus:ring-2 focus:ring-[#DE5A3F]/15"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Role</p>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleOpen((prev) => !prev)}
                  className={`flex h-11 w-full items-center justify-between rounded-xl border px-3 text-left text-sm font-medium outline-none transition ${
                    roleOpen
                      ? "border-[#DE5A3F] bg-[#FFF7F4] text-slate-900 shadow-[0_0_0_3px_rgba(222,90,63,0.12)]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span>{formatLabel(formData.role)}</span>

                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      roleOpen ? "rotate-180 text-[#DE5A3F]" : "text-slate-500"
                    }`}
                  />
                </button>

                {roleOpen && (
                  <div className="mt-2 overflow-hidden rounded-xl border-2 border-[#DE5A3F] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-[#FFF7F4] px-4 py-2">
                      <p className="text-sm font-semibold text-[#DE5A3F]">
                        Select Role
                      </p>

                      <button
                        type="button"
                        onClick={() => setRoleOpen(false)}
                        className="rounded-full p-1 text-slate-500 hover:bg-white hover:text-slate-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {roleOptions.map((role) => {
                      const selected = formData.role === role;

                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, role });
                            setRoleOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition ${
                            selected
                              ? "bg-[#FFF4F1] text-[#DE5A3F]"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {formatLabel(role)}
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
            disabled={
              isLoading || !formData.name.trim() || !formData.email.trim()
            }
            className="h-11 w-full rounded-xl bg-[#DE5A3F] px-5 text-sm font-semibold text-white transition hover:bg-[#c94d34] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}