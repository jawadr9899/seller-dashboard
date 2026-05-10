import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/custom-ui/Button';
import { Input } from '@/components/custom-ui/Input';
import { useAppDispatch } from '@/hooks/useRedux';

export function AddProductModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ sku: '', name: '', price: '', stock: '', category: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch action here (just dummy for now or extended later)
    console.log('Product added', formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Name</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">SKU</label>
            <Input required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price (Rs.)</label>
            <Input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Stock</label>
            <Input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          </div>
          <Button type="submit" variant="primary" className="w-full">Create Product</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
