import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { simulateScan, ScannedItem } from "../utils/aiScan";
import { ScanLoadingOverlay } from "../components/Skeleton";

export default function Scan() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [detectedItems, setDetectedItems] = useState<ScannedItem[]>([]);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const items = await simulateScan();
      setDetectedItems(items);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    setDetectedItems(items => items.filter(i => i.id !== id));
  };

  const handleConfirm = () => {
    navigate("/scan/results", { state: { scannedItems: detectedItems } });
  };

  return (
    <div className="bg-background-light text-slate-900 overflow-hidden h-screen flex flex-col">
      {isScanning && <ScanLoadingOverlay />}

      <div className="fixed inset-0 z-0">
        <img 
          alt="Modern kitchen counter with fresh groceries" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtsY8xmiNcqZqUbhYMFsA23Ej6yY6nBFYq63b5HFZpf4T50ZNdeei_SJ00vZDvzTMQwxRfYDqmINdIETV7VscQo2_ra5YhHKN70MJQYPU-gd6nINBOlLn0Sd-Px3E5asZ8UQUin6zykJYCdbXkV0Ntr2bo2eiLFHN4_VNMWNs0QaeS-6DFZx2XABg3k7a9BpHf1Tw5uSXpjAM8GtLpNMyS8Q7azJ-Yte8lin-LXyFVjMB9shHdxCjHEyVzPY1ePvJkyGgrMpJJeYXL" 
        />
        <div className="absolute inset-0 bg-black/10">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_#3B82F6] absolute w-full top-[40%]"></div>

          <div className="absolute top-[25%] left-[20%] w-24 h-48 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm absolute -top-5 -left-[2px]">Milk 98%</span>
          </div>

          <div className="absolute top-[55%] left-[45%] w-32 h-20 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm absolute -top-5 -left-[2px]">Eggs 95%</span>
          </div>

          <div className="absolute top-[40%] left-[65%] w-20 h-20 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm absolute -top-5 -left-[2px]">Tomatoes 99%</span>
          </div>

          <div className="absolute top-[15%] left-[55%] w-36 h-24 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm absolute -top-5 -left-[2px]">Bread 92%</span>
          </div>
        </div>
      </div>

      <header className="relative z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full">
          <span className="text-white font-semibold text-sm">Smart Scanning</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
          <span className="material-symbols-outlined">flashlight_on</span>
        </button>
      </header>

      <div className="flex-1 relative z-10"></div>

      <section className="relative z-10 px-4 pb-4">
        <div className="glass-card rounded-xl p-5 shadow-2xl">
          <div className="w-12 h-1 bg-slate-400/30 rounded-full mx-auto mb-4"></div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">Detected Items</h2>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
              {detectedItems.length > 0 ? detectedItems.length : 'Scan to detect'}
            </span>
          </div>

          {detectedItems.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2 mb-6">
                {detectedItems.map(item => (
                  <div key={item.id} className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded">{item.confidence}%</span>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ))}
                <button className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span className="text-sm font-medium">Add Item</span>
                </button>
              </div>

              <button 
                onClick={handleConfirm} 
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">check_circle</span>
                Confirm Items
              </button>
            </>
          ) : (
            <>
              <p className="text-slate-500 text-sm mb-4 text-center">
                Point your camera at groceries or receipts to automatically detect items
              </p>
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className="w-full bg-primary hover:bg-primary-hover disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">qr_code_scanner</span>
                {isScanning ? 'Scanning...' : 'Scan Now'}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
