import React, { useState } from "react";
import { Button } from "@/components/custom-ui/Button";
import { Input } from "@/components/custom-ui/Input";

export function CreateStoreWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const nextStep = () => setStep((p) => p + 1);
  const prevStep = () => setStep((p) => p - 1);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log("Store created", formData);
    setOpen(false);
    setStep(1);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Create Store
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            className="absolute inset-0 bg-ok-heading/40"
            onClick={() => setOpen(false)}
            aria-label="Close store wizard"
          />
          <div className="relative w-full max-w-lg bg-ok-surface border border-ok-border rounded-lg shadow-xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-ok-heading">
                  Create your Store
                </h3>
                <p className="text-sm text-ok-text-muted mt-1">
                  {step === 1
                    ? "Start by branding your store. You can change these details later."
                    : "Add a brief description for your storefront."}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-sm border border-ok-border bg-white text-ok-text-muted hover:text-ok-brand"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 flex items-center gap-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className={`h-2 flex-1 rounded-full ${item <= step ? "bg-ok-brand" : "bg-ok-border"}`}
                />
              ))}
            </div>

            <div>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ok-heading">
                      Store name
                    </label>
                    <Input
                      placeholder="e.g. My Awesome Shop"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ok-heading">
                      Handle
                    </label>
                    <Input
                      placeholder="@myshop"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={nextStep}
                      disabled={!formData.name}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ok-heading">
                      Description
                    </label>
                    <textarea
                      className="w-full h-24 p-3 border border-ok-border rounded-sm bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-ok-brand/20 focus:border-ok-brand"
                      placeholder="Tell customers what your store is about..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                      Create Store
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
