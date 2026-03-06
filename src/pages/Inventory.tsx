import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useAppStore } from "../store";
import { isBefore, addDays, parseISO, differenceInDays } from "date-fns";

export default function Inventory() {
  const { inventory } = useAppStore();

  const expiringItems = inventory.filter(item => {
    const expiry = parseISO(item.expiryDate);
    return isBefore(expiry, addDays(new Date(), 3));
  });

  return (
    <div className="bg-[#ECFDF5] min-h-screen pb-24">
      <header className="sticky top-0 z-30 bg-[#ECFDF5]/80 backdrop-blur-md px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">SmartFood AI</span>
            <h1 className="text-2xl font-bold text-slate-900">Your Kitchen</h1>
          </div>
          <button className="bg-white p-2 rounded-full shadow-sm border border-emerald-100">
            <span className="material-symbols-outlined text-slate-600">notifications</span>
          </button>
        </div>

        <div className="relative flex items-center mb-4">
          <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
          <input className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary/20 text-slate-700 placeholder:text-slate-400" placeholder="Search ingredients..." type="text" />
          <button className="absolute right-4 text-primary">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20 whitespace-nowrap">All Items</button>
          <Link to="/my-fridge" className="px-6 py-2 bg-white text-slate-500 rounded-full text-sm font-medium border border-emerald-50 whitespace-nowrap">Fridge</Link>
          <button className="px-6 py-2 bg-white text-slate-500 rounded-full text-sm font-medium border border-emerald-50 whitespace-nowrap">Pantry</button>
          <button className="px-6 py-2 bg-white text-slate-500 rounded-full text-sm font-medium border border-emerald-50 whitespace-nowrap">Freezer</button>
        </div>
      </header>

      <main className="px-4 space-y-4 mt-2">
        {expiringItems.length > 0 && (
          <Link to="/alerts" className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-4 block">
            <div className="bg-orange-500/10 p-2 rounded-xl">
              <span className="material-symbols-outlined text-orange-600">emergency_home</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-orange-800 uppercase tracking-tight">Attention</p>
              <p className="text-sm text-orange-700 leading-tight">{expiringItems.length} items are expiring in the next 48 hours.</p>
            </div>
            <span className="material-symbols-outlined text-orange-400">chevron_right</span>
          </Link>
        )}

        <div className="grid grid-cols-1 gap-4">
          {inventory.map(item => {
            const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
            const isExpiring = daysLeft <= 3;
            const progressWidth = Math.max(0, Math.min(100, (daysLeft / 14) * 100)); // Assuming 14 days is "fresh"

            return (
              <Link key={item.id} to={`/inventory/item/${item.id}`} className="bg-white rounded-[20px] p-4 shadow-sm border border-emerald-50 flex gap-4 items-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                  {item.imageUrl ? (
                    <img className="w-full h-full object-cover" src={item.imageUrl} alt={item.name} />
                  ) : (
                    <span className="material-symbols-outlined text-emerald-500 text-3xl">restaurant</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${isExpiring ? 'bg-orange-100 text-orange-600' : 'bg-primary/10 text-primary'}`}>
                      {isExpiring ? 'Expiring' : 'Fresh'}
                    </span>
                  </div>
                  <p className={`text-xs font-medium mb-2 flex items-center gap-1 ${isExpiring ? 'text-orange-500' : 'text-slate-500'}`}>
                    <span className="material-symbols-outlined text-[14px]">
                      {isExpiring ? 'timer' : 'calendar_today'}
                    </span> 
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                  </p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isExpiring ? 'bg-orange-500' : 'bg-primary'}`} 
                      style={{ width: `${progressWidth}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="fixed bottom-28 right-6 z-40">
          <Link to="/inventory/add" className="w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/40 flex items-center justify-center transition-transform active:scale-95">
            <span className="material-symbols-outlined text-3xl">add</span>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
