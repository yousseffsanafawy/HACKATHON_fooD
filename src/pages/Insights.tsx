import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";
import BottomNav from "../components/BottomNav";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Insights() {
  const navigate = useNavigate();
  const { impact, inventory } = useAppStore();

  const weeklyData = [
    { day: 'Mon', saved: 2.5, wasted: 0.8 },
    { day: 'Tue', saved: 3.2, wasted: 0.5 },
    { day: 'Wed', saved: 1.8, wasted: 1.2 },
    { day: 'Thu', saved: 4.0, wasted: 0.3 },
    { day: 'Fri', saved: 2.9, wasted: 0.6 },
    { day: 'Sat', saved: 3.5, wasted: 0.4 },
    { day: 'Sun', saved: 4.2, wasted: 0.2 },
  ];

  const totalSaved = weeklyData.reduce((acc, day) => acc + day.saved, 0);
  const totalWasted = weeklyData.reduce((acc, day) => acc + day.wasted, 0);
  const improvement = ((totalSaved - totalWasted) / totalSaved * 100).toFixed(0);

  // Calculate stats from inventory
  const itemsSavedFromWaste = inventory.filter((item: any) => {
    const daysLeft = Math.ceil((new Date(item.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 && daysLeft <= 3;
  }).length;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] max-w-md mx-auto overflow-x-hidden pb-[88px]">
      <header className="flex items-center justify-between p-6 pt-12">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100">
          <span className="material-symbols-outlined text-slate-600">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Insights</h1>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">insights</span>
        </button>
      </header>

      <div className="px-4 mb-6">
        <div className="glass-card rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Great Progress!</h3>
            <p className="text-sm text-slate-600">You've reduced food waste by {improvement}% this week!</p>
          </div>
        </div>
      </div>

      {/* Food Saved vs Wasted Chart */}
      <div className="px-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Weekly Overview</h3>
              <p className="text-sm text-slate-500">Food saved vs wasted (kg)</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-[10px] font-medium text-slate-500">Saved</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-[10px] font-medium text-slate-500">Wasted</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94A3B8' }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  backgroundColor: 'white'
                }}
                cursor={{ fill: '#F1F5F9' }}
              />
              <Bar dataKey="saved" radius={[4, 4, 0, 0]}>
                {weeklyData.map((entry: any, index: number) => (
                  <Cell key={`cell-saved-${index}`} fill="#22C55E" />
                ))}
              </Bar>
              <Bar dataKey="wasted" radius={[4, 4, 0, 0]}>
                {weeklyData.map((entry: any, index: number) => (
                  <Cell key={`cell-wasted-${index}`} fill="#FB923C" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 mb-8">
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">restaurant</span>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Meals saved this month</p>
          </div>
          <p className="text-4xl font-bold text-slate-900">{impact.mealsSaved}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
            <span className="text-sm text-green-600 font-medium">+12% from last month</span>
          </div>
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
          <p className="text-2xl font-bold text-slate-900">{impact.wasteReduced.toFixed(1)}kg</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">co2</span>
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">CO₂ prevented</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{impact.co2Prevented.toFixed(1)}kg</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Items rescued</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{itemsSavedFromWaste}</p>
        </div>
      </div>

      {/* Eco-Impact Cards */}
      <div className="px-4 mb-4">
        <h4 className="text-sm font-bold text-slate-900 mb-4 px-1">Environmental Impact</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <span className="material-symbols-outlined">water_drop</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Water Saved</p>
              <p className="text-xs text-slate-500">Approx. {(impact.wasteReduced * 150).toFixed(0)}L saved this week</p>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>
          <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shrink-0">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Carbon Footprint</p>
              <p className="text-xs text-slate-500">Prevented {impact.co2Prevented.toFixed(1)}kg of CO₂ emissions</p>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>
          <div className="flex items-center gap-4 bg-white/50 p-4 rounded-xl border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <span className="material-symbols-outlined">savings</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Money Saved</p>
              <p className="text-xs text-slate-500">${impact.moneySaved.toFixed(2)} kept in your pocket</p>
            </div>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
