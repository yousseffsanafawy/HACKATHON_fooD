import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppStore, Category, Location } from "../store";
import { addDays } from "date-fns";

export default function ScanResults() {
  const navigate = useNavigate();
  const addInventoryItem = useAppStore(state => state.addInventoryItem);

  const [scannedItems, setScannedItems] = useState([
    { id: '1', name: "Whole Milk", category: "Dairy" as Category, location: "Fridge" as Location, expiryDays: 7 },
    { id: '2', name: "Organic Eggs", category: "Dairy" as Category, location: "Fridge" as Location, expiryDays: 14 },
    { id: '3', name: "Vine Tomatoes", category: "Vegetables" as Category, location: "Fridge" as Location, expiryDays: 5 },
    { id: '4', name: "Sourdough Bread", category: "Pantry" as Category, location: "Pantry" as Location, expiryDays: 3 },
  ]);

  const handleRemove = (id: string) => {
    setScannedItems(items => items.filter(i => i.id !== id));
  };

  const handleAddAll = () => {
    scannedItems.forEach(item => {
      addInventoryItem({
        name: item.name,
        category: item.category,
        location: item.location,
        quantity: 1,
        unit: 'pcs',
        expiryDate: addDays(new Date(), item.expiryDays).toISOString()
      });
    });
    navigate("/inventory");
  };

  return (
    <div className="bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] min-h-screen pb-32">
      <header className="sticky top-0 z-50 glass-card px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 border border-white/20 shadow-sm">
          <span className="material-symbols-outlined text-slate-700">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Scan Results</h1>
        <div className="w-10"></div>
      </header>

      <main className="px-4 py-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{scannedItems.length} Items Found</h2>
          <p className="text-slate-500 text-sm">Review the items below before adding them to your inventory.</p>
        </div>

        <div className="space-y-3">
          {scannedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                  <span className="material-symbols-outlined text-slate-400">kitchen</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-500">{item.category} • Est. expiry: {item.expiryDays} days</p>
                </div>
              </div>
              <button onClick={() => handleRemove(item.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
          {scannedItems.length === 0 && (
            <div className="text-center py-8 text-slate-500">No items to add.</div>
          )}
        </div>

        <button onClick={() => navigate('/inventory/add')} className="w-full bg-white border-2 border-dashed border-slate-300 text-slate-500 font-bold py-4 rounded-xl hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Add Missing Item
        </button>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 pb-8">
        <button 
          onClick={handleAddAll} 
          disabled={scannedItems.length === 0}
          className="w-full bg-primary hover:bg-primary-hover disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">inventory_2</span>
          Add {scannedItems.length} Items to Inventory
        </button>
      </div>
    </div>
  );
}
