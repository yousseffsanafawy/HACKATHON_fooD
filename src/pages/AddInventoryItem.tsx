import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppStore, Category, Location } from "../store";
import { addDays } from "date-fns";

export default function AddInventoryItem() {
  const navigate = useNavigate();
  const addInventoryItem = useAppStore((state: any) => state.addInventoryItem);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("pcs");
  const [category, setCategory] = useState<Category>("Vegetables");
  const [location, setLocation] = useState<Location>("Fridge");
  const [expiryDate, setExpiryDate] = useState(addDays(new Date(), 7).toISOString().split('T')[0]);

  const handleSave = async () => {
    if (!name) {
      setError("Please enter an item name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await addInventoryItem({
        name,
        quantity,
        unit,
        category,
        location,
        expiryDate: new Date(expiryDate).toISOString(),
      });
      navigate("/inventory");
    } catch (err: any) {
      setError(err.message || "Failed to add item");
      setIsLoading(false);
    }
  };

  const categories: Category[] = ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Poultry', 'Pantry', 'Beverages'];

  return (
    <div className="bg-white min-h-screen pb-24">
      <header className="px-4 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 border border-slate-100">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="text-lg font-bold text-slate-900">Add Item</h1>
        <div className="w-10"></div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Organic Milk"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="1"
              min="1"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
            >
              <option>pcs</option>
              <option>kg</option>
              <option>g</option>
              <option>L</option>
              <option>ml</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${category === cat ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Storage Location</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setLocation('Fridge')}
              className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-colors ${location === 'Fridge' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 bg-white text-slate-500 hover:border-primary/50'}`}
            >
              <span className="material-symbols-outlined">kitchen</span>
              <span className="text-sm font-bold">Fridge</span>
            </button>
            <button
              onClick={() => setLocation('Pantry')}
              className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-colors ${location === 'Pantry' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 bg-white text-slate-500 hover:border-primary/50'}`}
            >
              <span className="material-symbols-outlined">shelves</span>
              <span className="text-sm font-bold">Pantry</span>
            </button>
            <button
              onClick={() => setLocation('Freezer')}
              className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-colors ${location === 'Freezer' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 bg-white text-slate-500 hover:border-primary/50'}`}
            >
              <span className="material-symbols-outlined">ac_unit</span>
              <span className="text-sm font-bold">Freezer</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 pb-8">
        <button
          onClick={handleSave}
          disabled={isLoading || !name}
          className="w-full bg-primary hover:bg-primary-hover disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">save</span>
              <span>Save Item</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
