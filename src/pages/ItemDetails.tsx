import { useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "../store";
import { parseISO, differenceInDays, format } from "date-fns";

export default function ItemDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { inventory, removeInventoryItem, addShoppingItem, recordWastePrevention } = useAppStore();

  const item = inventory.find(i => i.id === id);

  if (!item) {
    return (
      <div className="bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Item not found</h2>
          <button onClick={() => navigate('/inventory')} className="text-primary font-bold">Back to Inventory</button>
        </div>
      </div>
    );
  }

  const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
  const isExpiring = daysLeft <= 3;

  const handleMarkAsUsed = () => {
    // Assuming average weight 0.5kg and value $3 for demo purposes
    recordWastePrevention(3, 0.5);
    removeInventoryItem(item.id);
    navigate('/inventory');
  };

  const handleThrowAway = () => {
    removeInventoryItem(item.id);
    navigate('/inventory');
  };

  const handleAddToShoppingList = () => {
    addShoppingItem(item.name);
    navigate('/shopping-list');
  };

  return (
    <div className="bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] min-h-screen pb-24">
      <header className="px-4 pt-6 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600 border border-slate-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-slate-900">Item Details</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600 border border-slate-100">
          <span className="material-symbols-outlined">edit</span>
        </button>
      </header>

      <main className="px-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 shadow-md bg-emerald-50 flex items-center justify-center">
            {item.imageUrl ? (
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-emerald-500 text-5xl">restaurant</span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{item.name}</h2>
          <p className="text-slate-500 font-medium mb-4">{item.category} • {item.location}</p>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${isExpiring ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100'}`}>
            <span className={`material-symbols-outlined text-[18px] ${isExpiring ? 'text-orange-500' : 'text-emerald-500'}`}>
              {isExpiring ? 'timer' : 'calendar_today'}
            </span>
            <span className={`font-bold text-sm ${isExpiring ? 'text-orange-600' : 'text-emerald-600'}`}>
              {daysLeft > 0 ? `Expiring in ${daysLeft} days` : 'Expired'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Quantity</p>
            <p className="text-xl font-bold text-slate-900">{item.quantity} {item.unit}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Added On</p>
            <p className="text-xl font-bold text-slate-900">{format(parseISO(item.addedDate), 'MMM d')}</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-3 px-1">Actions</h3>
        <div className="space-y-3">
          <button onClick={handleMarkAsUsed} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>
            Mark as Used
          </button>
          <button onClick={handleAddToShoppingList} className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-xl shadow-sm border border-slate-200 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">shopping_cart</span>
            Add to Shopping List
          </button>
          <button onClick={handleThrowAway} className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 rounded-xl shadow-sm border border-red-100 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">delete</span>
            Throw Away (Wasted)
          </button>
        </div>
      </main>
    </div>
  );
}
