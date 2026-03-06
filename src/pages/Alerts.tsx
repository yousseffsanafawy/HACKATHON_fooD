import { useNavigate, Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useAppStore } from "../store";
import { isBefore, addDays, parseISO, differenceInDays } from "date-fns";

export default function Alerts() {
  const navigate = useNavigate();
  const { inventory } = useAppStore();

  const expiringItems = inventory.filter(item => {
    const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
    return daysLeft <= 3;
  }).sort((a, b) => {
    const daysA = differenceInDays(parseISO(a.expiryDate), new Date());
    const daysB = differenceInDays(parseISO(b.expiryDate), new Date());
    return daysA - daysB;
  });

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
          expiringItems.map(item => {
            const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
            const isUrgent = daysLeft <= 1;

            return (
              <div key={item.id} className="bg-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.04),0_8px_10px_-6px_rgba(0,0,0,0.04)] overflow-hidden border border-slate-100">
                <div className="relative h-48 w-full bg-cover bg-center flex items-center justify-center bg-emerald-50" style={item.imageUrl ? { backgroundImage: `url('${item.imageUrl}')` } : {}}>
                  {!item.imageUrl && <span className="material-symbols-outlined text-emerald-500 text-6xl">restaurant</span>}
                  <div className={`absolute top-4 left-4 flex items-center gap-1 ${isUrgent ? 'bg-red-500' : 'bg-orange-500'} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                    <span className="material-symbols-outlined text-sm">{isUrgent ? 'priority_high' : 'timer'}</span>
                    {isUrgent ? 'URGENT' : 'EXPIRING SOON'}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                      <p className={`${isUrgent ? 'text-red-500' : 'text-orange-500'} font-semibold text-sm flex items-center gap-1`}>
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {daysLeft > 0 ? `Expires in ${daysLeft} days` : 'Expired'}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-4">Use this before it goes bad to avoid food waste and save money.</p>
                  <Link to={`/recipes?ingredient=${item.name}`} className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">restaurant_menu</span>
                    Find recipes using this ingredient
                  </Link>
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
