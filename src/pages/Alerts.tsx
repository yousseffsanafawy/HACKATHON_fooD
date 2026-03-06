import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAppStore } from "../store";
import { parseISO, differenceInDays } from "date-fns";
import BottomNav from "../components/BottomNav";

export default function Alerts() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { inventory, syncWithFirebase, isLoading } = useAppStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Sync with Firebase when user is authenticated
  useEffect(() => {
    if (authUser) {
      const userId = authUser.email.split('@')[0];
      syncWithFirebase(userId);
      setIsInitialLoad(false);
    }
  }, [authUser, syncWithFirebase]);

  // Get expiring items sorted by urgency
  const expiringItems = inventory
    .filter((item: any) => {
      const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
      return daysLeft <= 3;
    })
    .sort((a: any, b: any) => {
      const daysA = differenceInDays(parseISO(a.expiryDate), new Date());
      const daysB = differenceInDays(parseISO(b.expiryDate), new Date());
      return daysA - daysB;
    });

  if (isInitialLoad || isLoading) {
    return (
      <div className="bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] min-h-screen pb-32">
        <header className="sticky top-0 z-50 glass-card px-4 py-4 flex items-center justify-between">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </header>
        <main className="p-4 space-y-6">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="w-full h-64 rounded-2xl" />
          ))}
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] min-h-screen pb-32">
      <header className="sticky top-0 z-50 glass-card px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 border border-white/20 shadow-sm">
          <span className="material-symbols-outlined text-slate-700">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Food alerts</h1>
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/50 border border-white/20 shadow-sm">
          <span className="material-symbols-outlined text-slate-700">notifications</span>
          {expiringItems.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>}
        </div>
      </header>

      <main className="p-4 space-y-6">
        <section className="flex items-center gap-3 px-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-red-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500 text-xs">warning</span>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-600">{expiringItems.length} items need your attention today</p>
        </section>

        {expiringItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-emerald-500 text-3xl">check_circle</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">All good!</h2>
            <p className="text-slate-500">You have no items expiring soon.</p>
          </div>
        ) : (
          expiringItems.map((item: any) => {
            const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
            const isExpired = daysLeft < 0;
            const isUrgent = daysLeft <= 1 && daysLeft >= 0;

            return (
              <div key={item.id} className="bg-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.04),0_8px_10px_-6px_rgba(0,0,0,0.04)] overflow-hidden border border-slate-100">
                <div className={`relative h-48 w-full bg-cover bg-center flex items-center justify-center ${
                  isExpired ? 'bg-red-50' : 'bg-emerald-50'
                }`} style={item.imageUrl ? { backgroundImage: `url('${item.imageUrl}')` } : {}}>
                  {!item.imageUrl && (
                    <span className={`material-symbols-outlined text-6xl ${isExpired ? 'text-red-500' : 'text-emerald-500'}`}>
                      restaurant
                    </span>
                  )}
                  <div className={`absolute top-4 left-4 flex items-center gap-1 ${
                    isExpired ? 'bg-red-500' : isUrgent ? 'bg-red-500' : 'bg-orange-500'
                  } text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                    <span className="material-symbols-outlined text-sm">
                      {isExpired ? 'error' : 'priority_high'}
                    </span>
                    {isExpired ? 'EXPIRED' : isUrgent ? 'URGENT' : 'EXPIRING SOON'}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                      <p className={`${
                        isExpired ? 'text-red-500' : 'text-red-500'
                      } font-semibold text-sm flex items-center gap-1`}>
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {isExpired ? 'Expired' : daysLeft === 0 ? 'Expires today' : daysLeft === 1 ? 'Expires in 1 day' : `Expires in ${daysLeft} days`}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-4">
                    {isExpired 
                      ? 'This item has expired. Consider disposing of it safely.' 
                      : 'Use this before it goes bad to avoid food waste and save money.'}
                  </p>
                  <div className="flex gap-3">
                    {!isExpired && (
                      <Link 
                        to={`/recipes?ingredient=${item.name}`} 
                        className="flex-1 bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">restaurant_menu</span>
                        Find Recipes
                      </Link>
                    )}
                    <button 
                      onClick={() => navigate(`/inventory/item/${item.id}`)}
                      className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                        isExpired 
                          ? 'bg-red-50 text-red-600 border border-red-100' 
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{isExpired ? 'delete' : 'manage_accounts'}</span>
                      {isExpired ? 'Dispose' : 'Manage'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-slate-200 rounded animate-pulse ${className}`}></div>;
}
