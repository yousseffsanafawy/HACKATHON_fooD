import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useAppStore } from "../store";

export default function Impact() {
  const navigate = useNavigate();
  const { impact } = useAppStore();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] max-w-md mx-auto overflow-x-hidden pb-[88px]">
      <header className="flex items-center justify-between p-6 pt-12">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100">
          <span className="material-symbols-outlined text-slate-600">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Your food impact</h1>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">eco</span>
        </button>
      </header>

      <div className="px-4 mb-6">
        <div className="glass-card rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Doing Great!</h3>
            <p className="text-sm text-slate-600">Your carbon footprint decreased by 12% this week compared to last month.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 mb-8">
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">restaurant</span>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Meals saved this month</p>
          </div>
          <p className="text-4xl font-bold text-slate-900">{(impact.foodSaved * 2).toFixed(0)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">payments</span>
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Money saved</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">${impact.moneySaved.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">delete_sweep</span>
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Waste reduced</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{impact.foodSaved.toFixed(1)}kg</p>
        </div>
      </div>

      <div className="px-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Weekly Reduction</h3>
              <p className="text-sm text-slate-500">Food waste trend (kg)</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <span className="material-symbols-outlined text-xs mr-1">trending_down</span> -12%
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between h-40 px-2">
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="bg-primary rounded-t-full w-4" style={{ height: "65%" }}></div>
              <span className="text-[10px] font-medium text-slate-400">M</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="bg-primary/40 rounded-t-full w-4" style={{ height: "40%" }}></div>
              <span className="text-[10px] font-medium text-slate-400">T</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="bg-primary rounded-t-full w-4" style={{ height: "85%" }}></div>
              <span className="text-[10px] font-medium text-slate-400">W</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="bg-primary/60 rounded-t-full w-4" style={{ height: "55%" }}></div>
              <span className="text-[10px] font-medium text-slate-400">T</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="bg-primary rounded-t-full w-4" style={{ height: "100%" }}></div>
              <span className="text-[10px] font-medium text-slate-400">F</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="bg-primary/30 rounded-t-full w-4" style={{ height: "25%" }}></div>
              <span className="text-[10px] font-medium text-slate-400">S</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="bg-primary/50 rounded-t-full w-4" style={{ height: "45%" }}></div>
              <span className="text-[10px] font-medium text-slate-400">S</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <h4 className="text-sm font-bold text-slate-900 mb-4 px-1">Eco-Insights</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <span className="material-symbols-outlined">water_drop</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Water Saved</p>
              <p className="text-xs text-slate-500">You saved approx. {impact.waterSaved.toFixed(0)}L of water this week.</p>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>
          <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <span className="material-symbols-outlined">co2</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">CO2 Emission</p>
              <p className="text-xs text-slate-500">Prevented {impact.co2Saved.toFixed(1)}kg of CO2 entering atmosphere.</p>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
