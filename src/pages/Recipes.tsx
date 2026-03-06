import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Recipes() {
  return (
    <div className="bg-gradient-to-br from-[#ECFDF5] to-[#F9FAFB] min-h-screen text-slate-900 pb-24">
      <header className="sticky top-0 z-40 px-6 pt-8 pb-4 glass-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">SmartFood AI</span>
          </div>
          <Link to="/recipes/saved" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
            <span className="material-symbols-outlined text-slate-600">bookmark</span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Recipes you can cook today.</h1>
        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 no-scrollbar">
          <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-white px-5 shadow-lg shadow-primary/20 transition-all">
            <span className="material-symbols-outlined text-lg">temp_preferences_custom</span>
            <span className="text-sm font-medium">For You</span>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-white border border-slate-100 text-slate-600 px-5 transition-all">
            <span className="material-symbols-outlined text-lg">schedule</span>
            <span className="text-sm font-medium">Under 30m</span>
          </button>
          <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-white border border-slate-100 text-slate-600 px-5 transition-all">
            <span className="material-symbols-outlined text-lg">restaurant</span>
            <span className="text-sm font-medium">Vegetarian</span>
          </button>
        </div>
      </header>

      <main className="px-6 py-4">
        <div className="grid grid-cols-2 gap-5">
          <Link to="/recipes/creating" className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-50">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3hjf_Eo_wMktvw16u9s5KMM11goVDzOmGtTSC0gARhvymqDOdx1wvCnRX5zgJW8CBOcpBwpKTxz1EGgxOuE30m1WPbeD_oD-oCOdpJLdOU95CgYRrdF-NWmM1fLMdlCnNG0nelvqiErPb95P2-_4w2cjWkjUR_Fzpz0R-DaxYyyv7q-lZl5gDFgOckAGzybVB9V1nQ2YNtLsqXFN6-oDdik_MJMHlEJ72u4PumxczS7X2nahCDYPlWIz8uLYs-IDEcrzPZx7HWqO0')" }}></div>
              <div className="absolute top-3 left-3">
                <div className="glass-card shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center gap-1.5 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px] text-primary font-bold">auto_awesome</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">AI Pick</span>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-slate-900 font-semibold text-[15px] leading-snug">Chicken Stir Fry with Ginger</h3>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span className="text-[12px] font-medium">25 mins</span>
              </div>
              <div className="bg-primary/5 rounded-lg p-2 mt-1">
                <p className="text-[11px] text-primary/80 font-medium">
                  <span className="font-bold">Match:</span> Chicken, Carrots, Soy Sauce
                </p>
              </div>
            </div>
          </Link>

          <Link to="/recipes/creating" className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-50">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyZKsqtQEUhBqh1Y5A6sKZTbCrUXcfjt9clq9oCJoREfEEIFORpd6Uv2Ckz6WTE8vOk6lYkGLwkzCulShMWzEIh97T8IMnwZl5BnVAsB99zzDAJAtiPTwjoyvZBP1f-aH9pfU7V2g304PKS6XfCKBdc6aWKM3L-M7O6AFsWMtveNckzmFkVhbfZXaRYFXQjBlPo3Rp-V7bRRD_xpcIc9GqBPIu6_88q2gu5CxgJXD_ECvhPh9l06MQPqW2uZpWQA69bmM3-3A0DllG')" }}></div>
              <div className="absolute top-3 left-3">
                <div className="glass-card shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center gap-1.5 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px] text-primary font-bold">auto_awesome</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">AI Pick</span>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-slate-900 font-semibold text-[15px] leading-snug">Fresh Garden Harvest Salad</h3>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span className="text-[12px] font-medium">15 mins</span>
              </div>
              <div className="bg-primary/5 rounded-lg p-2 mt-1">
                <p className="text-[11px] text-primary/80 font-medium">
                  <span className="font-bold">Match:</span> Lettuce, Tomato, Cucumber
                </p>
              </div>
            </div>
          </Link>

          <Link to="/recipes/creating" className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-50">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAa5njrZ1g7loRMZSiskczM_kd7x7b0yLhTiT8O4oxFXWDPHUJEkk2mbiIvwDzEZg0T4jYIf0HdaGkLF0Bp6iew08M0eB2m36LCMwMFSLvrqQrWhTp_efmepXB3_--gsZ7AQeLoIiaJub-KM3QRw4ol2LVSE6zECd08QS3JY_XXyxUietrjJoS5Bjxb1t8i3gEICOzceJ4G1VTsfQR2gPigEwdpGiSVpOKgbskBXSVLVokBQDzTj-XKhwt3ymT6oPBkzlwy3o3DXVbt')" }}></div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-slate-900 font-semibold text-[15px] leading-snug">Miso Glazed Atlantic Salmon</h3>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span className="text-[12px] font-medium">30 mins</span>
              </div>
              <div className="bg-primary/5 rounded-lg p-2 mt-1">
                <p className="text-[11px] text-primary/80 font-medium">
                  <span className="font-bold">Match:</span> Salmon, Ginger, Honey
                </p>
              </div>
            </div>
          </Link>

          <Link to="/recipes/creating" className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-50">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3kOc3JiPOlGDVyqYsT2lnG4AtduroasbIIJQ52ssrKLLEw3rQkKRlIi9loIlx_H1KT3IoRVUiOIPp-87hCJjgtccjiCwq-MoxADgVAmL6i7A-LGmtOhf1sIDHNDf2ea6QfWJ_4eYv_K_aHge0SLYHexgMJbUXdPkpgmyI6HgYTngWXE4wIt-jNWeHKQmNoZBRXailkqxVyUH0uRuxD5tz3rWhV07nEVh-HNgEXOawpUCjbVL2o0f3ApoTukK0H5Q1QPIwHIDsrhXi')" }}></div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-slate-900 font-semibold text-[15px] leading-snug">Creamy Avocado Sourdough</h3>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span className="text-[12px] font-medium">10 mins</span>
              </div>
              <div className="bg-primary/5 rounded-lg p-2 mt-1">
                <p className="text-[11px] text-primary/80 font-medium">
                  <span className="font-bold">Match:</span> Bread, Avocado, Egg
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
