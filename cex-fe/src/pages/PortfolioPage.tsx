import { useNavigate } from "react-router-dom";

export function PortfolioPage() {
  const navigate = useNavigate();

  const holdings = [
    { label: "INR", value: "₹30,000" },
    { label: "AXIS", value: "₹8,000" },
    { label: "HDFC", value: "₹2,000" },
  ];

  return (
    <div className="max-w-xs mx-auto py-6 px-4 text-white">
      <div className="border border-zinc-800 rounded p-3 bg-black space-y-3">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
          <div>
            <span className="text-[10px] text-zinc-500 font-mono">EQUITY</span>
            <h2 className="text-base font-mono font-bold">₹40,000</h2>
          </div>
          <button
            onClick={() => navigate("/deposit")}
            className="border border-white text-white px-2.5 py-0.5 rounded text-xs hover:bg-white hover:text-black transition-colors"
          >
            Deposit
          </button>
        </div>

        <div className="space-y-1.5">
          {holdings.map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center p-2 border border-zinc-800 rounded text-xs font-mono"
            >
              <span className="text-zinc-400">{item.label}</span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}