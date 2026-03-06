import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-full flex-col bg-gradient-to-b from-primary to-primary/80 items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center z-10 p-8">
        <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center relative mb-8">
          <span aria-hidden="true" className="material-symbols-outlined text-[64px] text-primary">
            kitchen
          </span>
          <span aria-hidden="true" className="material-symbols-outlined text-accent-blue absolute top-4 right-4 text-2xl">
            auto_awesome
          </span>
        </div>
        <h1 className="text-white tracking-tight text-4xl font-bold leading-tight text-center mb-2 drop-shadow-sm">
          SmartFood AI
        </h1>
        <h2 className="text-white/90 text-lg font-medium leading-tight tracking-wide text-center drop-shadow-sm">
          Your AI kitchen assistant
        </h2>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}
