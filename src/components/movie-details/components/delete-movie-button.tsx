'use client';

import { Button } from '../../ui/button/button';
import { deleteMovieAction } from '@/app/dashboard/movies/[id]/delete-action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ConfirmationModal } from '../../ui/modal/confirmation-modal';

interface DeleteMovieButtonProps {
  movieId: string;
  className?: string;
}

export function DeleteMovieButton({ movieId, className }: DeleteMovieButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const result = await deleteMovieAction(movieId);

      if (result.success) {
        setIsModalOpen(false);
        toast.success('Filme excluído com sucesso!');
        
        // Wait for the success toast to be visible before showing the next info and redirecting
        setTimeout(() => {
          toast.info('Redirecionando para a dashboard...');
          router.push('/dashboard');
        }, 2000);
      } else {
        toast.error(result.error || 'Erro ao excluir filme');
        setIsDeleting(false);
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado');
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        className={className}
        onClick={() => setIsModalOpen(true)}
        disabled={isDeleting}
      >
        {isDeleting ? 'Excluindo...' : 'Deletar'}
      </Button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Excluir Filme"
        description="Tem certeza que deseja excluir este filme? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        isDanger={true}
        isLoading={isDeleting}
      />
    </>
  );
}
