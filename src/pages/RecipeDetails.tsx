import { useNavigate, useParams } from "react-router-dom";

export default function RecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="relative h-72 w-full">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3hjf_Eo_wMktvw16u9s5KMM11goVDzOmGtTSC0gARhvymqDOdx1wvCnRX5zgJW8CBOcpBwpKTxz1EGgxOuE30m1WPbeD_oD-oCOdpJLdOU95CgYRrdF-NWmM1fLMdlCnNG0nelvqiErPb95P2-_4w2cjWkjUR_Fzpz0R-DaxYyyv7q-lZl5gDFgOckAGzybVB9V1nQ2YNtLsqXFN6-oDdik_MJMHlEJ72u4PumxczS7X2nahCDYPlWIz8uLYs-IDEcrzPZx7HWqO0" 
          alt="Chicken Stir Fry" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined fill-1">bookmark</span>
          </button>
        </header>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">AI Pick</span>
            <span className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">25 Mins</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight">Chicken Stir Fry with Ginger</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="text-center">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Calories</p>
            <p className="text-slate-900 font-bold">420</p>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="text-center">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Protein</p>
            <p className="text-slate-900 font-bold">32g</p>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="text-center">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Carbs</p>
            <p className="text-slate-900 font-bold">45g</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-4">Ingredients</h2>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
            <span className="text-slate-700 font-medium">200g Chicken Breast</span>
            <span className="ml-auto text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded">In Fridge</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
            <span className="text-slate-700 font-medium">2 Carrots, sliced</span>
            <span className="ml-auto text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded">In Fridge</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-[14px]">close</span>
            </div>
            <span className="text-slate-700 font-medium">1 tbsp Soy Sauce</span>
            <span className="ml-auto text-xs text-slate-500 font-bold bg-slate-100 px-2 py-1 rounded cursor-pointer hover:bg-slate-200 transition-colors">Add to List</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
            <span className="text-slate-700 font-medium">1 inch Ginger, minced</span>
            <span className="ml-auto text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded">In Pantry</span>
          </li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mb-4">Instructions</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Prep the ingredients</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Slice the chicken breast into thin strips. Peel and slice the carrots diagonally. Mince the ginger finely.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Cook the chicken</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Heat a wok or large skillet over high heat. Add a splash of oil, then stir-fry the chicken until golden brown and cooked through (about 5-7 mins). Remove and set aside.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Stir-fry veggies</h3>
              <p className="text-slate-600 text-sm leading-relaxed">In the same pan, add a bit more oil if needed. Toss in the ginger and carrots. Stir-fry for 3 minutes until carrots are slightly tender but still crisp.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Combine and serve</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Return the chicken to the pan. Pour in the soy sauce and toss everything together for 1 minute until well coated. Serve hot!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 pb-8">
        <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">restaurant</span>
          Start Cooking
        </button>
      </div>
    </div>
  );
}
