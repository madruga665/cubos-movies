import { Spinner } from '@/components/ui/spinner/spinner';

export default function Loading() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" className="text-primary" />
        <p className="text-secondary-text font-roboto">
          Carregando detalhes do filme...
        </p>
      </div>
    </div>
  );
}
