import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await signUp(email, password, name);
      navigate('/home', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    setError("");
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-public min-h-screen flex flex-col items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-tr from-[#ECFDF5] to-[#F9FAFB] -z-10"></div>
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-t-3xl shadow-xl">
          <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUjK3pPQxbbpUt_JpHiGfXosWBLABQXqXTThGtOAMbtZkIm7xfoZD2Agi4--dQFWKyLS64_rZwsKbePV6wjxt50vUfyXlyy1M6YVGSUm-gk1PIn0Lk7SvokNRefxIG-GHRL7SAierv-YJAxrxwe8x0KWRKo4a3rh_wiLsWE7y2yl3lW-ZZhoNqmc8kJmTNxlOBuev_dA1V8vX6yXShvbS9mJ5Gm8QY5F5p4GTYyXfb3TzsrVPz5aHo_sIKEm3iyc998U9KIpTiljeW')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="absolute bottom-4 left-6">
            <h1 className="text-white text-3xl font-bold tracking-tight">SmartFood AI</h1>
            <p className="text-white/80 text-sm font-medium">Premium nutrition at your fingertips</p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-b-3xl p-8 shadow-2xl -mt-2">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-5">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">person</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                    placeholder="John Doe"
                    type="text"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="name@example.com"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="••••••••"
                  type="password"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] disabled:from-slate-300 disabled:to-slate-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              )}
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-slate-500 font-medium bg-white/50 backdrop-blur-sm rounded-full">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={handleSocialLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-sm font-semibold text-slate-700">Google</span>
            </button>
            <button 
              type="button" 
              onClick={handleSocialLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
            >
              <svg className="w-5 h-5 fill-slate-900" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05 1.72-3.14 1.72-.94 0-1.28-.53-2.45-.53-1.18 0-1.56.51-2.43.51-.96 0-2-.8-3.05-1.85C3.91 18.06 2 14.47 2 11.16c0-3.35 2.13-5.11 4.14-5.11 1.05 0 1.88.63 2.59.63.66 0 1.34-.63 2.53-.63 1.72 0 3.19.86 3.96 2.11-3.23 1.68-2.7 6.13.43 7.4-.73 1.76-1.6 3.72-2.6 4.72zM12.03 5.43c-.42-2.74 2.12-4.94 4.54-5.13.25 2.94-2.8 5.26-4.54 5.13z"></path>
              </svg>
              <span className="text-sm font-semibold text-slate-700">Apple</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-primary font-bold hover:underline transition-all"
            >
              {isSignUp ? 'Sign In' : 'Create a new account'}
            </button>
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-6 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>
      </div>
    </div>
  );
}
