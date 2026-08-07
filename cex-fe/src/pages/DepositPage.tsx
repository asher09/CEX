import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function DepositPage() {
  const [amount, setAmount] = useState<number>(50000);
  const navigate = useNavigate();

  const handleDeposit = () => {
    alert(`Deposited ₹${amount}`);
    navigate("/portfolio");
  };

  return (
    <div className="max-w-xs mx-auto py-12 px-4 text-white">
      <div className="border border-zinc-800 p-3 rounded bg-black text-center space-y-3">
        <h1 className="text-[10px] font-mono text-zinc-500">DEPOSIT INR</h1>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full text-center text-lg font-mono bg-zinc-900 border border-zinc-800 rounded py-1.5 text-white focus:outline-none focus:border-white"
        />

        <button
          onClick={handleDeposit}
          className="w-full bg-white text-black font-bold py-1.5 rounded text-xs hover:bg-zinc-200 transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}