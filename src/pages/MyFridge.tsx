import { useNavigate, Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useAppStore } from "../store";
import { parseISO, differenceInDays } from "date-fns";

export default function MyFridge() {
  const navigate = useNavigate();
  const { inventory } = useAppStore();

  const fridgeItems = inventory.filter((item: any) => item.location === 'Fridge');

  return (
    <div className="bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] min-h-screen font-display text-slate-900 pb-32">
      <header className="sticky top-0 z-20 bg-[#ECFDF5]/80 backdrop-blur-md px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">My Fridge</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <Link to="/inventory" className="flex-none px-5 py-2 rounded-full bg-white text-slate-500 text-sm font-medium border border-slate-100 shadow-sm">
            All
          </Link>
          <button className="flex-none px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20">
            Fridge
          </button>
          <button className="flex-none px-5 py-2 rounded-full bg-white text-slate-500 text-sm font-medium border border-slate-100 shadow-sm">
            Pantry
          </button>
          <button className="flex-none px-5 py-2 rounded-full bg-white text-slate-500 text-sm font-medium border border-slate-100 shadow-sm">
            Freezer
          </button>
        </div>
      </header>

      <main className="px-4 space-y-5">
        {fridgeItems.map((item: any) => {
          const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
          const isExpiring = daysLeft <= 3;
          const isUrgent = daysLeft <= 1;

          return (
            <Link key={item.id} to={`/inventory/item/${item.id}`} className="block bg-white rounded-xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 border border-white/50">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0 flex items-center justify-center">
                {item.imageUrl ? (
                  <img alt={item.name} className="w-full h-full object-cover" src={item.imageUrl} />
                ) : (
                  <span className="material-symbols-outlined text-emerald-500 text-3xl">restaurant</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${isUrgent ? 'bg-red-500 animate-pulse' : isExpiring ? 'bg-orange-500' : 'bg-primary'}`}></span>
                  <span className={`text-[10px] uppercase tracking-wider font-bold ${isUrgent ? 'text-red-500' : isExpiring ? 'text-orange-500' : 'text-primary'}`}>
                    {isUrgent ? 'Urgent' : isExpiring ? 'Expiring Soon' : 'Fresh'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-500 mb-3">
                  {daysLeft > 0 ? `Expires in ${daysLeft} days` : 'Expired'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">{item.quantity} {item.unit}</span>
                  <button className="text-primary text-sm font-bold flex items-center">
                    Manage <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
                  </button>
                </div>
              </div>
            </Link>
          );
        })}

        <div className="mt-8 bg-primary/10 rounded-xl p-6 border border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-primary font-bold">Fridge Status</h4>
              <p className="text-xs text-primary/70">Eco-Score: Optimal</p>
            </div>
            <span className="material-symbols-outlined text-primary">eco</span>
          </div>
          <div className="w-full bg-white/50 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-[85%]"></div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
            You have {fridgeItems.length} items in your fridge. {fridgeItems.filter((i: any) => differenceInDays(parseISO(i.expiryDate), new Date()) <= 3).length} items need your attention soon to avoid food waste.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
