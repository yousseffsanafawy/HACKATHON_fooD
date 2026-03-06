import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { name: "Home", path: "/home", icon: "home" },
    { name: "Scan", path: "/scan", icon: "qr_code_scanner" },
    { name: "Inventory", path: "/inventory", icon: "inventory_2" },
    { name: "Recipes", path: "/recipes", icon: "menu_book" },
    { name: "Profile", path: "/profile", icon: "person" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[88px] bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] px-6 pb-4 flex items-center justify-between z-50">
      {navItems.map((item) => {
        const isActive = path.startsWith(item.path);
        return (
          <Link
            key={item.name}
            to={item.path}
            className="flex flex-col items-center gap-1 group"
          >
            {isActive && item.name === "Inventory" ? (
              <div className="bg-primary/10 p-2 rounded-xl mb-[-4px]">
                <span className="material-symbols-outlined text-primary fill-1">
                  {item.icon}
                </span>
              </div>
            ) : (
              <span
                className={cn(
                  "material-symbols-outlined",
                  isActive ? "text-primary fill-1" : "text-slate-400 group-hover:text-primary transition-colors"
                )}
              >
                {item.icon}
              </span>
            )}
            <span
              className={cn(
                "text-[10px] font-bold tracking-tight",
                isActive ? "text-primary" : "text-slate-400 group-hover:text-primary transition-colors"
              )}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
