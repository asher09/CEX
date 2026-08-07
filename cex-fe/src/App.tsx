import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { TickerPage } from "./pages/TickerPage";
import { StockDetailPage } from "./pages/StockDetailPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { DepositPage } from "./pages/DepositPage";
import { HistoryPage } from "./pages/HistoryPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-darkBg text-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/tickers" replace />} />
            <Route path="/tickers" element={<TickerPage />} />
            <Route path="/stock/:symbol" element={<StockDetailPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/deposit" element={<DepositPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}