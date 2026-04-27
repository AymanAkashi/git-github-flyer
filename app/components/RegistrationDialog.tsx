'use client'

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

type RegistrationResult = { success?: boolean; error?: string };

type RegistrationDialogProps = {
  onSubmit: (formData: FormData) => Promise<RegistrationResult>;
};

export default function RegistrationDialog({ onSubmit }: Readonly<RegistrationDialogProps>) {
  const [status, setStatus] = useState<RegistrationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setStatus(null);
    const result = await onSubmit(formData);
    setStatus(result);
    setIsSubmitting(false);
    if (result.success) {
      setIsOpen(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setStatus(null);
        }}
      >
        <Dialog.Trigger asChild>
          <div className="cta-badge" style={{ cursor: 'pointer' }}>
            Register Now
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 50,
            }}
          />
          <Dialog.Content
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              maxWidth: '450px',
              maxHeight: '85vh',
              padding: '24px',
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              zIndex: 51,
              fontFamily: 'inherit',
              color: '#c9d1d9',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <Dialog.Title style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#e6edf3' }}>
                Registration
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer', padding: '4px' }}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description style={{ margin: '0 0 20px', color: '#8b949e', fontSize: '14px' }}>
              Sign up for the Git & GitHub Workshop Series to secure your spot.
            </Dialog.Description>
            <p style={{ margin: '0 0 16px', color: '#58a6ff', fontSize: '12px' }}>
              Small note: workshop access details will be sent to your email after registration.
            </p>

            {status?.error && (
              <div
                style={{
                  color: '#ff7b72',
                  marginBottom: '15px',
                  padding: '10px',
                  background: 'rgba(255, 123, 114, 0.1)',
                  border: '1px solid rgba(255, 123, 114, 0.4)',
                  borderRadius: '5px',
                }}
              >
                {status.error}
              </div>
            )}

            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="username" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  style={{
                    padding: '10px',
                    backgroundColor: '#010409',
                    border: '1px solid #30363d',
                    borderRadius: '6px',
                    color: '#c9d1d9',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="filier" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Filier
                </label>
                <input
                  type="text"
                  id="filier"
                  name="filier"
                  style={{
                    padding: '10px',
                    backgroundColor: '#010409',
                    border: '1px solid #30363d',
                    borderRadius: '6px',
                    color: '#c9d1d9',
                    outline: 'none',
                    textTransform: 'uppercase',
                  }}
                  onInput={e => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.toUpperCase();
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="phone" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  style={{
                    padding: '10px',
                    backgroundColor: '#010409',
                    border: '1px solid #30363d',
                    borderRadius: '6px',
                    color: '#c9d1d9',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  style={{
                    padding: '10px',
                    backgroundColor: '#010409',
                    border: '1px solid #30363d',
                    borderRadius: '6px',
                    color: '#c9d1d9',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '12px',
                  marginTop: '8px',
                  backgroundColor: '#238636',
                  color: '#ffffff',
                  border: '1px solid rgba(240, 246, 252, 0.1)',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {showSuccessToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            zIndex: 70,
            background: '#0d1117',
            color: '#3fb950',
            border: '1px solid rgba(63, 185, 80, 0.5)',
            borderRadius: '8px',
            padding: '12px 14px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Successfully registered! Check your email for workshop details.
        </div>
      )}
    </>
  );
}
