import { useNavigate, Link } from "react-router-dom";
import { useAppStore } from "../store";

export default function SavedRecipes() {
  const navigate = useNavigate();
  const { savedRecipes, toggleSavedRecipe } = useAppStore();

  return (
    <div className="bg-gradient-to-br from-[#f0f9f4] via-[#f6f8f7] to-[#e8f5ee] min-h-screen text-slate-900 pb-24">
      <header className="sticky top-0 z-20 px-4 pt-6 pb-2 glass-card">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-white/50 text-slate-900">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Saved Recipes</h2>
          <div className="flex size-10 items-center justify-center rounded-full bg-white/50 text-slate-900">
            <span className="material-symbols-outlined">more_vert</span>
          </div>
        </div>
        
        <div className="px-0 pb-2">
          <label className="relative flex flex-col w-full">
            <div className="flex w-full items-center rounded-xl bg-white shadow-[0_4px_20px_-2px_rgba(33,196,93,0.1)] h-12 px-4 border border-primary/10">
              <span className="material-symbols-outlined text-primary/60 mr-3">search</span>
              <input className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 font-medium outline-none" placeholder="Search your collection..." type="text" />
              <span className="material-symbols-outlined text-slate-400">tune</span>
            </div>
          </label>
        </div>
      </header>

      <div className="flex gap-3 px-4 py-4 overflow-x-auto no-scrollbar">
        <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold whitespace-nowrap">All Recipes</button>
        <button className="px-5 py-2 rounded-full bg-white/60 text-slate-600 text-sm font-medium whitespace-nowrap border border-white">Breakfast</button>
        <button className="px-5 py-2 rounded-full bg-white/60 text-slate-600 text-sm font-medium whitespace-nowrap border border-white">Lunch</button>
        <button className="px-5 py-2 rounded-full bg-white/60 text-slate-600 text-sm font-medium whitespace-nowrap border border-white">Quick Eats</button>
      </div>

      <main className="grid grid-cols-2 gap-4 px-4 py-2">
        {savedRecipes.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-emerald-500 text-3xl">bookmark_border</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">No saved recipes</h2>
            <p className="text-slate-500">Recipes you save will appear here.</p>
          </div>
        ) : (
          savedRecipes.map((recipe: any) => (
            <div key={recipe.id} className="flex flex-col gap-0 rounded-xl bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] overflow-hidden group">
              <Link to={`/recipes/${recipe.id}`} className="relative w-full aspect-[4/5] overflow-hidden block">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSavedRecipe(recipe);
                  }}
                  className="absolute top-2 right-2 z-10 size-8 rounded-full bg-white/90 flex items-center justify-center text-primary shadow-sm"
                >
                  <span className="material-symbols-outlined !text-[20px] fill-1">bookmark</span>
                </button>
                <div className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110 flex items-center justify-center bg-emerald-50" style={recipe.imageUrl ? { backgroundImage: `url('${recipe.imageUrl}')` } : {}}>
                  {!recipe.imageUrl && <span className="material-symbols-outlined text-emerald-500 text-4xl">restaurant</span>}
                </div>
              </Link>
              <div className="p-3">
                <p className="text-slate-900 text-[15px] font-bold leading-snug truncate">{recipe.title}</p>
                <div className="flex items-center gap-1 mt-1 text-primary">
                  <span className="material-symbols-outlined !text-[14px]">schedule</span>
                  <p className="text-xs font-semibold">{recipe.prepTime} mins</p>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
