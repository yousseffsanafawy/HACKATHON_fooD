import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userName = user?.displayName || user?.name || 'Guest';
  const userEmail = user?.email || 'Not logged in';

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-gradient-to-b from-mint-soft to-background-light overflow-x-hidden pb-[88px]">
      <header className="flex items-center justify-between p-6">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
          <span className="material-symbols-outlined text-slate-600">arrow_back</span>
        </button>
        <h1 className="text-lg font-semibold tracking-tight">Account</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
          <span className="material-symbols-outlined text-slate-600">more_horiz</span>
        </button>
      </header>

      <section className="flex flex-col items-center px-6 pt-2 pb-8">
        <div className="relative">
          <div className="h-32 w-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200">
            <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ1xSFbS-ZNK7nwWhe_89urSzv3nuekiLTJC5AopAvrRhLziq6SlmVDHMggdV8B8E8EdJe2EFKXBY5u3AffUZ-zBzBim3FlF-eXcwheFEoNz-uv0SHf4BMe1dNZpl1_N-CfUenU_BD24W7cDK738HtF66AD0pXhdIRe9IjgobAxFTvi7IPdvhoM7PgdJ1b7le930-j97mBtt_wJMhke9nj_pJ5GIuyR33cr5K19RmsQSSvMVI8_2liMJAnALdRF8QsY9VyVw5qgs_N" alt="Profile" />
          </div>
          <div className="absolute bottom-1 right-1 h-8 w-8 bg-primary rounded-full border-2 border-white flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xs">edit</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{userName}</h2>
          <p className="text-slate-500 font-medium">{userEmail}</p>
        </div>
        <div className="mt-6 flex gap-3">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Premium Member</span>
        </div>
      </section>

      <main className="px-4 space-y-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => navigate("/insights")}>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">insights</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Insights</p>
              <p className="text-xs text-slate-500">View your food analytics</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => navigate("/shopping-list")}>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Shopping List</p>
              <p className="text-xs text-slate-500">Manage your groceries</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => navigate("/impact")}>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Your Impact</p>
              <p className="text-xs text-slate-500">Track food waste reduction</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Diet Preferences</p>
              <p className="text-xs text-slate-500">Vegetarian, Low Carb</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">group</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Household Members</p>
              <p className="text-xs text-slate-500">2 people</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">notifications_active</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Notifications</p>
              <p className="text-xs text-slate-500">Push, Email, SMS</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
          <div className="flex items-center justify-between py-3 first:pt-0 cursor-pointer group" onClick={() => navigate("/settings")}>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">settings</span>
              <p className="text-sm font-medium text-slate-700">App Settings</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          </div>
          <div className="flex items-center justify-between py-3 cursor-pointer group" onClick={() => navigate("/privacy")}>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">security</span>
              <p className="text-sm font-medium text-slate-700">Privacy & Security</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          </div>
          <div className="flex items-center justify-between py-3 last:pb-0 cursor-pointer group" onClick={() => navigate("/help")}>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">help</span>
              <p className="text-sm font-medium text-slate-700">Help Center</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          </div>
        </div>

        <button onClick={handleLogout} className="w-full py-4 text-red-500 font-semibold text-sm rounded-2xl border border-red-100 bg-red-50/50 mt-4">
          Log Out
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
