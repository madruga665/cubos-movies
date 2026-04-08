type MonetaryInfoProps = {
  budget: string | null;
  revenue: string | null;
  profit: string | null;
};

export function MonetaryInfo({ budget, revenue, profit }: MonetaryInfoProps) {
  return (
    <div className="flex items-center justify-center w-full gap-4">
      <div className="card-glass flex-1">
        <h2 className="heading2">orçamento</h2>
        <p className="paragrah">{budget}</p>
      </div>

      <div className="card-glass flex-1">
        <h2 className="heading2">receita</h2>
        <p className="paragrah">{revenue}</p>
      </div>

      <div className="card-glass flex-1">
        <h2 className="heading2">lucro</h2>
        <p className="paragrah">{profit}</p>
      </div>
    </div>
  );
}
