import { useParams } from "react-router-dom";
import { TradeForm } from "../components/TradeForm";

export function StockDetailPage() {
  const { symbol = "AXIS" } = useParams();

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 text-white">
      <h1 className="text-sm font-mono font-bold mb-3">{symbol}</h1>

      <div className="grid md:grid-cols-2 gap-3">
        {/* Minimal SVG Chart Placeholder */}
        <div className="border border-zinc-800 p-3 rounded bg-black flex flex-col justify-between h-[240px]">
          <span className="text-[10px] text-zinc-500 font-mono">CHART ({symbol})</span>
          <div className="w-full h-24 flex items-center justify-center">
            <svg className="w-full h-20 stroke-white fill-none stroke-1">
              <path d="M 0 50 Q 50 10, 100 40 T 200 10 T 300 30" />
            </svg>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-zinc-600">
            <span>09:30</span>
            <span>12:00</span>
            <span>15:30</span>
          </div>
        </div>

        {/* Form */}
        <TradeForm symbol={symbol} />
      </div>
    </div>
  );
}