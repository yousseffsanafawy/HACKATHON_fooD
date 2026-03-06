import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Stop wasting food",
    description: "Track groceries and never forget what is in your fridge",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlecQTiQZGT8YNv2QlsKcvT0P5ILfsTFbcau_ev5lPsP8kXR8-5WeVZ1gpQD-EiIGFdH1SLegmHRBYqJn7_BV5oTQiGWZ-PuiM67pE-9mLgJffW75Uo2_914cYXJyAe8VOCOoDUWf30hQzy44Lor7CbltOX9-Ev31WQ350zklH4KJpw842bBdWRuZqmm2fuzXVKVAB2lrKiczcEioj1cb48Xp_lXZbkzHVokPNrTqIyFGSsc7K0vjzbw4IKddqPhHMrDBUV_ILi_gz",
    type: "illustration"
  },
  {
    title: "AI detects your groceries",
    description: "Take a photo of your groceries and let SmartFood AI do the rest. Automatically log your items in seconds.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRgIGQs1nyZgBNZZHn5sb1axM0AAFMSeycT4EpFtGUDr3S9rtQKJuk5yk3mr88Q9DueZOj4E-GDaj35tvV6y61dVv6Q1TRnryLda21ZkMPUHEj_hcBJQt0I9Bxu8qEbh1_YSvoa1tMNHiamArmphk25FKVQvlExT5qutf7oZto0zxDYcB7IsLowMQdLE7jD8kVGXkDlN0zMeU37ec1jiCBPTzozLrqZi7WXkAZgVhlNpdCDuNBfZeDS9hoirhNyyJPiGf75nb8y8on",
    type: "photo"
  },
  {
    title: "Cook smarter",
    description: "Get AI-generated recipe suggestions based on ingredients already in your fridge.",
    type: "custom"
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/auth");
    }
  };

  const handleSkip = () => {
    navigate("/auth");
  };

  return (
    <main className="w-full max-w-md mx-auto bg-background-light flex flex-col h-screen relative overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 pb-2 z-20">
        {currentSlide > 0 ? (
          <button 
            onClick={() => setCurrentSlide(currentSlide - 1)}
            className="flex size-12 items-center justify-center rounded-full text-slate-700 hover:bg-black/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
        ) : <div className="size-12"></div>}
        <button 
          onClick={handleSkip}
          className="text-[15px] font-medium text-slate-500 hover:text-slate-800 transition-colors px-2"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6 pb-6 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center"
          >
            {currentSlide === 0 && (
              <div className="w-full max-w-[280px] aspect-square bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden mb-10 p-4 border border-slate-100">
                <div className="w-full h-full bg-center bg-no-repeat bg-contain" style={{ backgroundImage: `url(${slides[0].image})` }}></div>
              </div>
            )}

            {currentSlide === 1 && (
              <div className="relative w-full max-w-[320px] aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-3xl shadow-lg mb-10" style={{ backgroundImage: `url(${slides[1].image})` }}>
                <div className="absolute top-[15%] left-[5%] flex items-center gap-2 backdrop-blur-md bg-white/40 border border-white/50 rounded-full py-2 px-4 shadow-sm">
                  <span className="material-symbols-outlined text-accent-blue text-lg">auto_awesome</span>
                  <span className="text-sm font-medium text-slate-900">Milk</span>
                </div>
                <div className="absolute top-[45%] right-[5%] flex items-center gap-2 backdrop-blur-md bg-white/40 border border-white/50 rounded-full py-2 px-4 shadow-sm">
                  <span className="material-symbols-outlined text-accent-blue text-lg">auto_awesome</span>
                  <span className="text-sm font-medium text-slate-900">Tomatoes</span>
                </div>
                <div className="absolute bottom-[20%] left-[10%] flex items-center gap-2 backdrop-blur-md bg-white/40 border border-white/50 rounded-full py-2 px-4 shadow-sm">
                  <span className="material-symbols-outlined text-accent-blue text-lg">auto_awesome</span>
                  <span className="text-sm font-medium text-slate-900">Chicken</span>
                </div>
                <div className="absolute inset-0 rounded-3xl border-2 border-primary/50 shadow-[0_0_20px_rgba(33,196,93,0.3)_inset]"></div>
              </div>
            )}

            {currentSlide === 2 && (
              <div className="w-full aspect-[4/3] max-w-[340px] rounded-2xl bg-gradient-to-br from-[#E2E8F0] to-[#F8FAFC] shadow-inner border border-black/5 overflow-hidden relative flex items-center justify-center p-4 mb-10">
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/70 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#cbd5e1]/60 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <svg className="absolute w-full h-full z-10" fill="none" viewBox="0 0 340 255" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 110 120 Q 170 80 230 140" stroke="url(#paint0_linear)" strokeDasharray="6 6" strokeWidth="3"></path>
                  <defs>
                    <linearGradient id="paint0_linear" x1="110" x2="230" y1="120" y2="140" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B82F6"></stop>
                      <stop offset="1" stopColor="#22C55E"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute left-4 w-[130px] h-[170px] bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] flex flex-col items-center justify-center z-20 overflow-hidden">
                  <div className="absolute top-[45%] w-full h-0.5 bg-blue-400 shadow-[0_0_12px_2px_rgba(59,130,246,0.8)] z-30"></div>
                  <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-1 z-30">
                    <div className="w-1.5 h-1.5 bg-blue-200 rounded-full shadow-[0_0_8px_rgba(147,197,253,1)]"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_8px_rgba(96,165,250,1)]"></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
                  </div>
                  <div className="absolute top-0 w-full h-[45%] bg-gradient-to-b from-transparent to-blue-400/20 z-20"></div>
                  <div className="flex gap-1 relative z-10">
                    <div className="text-2xl bg-white/70 p-1.5 rounded-xl shadow-sm transform -rotate-12">🍅</div>
                    <div className="text-2xl bg-white/70 p-1.5 rounded-xl shadow-sm mt-4">🍗</div>
                    <div className="text-2xl bg-white/70 p-1.5 rounded-xl shadow-sm transform rotate-12">🥬</div>
                  </div>
                </div>
                <div className="absolute right-4 w-[120px] h-[140px] bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl flex flex-col items-center justify-center p-3 z-20 transform hover:scale-105 transition-transform">
                  <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner">🍝</div>
                  <div className="w-3/4 h-2 bg-slate-200 rounded-full mb-2"></div>
                  <div className="w-1/2 h-2 bg-slate-200 rounded-full"></div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white text-white">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-3 w-full">
              <h1 className={`text-slate-900 text-[32px] font-bold leading-tight text-center tracking-tight ${currentSlide === 1 ? 'font-space' : ''}`}>
                {slides[currentSlide].title}
              </h1>
              <p className="text-slate-600 text-base font-normal leading-relaxed text-center px-2 max-w-[320px]">
                {slides[currentSlide].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-10 pt-4 flex flex-col items-center gap-8 w-full z-10">
        <div className="flex flex-row items-center justify-center gap-2.5">
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-slate-300'}`}
            ></div>
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 h-14 rounded-xl bg-primary text-white text-[17px] font-bold shadow-sm active:scale-[0.98] transition-transform"
        >
          {currentSlide === 2 ? (
            <>
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          ) : (
            currentSlide === 1 ? (
              <>
                <span>Continue</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            ) : "Next"
          )}
        </button>
      </div>
      {currentSlide === 0 && <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-primary/5 to-transparent z-0 pointer-events-none"></div>}
    </main>
  );
}
