'use client';

import React from 'react';
import { Button } from '../button/button';
import { cn } from '@/lib/tailwind-merge';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isDanger = false,
  isLoading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-card border border-border-custom rounded-sm shadow-xl w-full max-w-md transform transition-all p-6 flex flex-col gap-6 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-xl font-montserrat font-bold text-foreground">
            {title}
          </h2>
          <p className="text-sm text-secondary-text font-roboto">
            {description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full md:w-auto order-2 md:order-1"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "w-full md:w-auto order-1 md:order-2",
              isDanger && "bg-red-600 hover:bg-red-700 text-white"
            )}
          >
            {isLoading ? 'Carregando...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
