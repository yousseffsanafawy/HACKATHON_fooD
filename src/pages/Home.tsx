import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAppStore } from "../store";
import { isBefore, addDays, parseISO, differenceInDays } from "date-fns";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const { user: authUser } = useAuth();
  const { user, inventory, syncWithFirebase } = useAppStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Sync with Firebase when user is authenticated
  useEffect(() => {
    if (authUser) {
      const userId = authUser.email.split('@')[0];
      syncWithFirebase(userId);
      setIsInitialLoad(false);
    }
  }, [authUser, syncWithFirebase]);

  // Get expiring items (within 3 days)
  const expiringItems = inventory.filter((item: any) => {
    const expiry = parseISO(item.expiryDate);
    return isBefore(expiry, addDays(new Date(), 3));
  });

  // Calculate urgency level
  const hasUrgent = expiringItems.some((item: any) => {
    const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
    return daysLeft <= 1;
  });

  if (isInitialLoad) {
    return (
      <div className="bg-[#ECFDF5] min-h-screen pb-24">
        <header className="flex items-center justify-between px-6 pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="space-y-2">
              <div className="w-24 h-3 bg-slate-200 animate-pulse rounded"></div>
              <div className="w-32 h-5 bg-slate-200 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
        </header>
        <div className="px-4 space-y-6">
          <div className="glass-card rounded-xl p-5 h-40 bg-slate-200 animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] rounded-xl bg-slate-200 animate-pulse"></div>
            <div className="aspect-[4/5] rounded-xl bg-slate-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ECFDF5] min-h-screen pb-24">
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="size-12 rounded-full border-2 border-primary p-0.5">
              <img alt="Profile" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaA6YDFNpbecrprzykRbdvVdkuwvSpOYIptJq16dAu3Aw58F9k_TbiGU6SstbQB1Vy0n1N755dYegYHKajJ_8OafAwSGFhBGOuy6tTk_-2R535tgn6-xYGBN6sEba7BMXMgw19PxvtWNsc-R5EFAWLeMfybcA_CmUltuyloAuS-IcY_fOzkNXWCmo7afb0gu60DhXTyEabBx22yvyjMW0EhFYCTZ63Eq3dwtb2H4G_co8g2K9YfsJGqantxl7st78OdwbCnl6FH6PP" />
            </div>
            <div className="absolute bottom-0 right-0 size-3 bg-primary border-2 border-white rounded-full"></div>
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Welcome back</p>
            <h1 className="text-slate-900 text-xl font-bold">Good morning, {authUser?.displayName || user?.name || 'Guest'}</h1>
          </div>
        </div>
        <Link to="/alerts" className="relative size-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-emerald-100 text-slate-700">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          {expiringItems.length > 0 && (
            <span className="absolute top-0 right-0 size-3 bg-red-500 border-2 border-white rounded-full"></span>
          )}
        </Link>
      </header>

      <section className="px-4 py-4">
        <div className="glass-card rounded-xl p-5 shadow-xl shadow-emerald-900/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              hasUrgent 
                ? 'bg-red-100 text-red-600' 
                : expiringItems.length > 0 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-emerald-100 text-emerald-600'
            }`}>
              <span className="material-symbols-outlined text-[18px]">
                {hasUrgent || expiringItems.length > 0 ? 'warning' : 'check_circle'}
              </span>
              <span className="text-xs font-bold tracking-wide uppercase">
                {hasUrgent ? 'Red Alert' : expiringItems.length > 0 ? 'Orange Warning' : 'All Good'}
              </span>
            </div>
            <span className="material-symbols-outlined text-slate-400">more_horiz</span>
          </div>
          <h2 className="text-slate-900 text-2xl font-bold mb-1">
            {expiringItems.length > 0 
              ? `${expiringItems.length} item${expiringItems.length > 1 ? 's' : ''} expiring soon` 
              : 'Your fridge is fresh!'}
          </h2>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            {expiringItems.length > 0
              ? `AI Insight: Use these soon to reduce waste. We've found recipes that use your expiring items.`
              : `AI Insight: You're doing great! Keep up the good work reducing food waste.`}
          </p>
          <Link to={expiringItems.length > 0 ? "/alerts" : "/inventory"} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <span>{expiringItems.length > 0 ? 'View Items' : 'View Inventory'}</span>
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </Link>
        </div>
      </section>

      <section className="px-4 py-6">
        <h3 className="text-slate-900 text-lg font-bold mb-4 px-2">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/scan" className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-md cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZwMr0hU6jpWgTCcFoZjlfVNpBCqPQXXfVdOJJa8OFCYoyzWd4poVXaOjgjtnY9yIuB5YXIQtVJqVh85fauPlHgOfRpZjovTtsQkGHP7AmqK2GW43q3-tycYOOpBt2nqiRfiC4RLcNKn09ZR1XV2NODfO5pO2CpNKIABpXewZ9YecJGkZymW-XkFPMLYncZ5N2lmG2u54se1jKMNGnYhuEfod8S_b1nHyQdCsStgCB9cWVB5VBcpaOYpZ4KFuY5iTvU5Jf7k8TgPT9')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center mb-3 shadow-lg">
                <span className="material-symbols-outlined text-white">qr_code_scanner</span>
              </div>
              <p className="text-white font-bold text-lg leading-tight">Scan Grocery</p>
            </div>
          </Link>

          <Link to="/inventory" className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-md cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0QFI94zJ8gWVNI3VJiXd3gcyGff4G8QRF7XNbBREb2dI8-rU1O9OxcJKlviFGX1ckAxbY5Al8U3WfAwTXNbZ_TaAPxqVDIO1DrcxVq6yGQd5U9i_7660-pJGzjHzv4KnLv1B2eAaHtP7PAq0ms_Q3BkXm602QinKFXdwTC1XK4r-dgTnyLXl8VKXtQjEljpOEYWb2s7bvqarajOEVFS7vJP7LfyPUkxZLt8ZgkfCmnMJ3cap2m6gNOeiygaTa_-c1lRtkhK1-IlOt')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="size-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center mb-3 border border-white/30">
                <span className="material-symbols-outlined text-white">inventory_2</span>
              </div>
              <p className="text-white font-bold text-lg leading-tight">Smart Inventory</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-6 overflow-hidden">
        <div className="flex justify-between items-end px-6 mb-4">
          <h3 className="text-slate-900 text-lg font-bold">Recommended for You</h3>
          <Link to="/recipes" className="text-primary text-sm font-semibold">See all</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-4">
          <div className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-sm border border-emerald-100">
            <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBi5mNGUUZcM7Hcdz9z7hR3oqoiOsxlBDzzz3nNmDhSMo34QLBre-NILhEwPyccjA0--8E3s8Q5U0iAwr9TqEuk6WogydsKSO9b7ajfyP8b9wGuDLujCG-ATqapJOWbQLU-eBeDhmUW2XDFDFbpdf542KZivADfRsXb3Jfc8OzDYS8sXoGZJGAg3_DTCgak8HaWzwRCYLpYqdKs4Fa6xgh623CX0oghlxoBl5_ahnc935otMoFpzVbj47V9xDqadh-aLMJtgCqp2GEY')" }}></div>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-primary text-[14px] fill-1">eco</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Eco-Friendly</span>
              </div>
              <h4 className="text-slate-900 font-bold text-base mb-1">Zero-Waste Salad</h4>
              <p className="text-slate-500 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">schedule</span> 12 mins
                <span className="material-symbols-outlined text-[14px]">bolt</span> 320 kcal
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-sm border border-emerald-100">
            <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUh_JukXDZotdYmR2wtqtGsIPlUqCm3LTb9V_i6KXNa-Xb-H6QEA9SOaRL-3ydHh_rn__-y_mp1zOERSR3F_ZDtS0P-YvIVJZ50c4jrtZlcYRrNIRJm5OA9tCW2gfkS1yQTaQWC1AUY4Z5WIoPjY2317i-qfIuD08eJokARJbGzQLBkh8P2_gMljrsYTa1MrO3aHCpkYC-Yk2KX0F2fUOgLTwosMi2WrSbBNES5qt8VMwZ79uX07RQL8bt1LmZ456DEJLh4sFPpuAm')" }}></div>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-primary text-[14px] fill-1">star</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Popular</span>
              </div>
              <h4 className="text-slate-900 font-bold text-base mb-1">Roasted Tomato Soup</h4>
              <p className="text-slate-500 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">schedule</span> 25 mins
                <span className="material-symbols-outlined text-[14px]">bolt</span> 210 kcal
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
