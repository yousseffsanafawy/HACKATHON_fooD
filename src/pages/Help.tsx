import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB] min-h-screen pb-24">
      <header className="sticky top-0 z-50 glass-card px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 border border-white/20 shadow-sm">
          <span className="material-symbols-outlined text-slate-700">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Help Center</h1>
        <div className="w-10"></div>
      </header>

      <main className="px-4 py-6 space-y-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="w-full bg-white border-none rounded-xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary/20 text-slate-700 placeholder:text-slate-400" placeholder="Search for help..." type="text" />
        </div>

        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
            {[
              { q: "How do I scan items?", a: "Go to the Scan tab and point your camera at the grocery items or receipt." },
              { q: "How are recipes generated?", a: "Our AI analyzes your inventory and suggests recipes based on what you have and what's expiring soon." },
              { q: "Can I add items manually?", a: "Yes, go to Inventory and tap the '+' button to add items manually." },
              { q: "How is the Eco-Score calculated?", a: "It's based on how much food waste you prevent and the types of items you consume." }
            ].map((faq, i) => (
              <details key={i} className="group p-4 cursor-pointer">
                <summary className="flex justify-between items-center font-medium text-slate-700 list-none">
                  {faq.q}
                  <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Contact Us</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">chat</span>
              <span className="font-bold text-slate-700 text-sm">Live Chat</span>
            </button>
            <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">mail</span>
              <span className="font-bold text-slate-700 text-sm">Email Support</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
