import { Spinner } from '@/components/ui/spinner/spinner';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-primary" />
        <p className="text-foreground font-roboto text-lg animate-pulse">
          Carregando conteúdo...
        </p>
      </div>
    </div>
  );
}
