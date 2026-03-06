import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatingRecipes() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/recipes");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-full flex-col bg-gradient-to-br from-[#ECFDF5] to-[#F9FAFB] overflow-hidden">
      <div className="flex items-center p-4 justify-between z-10">
        <button onClick={() => navigate(-1)} className="text-slate-700 flex size-12 shrink-0 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">SmartFood AI</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border-2 border-primary/20 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-4 border-primary/40 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-accent-blue opacity-20 blur-2xl animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-1/4 flex flex-col items-center transform -translate-y-4">
            <div className="w-20 h-20 rounded-full border-2 border-white bg-cover bg-center shadow-xl shadow-primary/10 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAKghEj3QEm7ig_MZ82gbvJ_l7NqRtNrJuZEVr8RyG0yVbOwkMFL2Zlb1LDlZiDgovu7R0WjjGY4gfAd2kn5eG_tWAScQOFRoTMQfslpi8SQi8B97zY-z6KWBlfUx14V_P9BZN0-Sei00CkJHOfhb5P-JvwFZWN2n8xhXERjBhRnDMtsmWdhI2xVjOyT_M9GedR1fhqYqQxj1D096Z0qan110kr2xD1FFW_fb1hH2GAZqxnoVLMBduw1_gPTNjovqzCETYuSe3S1lU')" }}></div>
            <div className="mt-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-500 shadow-sm">Tomato</div>
          </div>

          <div className="absolute top-1/4 right-0 flex flex-col items-center transform translate-x-4">
            <div className="w-24 h-24 rounded-full border-2 border-white bg-cover bg-center shadow-xl shadow-primary/10 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9mFzDYjiqiAMhyB0TAANBBL69AM80rejReCtU5d4Kd_mqqi9bkwJKBQ7W24q5P2UTMHn33BCqsovkN73gREai9i0bFGOcOzYUNulM3Yqi-5RGjzEm8DmIupK7XlUIQvyS6EIhdKeWxnGqfjwQsrt55nMghfePMnsnp66x0rQN5YZR9zWKnci8JAeLJEYL4uf6HqUvVDLjlwuyh8Hq-SjIehHcux817rLo4Zi9JMo6BhU6GbF6Fcq2sjh36nA9SmPySuABvJZ1xVI5')" }}></div>
            <div className="mt-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-500 shadow-sm">Chicken</div>
          </div>

          <div className="absolute bottom-1/4 left-0 flex flex-col items-center transform -translate-x-4">
            <div className="w-16 h-16 rounded-full border-2 border-white bg-cover bg-center shadow-xl shadow-primary/10 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATzNtnyQyN_XdB6GFj4fyAdr9bOsM6hXMP1VtgzI7NGPUeAPd3xIdNCG47v70J6QJ45RSqFX6STGA6Y-ax0FEeS_boEAOix2NkSpqtQG0GRYF32TYG3N0VmvmEeF8-A4jJqI-sBtezHtmXJIi5zvCQErxt6MkFVvMu_A6R2LsyPELE5aBUu7ZnbuTsvBdB0edWyMKbtHdL9n4loJfvgQeAL-fstVd9iPuwjkZDFR4DUmMHcJtYycybF7PBYLivvgEEovJn6uLhcOv2')" }}></div>
            <div className="mt-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-500 shadow-sm">Onion</div>
          </div>

          <div className="absolute bottom-0 right-1/4 flex flex-col items-center transform translate-y-4">
            <div className="w-20 h-20 rounded-full border-2 border-white bg-cover bg-center shadow-xl shadow-primary/10 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJWCDcMfPTE-Q-_BfWAiYgQBdfHrV4Vcq6Bwuc9zWrDrxpcAft9cVuZgEIc52Vq8gdnSkzcN9VAZUjn1Y_jIRvpSWl29ocGJdovNux6fYrhWilnScl8Ga9chWQtgS5Zu4J1aqLLQ2ROx9cwQNNj98EDtCA7Ow0OnxbyNFNJrumF9T2FAr1gvPMIdT1EZxa4YZXejP6b6GYvORlM54rYNBydjHIfk8j5FKohYnxOnw9V_2Moh6hnFQZTH8uSukBrwuFOF0C2QX0vyZb')" }}></div>
            <div className="mt-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-slate-500 shadow-sm">Pasta</div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 80C180 150 220 180 300 120" stroke="url(#paint0_linear)" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="2"></path>
            <path d="M100 80C80 200 120 280 100 300" stroke="url(#paint1_linear)" strokeDasharray="4 4" strokeLinecap="round" strokeWidth="2"></path>
            <path d="M300 120C250 200 320 280 280 380" stroke="url(#paint2_linear)" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="2"></path>
            <defs>
              <linearGradient id="paint0_linear" x1="100" x2="300" y1="80" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6"></stop>
                <stop offset="1" stopColor="#22C55E"></stop>
              </linearGradient>
              <linearGradient id="paint1_linear" x1="100" x2="100" y1="80" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6"></stop>
                <stop offset="1" stopColor="#3B82F6" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient id="paint2_linear" x1="300" x2="280" y1="120" y2="380" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22C55E"></stop>
                <stop offset="1" stopColor="#3B82F6"></stop>
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="material-symbols-outlined text-accent-blue text-4xl opacity-60">auto_awesome</span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h1 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight">Creating recipes for you</h1>
          <p className="text-slate-500 text-base font-medium mt-3 px-8 leading-relaxed">Our AI chef is analyzing your ingredients to craft perfect culinary matches.</p>
        </div>

        <div className="mt-12 flex space-x-2 items-center">
          <div className="w-3 h-3 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-3 h-3 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}
