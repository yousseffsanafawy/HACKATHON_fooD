import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useState } from "react";
import { useAppStore } from "../store";

export default function ShoppingList() {
  const navigate = useNavigate();
  const { shoppingList, addShoppingItem, toggleShoppingItem, removeShoppingItem, clearCompletedShoppingItems } = useAppStore();
  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      addShoppingItem(newItemName.trim());
      setNewItemName("");
    }
  };

  const activeItems = shoppingList.filter((item: any) => !item.checked);
  const completedItems = shoppingList.filter((item: any) => item.checked);

  return (
    <div className="bg-background-light min-h-screen flex flex-col pb-32">
      <header className="pt-12 px-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-emerald-950">Shopping List</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm border border-emerald-100/50">
              <span className="material-symbols-outlined text-emerald-800">arrow_back</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm border border-emerald-100/50">
              <span className="material-symbols-outlined text-emerald-800">more_horiz</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleAddItem} className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-emerald-500">add_circle</span>
          </div>
          <input 
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="w-full bg-white border-none rounded-[20px] py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-emerald-900/40 text-emerald-950" 
            placeholder="Search or add item..." 
            type="text" 
          />
        </form>
      </header>

      <main className="flex-1 px-6 space-y-8">
        {activeItems.some((i: any) => i.isAiSuggestion) && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-900/50">AI Suggestions</h2>
            </div>
            <div className="grid gap-3">
              {activeItems.filter((i: any) => i.isAiSuggestion).map((item: any) => (
                <div key={item.id} className="bg-white/90 p-4 rounded-2xl flex items-center justify-between shadow-sm border border-emerald-100/50 group hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleShoppingItem(item.id)} className="w-6 h-6 rounded-full border-2 border-emerald-200 text-primary focus:ring-offset-0 focus:ring-0 cursor-pointer flex items-center justify-center">
                      {item.checked && <span className="material-symbols-outlined text-[16px]">check</span>}
                    </button>
                    <div>
                      <span className="font-medium text-emerald-950 block">{item.name}</span>
                      {item.category && <p className="text-[11px] leading-tight text-emerald-600/70">{item.category}</p>}
                    </div>
                  </div>
                  <button onClick={() => removeShoppingItem(item.id)} className="text-slate-400 hover:text-red-500 p-1 rounded-full transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-orange-500 text-xl">shopping_basket</span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-900/50">To Buy</h2>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-100/20 shadow-sm divide-y divide-emerald-50/50">
            {activeItems.filter((i: any) => !i.isAiSuggestion).map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleShoppingItem(item.id)} className="w-6 h-6 rounded-full border-2 border-emerald-200 text-primary focus:ring-offset-0 focus:ring-0 cursor-pointer flex items-center justify-center">
                    {item.checked && <span className="material-symbols-outlined text-[16px]">check</span>}
                  </button>
                  <div className="flex flex-col">
                    <span className="font-medium text-emerald-950">{item.name}</span>
                    {item.category && <span className="text-xs text-emerald-600/70">{item.category}</span>}
                  </div>
                </div>
                <button onClick={() => removeShoppingItem(item.id)} className="text-slate-400 hover:text-red-500 p-1 rounded-full transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ))}
            {activeItems.filter((i: any) => !i.isAiSuggestion).length === 0 && (
              <div className="p-6 text-center text-emerald-600/70 text-sm">No items to buy.</div>
            )}
          </div>
        </section>

        {completedItems.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500 text-xl">check_circle</span>
                <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-900/50">Completed</h2>
              </div>
              <button onClick={clearCompletedShoppingItems} className="text-xs font-bold text-primary">Clear All</button>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-100/20 shadow-sm divide-y divide-emerald-50/50">
              {completedItems.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-4 opacity-60">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleShoppingItem(item.id)} className="w-6 h-6 rounded-full bg-primary border-2 border-primary text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </button>
                    <div className="flex flex-col">
                      <span className="font-medium text-emerald-950 line-through">{item.name}</span>
                    </div>
                  </div>
                  <button onClick={() => removeShoppingItem(item.id)} className="text-slate-400 hover:text-red-500 p-1 rounded-full transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <BottomNav />
    </div>
  );
}
