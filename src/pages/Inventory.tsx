import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAppStore } from "../store";
import { isBefore, addDays, parseISO, differenceInDays } from "date-fns";
import BottomNav from "../components/BottomNav";

export default function Inventory() {
  const { user: authUser } = useAuth();
  const { inventory, syncWithFirebase, isLoading } = useAppStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync with Firebase when user is authenticated
  useEffect(() => {
    if (authUser) {
      const userId = authUser.email.split('@')[0];
      syncWithFirebase(userId);
      setIsInitialLoad(false);
    }
  }, [authUser, syncWithFirebase]);

  // Filter inventory based on search
  const filteredInventory = inventory.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get expiring items (within 3 days)
  const expiringItems = inventory.filter((item: any) => {
    const expiry = parseISO(item.expiryDate);
    return isBefore(expiry, addDays(new Date(), 3));
  });

  if (isInitialLoad || isLoading) {
    return (
      <div className="bg-[#ECFDF5] min-h-screen pb-24">
        <header className="sticky top-0 z-30 bg-[#ECFDF5]/80 backdrop-blur-md px-4 pt-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">SmartFood AI</span>
              <div className="w-32 h-8 bg-slate-200 animate-pulse rounded mt-1"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
          </div>
          <div className="w-full h-12 bg-slate-200 animate-pulse rounded-xl mb-4"></div>
          <div className="flex gap-2">
            <div className="w-24 h-8 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="w-20 h-8 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="w-20 h-8 rounded-full bg-slate-200 animate-pulse"></div>
          </div>
        </header>
        <main className="px-4 space-y-4 mt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[20px] p-4 shadow-sm border border-emerald-50 flex gap-4 items-center">
              <div className="w-16 h-16 bg-slate-200 animate-pulse rounded-2xl flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-4 w-24 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-2 w-full bg-slate-200 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }

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
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary/20 text-slate-700 placeholder:text-slate-400" 
            placeholder="Search ingredients..." 
            type="text" 
          />
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
          {filteredInventory.map((item: any) => {
            const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
            const isExpired = daysLeft < 0;
            const isUrgent = daysLeft <= 1 && daysLeft >= 0;
            const isExpiring = daysLeft <= 3 && daysLeft > 1;
            const progressWidth = Math.max(0, Math.min(100, (daysLeft / 14) * 100));

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
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      isExpired ? 'bg-red-100 text-red-600' :
                      isUrgent ? 'bg-orange-100 text-orange-600' :
                      isExpiring ? 'bg-yellow-100 text-yellow-600' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {isExpired ? 'Expired' : isUrgent ? 'Expiring' : isExpiring ? 'Soon' : 'Fresh'}
                    </span>
                  </div>
                  <p className={`text-xs font-medium mb-2 flex items-center gap-1 ${
                    isExpired ? 'text-red-500' :
                    isUrgent ? 'text-orange-500' :
                    isExpiring ? 'text-yellow-600' :
                    'text-slate-500'
                  }`}>
                    <span className="material-symbols-outlined text-[14px]">
                      {isExpired ? 'error' : isUrgent || isExpiring ? 'timer' : 'calendar_today'}
                    </span>
                    {isExpired ? 'Expired' : daysLeft === 0 ? 'Today' : daysLeft === 1 ? '1 day left' : `${daysLeft} days left`}
                  </p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isExpired ? 'bg-red-500' :
                        isUrgent ? 'bg-orange-500' :
                        isExpiring ? 'bg-yellow-500' :
                        'bg-primary'
                      }`}
                      style={{ width: `${progressWidth}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            );
          })}
          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">inventory_2</span>
              <p className="text-slate-500">No items found. Start by adding some groceries!</p>
            </div>
          )}
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

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-slate-200 rounded animate-pulse ${className}`}></div>;
}
