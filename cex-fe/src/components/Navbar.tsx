import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-black px-4 py-3 flex justify-between items-center text-sm">
      <Link to="/" className="font-mono font-bold text-white tracking-wider">
        CEX
      </Link>
      <div className="flex gap-4 text-xs font-mono text-zinc-400">
        <Link to="/tickers" className="hover:text-white transition-colors">Markets</Link>
        <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
        <Link to="/history" className="hover:text-white transition-colors">History</Link>
        <Link to="/auth" className="hover:text-white transition-colors">Account</Link>
      </div>
    </nav>
  );
}