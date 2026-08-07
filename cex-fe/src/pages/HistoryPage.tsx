export function HistoryPage() {
  const trades = [
    { id: 1, type: "BUY", symbol: "AXIS", qty: 200, price: 150 },
    { id: 2, type: "BUY", symbol: "HDFC", qty: 20, price: 200 },
    { id: 3, type: "SELL", symbol: "TATA", qty: 20, price: 2000 },
  ];

  return (
    <div className="max-w-xs mx-auto py-6 px-4 text-white">
      <div className="border border-zinc-800 rounded p-3 bg-black space-y-2">
        <h1 className="text-xs font-mono font-bold border-b border-zinc-800 pb-2">History</h1>

        <div className="space-y-1.5">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="flex justify-between items-center p-2 border border-zinc-800 rounded text-xs font-mono"
            >
              <div className="flex gap-2 items-center">
                <span className="border border-zinc-700 px-1 py-0.2 rounded text-[9px] text-zinc-400">
                  {trade.type}
                </span>
                <span className="font-bold">{trade.symbol}</span>
              </div>
              <span className="text-zinc-400">
                {trade.qty} @ ₹{trade.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}