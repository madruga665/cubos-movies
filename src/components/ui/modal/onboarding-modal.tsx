'use client';

import React, { useState } from 'react';
import { ConfirmationModal } from './confirmation-modal';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface OnboardingModalProps {
  onConfirm: () => Promise<{ success: boolean; error: string | null }>;
}

export function OnboardingModal({ onConfirm }: OnboardingModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const { success, error } = await onConfirm();
      if (success) {
        toast.success('Filmes recomendados adicionados com sucesso!');
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(error || 'Ocorreu um erro ao adicionar os filmes.');
      }
    } catch {
      toast.error('Erro ao processar sua solicitação.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="Bem-vindo ao Cubos Movies!"
      description="Gostaria de adicionar 20 filmes recomendados à sua conta para começar?"
      confirmText="Sim, adicionar"
      cancelText="Agora não"
      isLoading={isLoading}
    />
  );
}
