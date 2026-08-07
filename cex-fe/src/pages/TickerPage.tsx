import { useNavigate } from "react-router-dom";

const STOCKS = [
  { id: 1, title: "AXIS BANK", symbol: "AXIS", price: 299 },
  { id: 2, title: "HDFC BANK", symbol: "HDFC", price: 300 },
  { id: 3, title: "TATA STEEL", symbol: "TATA", price: 280 },
];

export function TickerPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto py-6 px-4 text-white">
      <h1 className="text-sm font-mono font-bold mb-3 border-b border-zinc-800 pb-2">Markets</h1>
      <div className="space-y-2">
        {STOCKS.map((stock) => (
          <div
            key={stock.id}
            onClick={() => navigate(`/stock/${stock.symbol}`)}
            className="flex justify-between items-center p-2.5 border border-zinc-800 rounded bg-black cursor-pointer hover:border-zinc-500 transition-colors text-xs"
          >
            <div>
              <div className="font-semibold">{stock.title}</div>
              <div className="text-[10px] text-zinc-500 font-mono">{stock.symbol}</div>
            </div>
            <div className="text-right font-mono font-bold">
              ₹{stock.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}