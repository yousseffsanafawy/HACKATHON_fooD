import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] min-h-screen pb-24">
      <header className="sticky top-0 z-50 glass-card px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 border border-white/20 shadow-sm">
          <span className="material-symbols-outlined text-slate-700">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Settings</h1>
        <div className="w-10"></div>
      </header>

      <main className="px-4 py-6 space-y-6">
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">General</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">dark_mode</span>
                <span className="font-medium text-slate-700">Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">language</span>
                <span className="font-medium text-slate-700">Language</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="text-sm">English</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">straighten</span>
                <span className="font-medium text-slate-700">Units</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="text-sm">Metric</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Notifications</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">timer</span>
                <span className="font-medium text-slate-700">Expiry Alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">restaurant</span>
                <span className="font-medium text-slate-700">Recipe Suggestions</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Data & Privacy</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">download</span>
                <span className="font-medium text-slate-700">Export Data</span>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-red-400">delete_forever</span>
                <span className="font-medium text-red-500">Delete Account</span>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
