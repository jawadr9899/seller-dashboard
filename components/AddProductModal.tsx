import React, { useState } from "react";
import { Button } from "@/components/custom-ui/Button";
import { Input } from "@/components/custom-ui/Input";

export function AddProductModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product added", formData);
    setOpen(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Add Product
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            className="absolute inset-0 bg-[#1f2430]/40"
            onClick={() => setOpen(false)}
            aria-label="Close add product modal"
          />
          <div className="relative w-full max-w-md bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">
                  Add New Product
                </h3>
                <p className="text-sm text-[#7a7890] mt-1">
                  Fill out the product basics to add it to inventory.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-sm border border-[#d9d4e8] bg-white text-[#6b668f] hover:text-[#3b35d6]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111827]">
                  Product Name
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111827]">
                  SKU
                </label>
                <Input
                  required
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#111827]">
                    Price (Rs.)
                  </label>
                  <Input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#111827]">
                    Initial Stock
                  </label>
                  <Input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111827]">
                  Category
                </label>
                <Input
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Create Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
