import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/custom-ui/Button';
import { Input } from '@/components/custom-ui/Input';

export function CreateStoreWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' });

  const nextStep = () => setStep(p => p + 1);
  const prevStep = () => setStep(p => p - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Store created', formData);
    setOpen(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Create Store</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create your Store</DialogTitle>
          <p className="text-sm text-gray-500">
            {step === 1 ? 'Start by branding your store. You can change these details later.' : 'Add a brief description.'}
          </p>
        </DialogHeader>
        <div className="pt-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Store name</label>
                <Input placeholder="e.g. My Awesome Shop" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Handle</label>
                <Input placeholder="@myshop" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={nextStep} disabled={!formData.name}>Continue</Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full h-24 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Tell customers what your store is about..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={prevStep}>Back</Button>
                <Button variant="primary" onClick={handleSubmit}>Create Store</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
