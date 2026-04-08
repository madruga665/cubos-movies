type MonetaryInfoProps = {
  budget: string | null;
  revenue: string | null;
  profit: string | null;
};

export function MonetaryInfo({ budget, revenue, profit }: MonetaryInfoProps) {
  return (
    <div className="flex items-center justify-center w-full gap-4">
      <div className="card-glass flex-1">
        <h2 className="text-[12px] text-[#B5B2BC] font-bold uppercase ">orçamento</h2>
        <p className="text-[14px]">{budget}</p>
      </div>

      <div className="card-glass flex-1">
        <h2 className="text-[12px] text-[#B5B2BC] font-bold uppercase ">receita</h2>
        <p className="text-[14px]">{revenue}</p>
      </div>

      <div className="card-glass flex-1">
        <h2 className="text-[12px] text-[#B5B2BC] font-bold uppercase ">lucro</h2>
        <p className="text-[14px]">{profit}</p>
      </div>
    </div>
  );
}
