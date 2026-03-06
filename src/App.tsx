import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import MyFridge from "./pages/MyFridge";
import Scan from "./pages/Scan";
import ScanResults from "./pages/ScanResults";
import Recipes from "./pages/Recipes";
import SavedRecipes from "./pages/SavedRecipes";
import CreatingRecipes from "./pages/CreatingRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import Alerts from "./pages/Alerts";
import ShoppingList from "./pages/ShoppingList";
import Profile from "./pages/Profile";
import Impact from "./pages/Impact";
import ItemDetails from "./pages/ItemDetails";
import AddInventoryItem from "./pages/AddInventoryItem";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/add" element={<AddInventoryItem />} />
        <Route path="/inventory/item/:id" element={<ItemDetails />} />
        <Route path="/my-fridge" element={<MyFridge />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/scan/results" element={<ScanResults />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/saved" element={<SavedRecipes />} />
        <Route path="/recipes/creating" element={<CreatingRecipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
