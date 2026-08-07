import { useState } from "react";

export function TradeForm({ symbol }: { symbol: string }) {
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [type, setType] = useState<"LIMIT" | "MARKET">("LIMIT");
  const [price, setPrice] = useState<number>(200);
  const [qty, setQty] = useState<number>(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${side} ${qty} ${symbol} @ ${type === "LIMIT" ? price : "MARKET"}`);
  };

  return (
    <div className="bg-black border border-zinc-800 p-3 rounded text-xs text-white">
      {/* Side Toggle */}
      <div className="flex border border-zinc-800 rounded mb-3 overflow-hidden">
        <button
          type="button"
          onClick={() => setSide("BUY")}
          className={`flex-1 py-1 font-mono ${
            side === "BUY" ? "bg-white text-black font-bold" : "bg-black text-zinc-500"
          }`}
        >
          BUY
        </button>
        <button
          type="button"
          onClick={() => setSide("SELL")}
          className={`flex-1 py-1 font-mono ${
            side === "SELL" ? "bg-white text-black font-bold" : "bg-black text-zinc-500"
          }`}
        >
          SELL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Order Type Toggle */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType("LIMIT")}
            className={`px-2 py-0.5 rounded border ${
              type === "LIMIT" ? "border-white text-white" : "border-zinc-800 text-zinc-600"
            }`}
          >
            LIMIT
          </button>
          <button
            type="button"
            onClick={() => setType("MARKET")}
            className={`px-2 py-0.5 rounded border ${
              type === "MARKET" ? "border-white text-white" : "border-zinc-800 text-zinc-600"
            }`}
          >
            MARKET
          </button>
        </div>

        {type === "LIMIT" && (
          <div>
            <label className="block text-zinc-500 mb-1">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white focus:outline-none focus:border-white"
            />
          </div>
        )}

        <div>
          <label className="block text-zinc-500 mb-1">Qty</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-white focus:outline-none focus:border-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-bold py-1.5 rounded text-xs hover:bg-zinc-200 transition-colors"
        >
          Place {side} Order
        </button>
      </form>
    </div>
  );
}