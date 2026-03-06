import { create } from 'zustand';
import { addDays, differenceInDays, parseISO } from 'date-fns';

export type Category = 'Vegetables' | 'Fruits' | 'Dairy' | 'Meat' | 'Poultry' | 'Pantry' | 'Beverages';
export type Location = 'Fridge' | 'Pantry' | 'Freezer';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: Category;
  location: Location;
  expiryDate: string;
  addedDate: string;
  imageUrl?: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  calories: number;
  tags: string[];
  ingredients: { name: string; amount: string; inInventory: boolean }[];
  instructions: string[];
  isSaved: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  category?: string;
  isAiSuggestion?: boolean;
}

interface AppState {
  user: { name: string; email: string; isPremium: boolean } | null;
  inventory: InventoryItem[];
  savedRecipes: Recipe[];
  shoppingList: ShoppingItem[];
  impact: {
    mealsSaved: number;
    moneySaved: number;
    co2Prevented: number;
    wasteReduced: number;
  };
  isLoading: boolean;
  error: string | null;

  syncWithFirebase: (userId: string) => void;
  unsubscribe: (() => void) | null;

  login: (email: string) => void;
  logout: () => void;

  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'addedDate'>) => Promise<void>;
  removeInventoryItem: (id: string) => Promise<void>;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => Promise<void>;

  toggleSaveRecipe: (recipe: Recipe) => void;

  addShoppingItem: (name: string, isAiSuggestion?: boolean, category?: string) => Promise<void>;
  toggleShoppingItem: (id: string) => Promise<void>;
  removeShoppingItem: (id: string) => Promise<void>;
  clearCompletedShoppingItems: () => Promise<void>;

  recordWastePrevention: (itemValue: number, weightKg: number, userId?: string) => Promise<void>;
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Organic Avocados',
    quantity: 3,
    unit: 'pcs',
    category: 'Vegetables',
    location: 'Fridge',
    expiryDate: addDays(new Date(), 2).toISOString(),
    addedDate: new Date().toISOString(),
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB3NGsw3A-8ROark7Zr5DjUIYqZBYpZJoCy9pKvrth8J8UsMETzwnR_wMSt03PZbBdmFm3jGMuoWxc3QPtAcsrSJkILtRuNgKMnEGSOp-dTqlRW6D_c3EMOoSknxjTt2epVEEsSnh7sTWhtCo4L26f0dbYEEYuIZ4eQBRefEvg9F3Hr5ItVoSW5tJ93rLIE7Zl87WC0KCzaSJUtT2z3MugqN3H8gsFAjXxoiHwDD3gEgkVSgJh6PUnkgQaPY1jAXR0ZjeLYv_rzL4n'
  },
  {
    id: '2',
    name: 'Almond Milk',
    quantity: 1,
    unit: 'L',
    category: 'Dairy',
    location: 'Fridge',
    expiryDate: addDays(new Date(), 12).toISOString(),
    addedDate: new Date().toISOString(),
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3-dEnHSs4PrzF94yMR2INbBY3ZDlV6KjqlqskKC8UoVPF3B0gJigIbYvmIowZhbR9Mqz0Z26NDIu9FPQ-xPNgS_hO_d0oWN8HIzWBRs3NuRPGY84ZC-tW2TMpbWTi4usM81TEH5bh2JRAFr1bSOnIRCgd7O55qP6AuU0lrnuAl7TtPI47crAXPsr9YJ8k1ARQOf2zLrDbMs2SFg-ZE6vosZQIwjjP4g0bme2ErQIen0Q3PbX1yc0774lDEsOZkhTG3uXV2lWxsmE2'
  },
  {
    id: '3',
    name: 'Baby Spinach',
    quantity: 200,
    unit: 'g',
    category: 'Vegetables',
    location: 'Fridge',
    expiryDate: addDays(new Date(), 1).toISOString(),
    addedDate: new Date().toISOString(),
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB854LjMgkuWR2tXiGKOMnS3DLaUYo7S6A5rMfaSwFu35Y3MFQaWeZSAOm2lshkOk3vr-Uv_V-BaIrq9IewIax4M88wbfj_1Skvs2PT1VGie2EUL6VUwAIR8jyHUAI37QqKERiNf8uBryL7cV-ejyzxQ18GWcLtfYC_B4odXCd7RzSDBpy3YlYQMkDqyXOjfzkTeme5WCSRTOd51AeZVTSb6O_MvFGniX_gtIbbosFj2tbBLPua75zRVKNES_xaG4qXEcNP4Ayzn_kH'
  }
];

const initialShoppingList: ShoppingItem[] = [
  { id: 's1', name: 'Eggs', checked: false, category: 'Dairy' },
  { id: 's2', name: 'Whole Wheat Bread', checked: true, category: 'Pantry' },
  { id: 's3', name: 'Olive Oil', checked: false, category: 'Pantry', isAiSuggestion: true },
];

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  inventory: initialInventory,
  savedRecipes: [],
  shoppingList: initialShoppingList,
  impact: {
    mealsSaved: 42,
    moneySaved: 128.50,
    co2Prevented: 34.2,
    wasteReduced: 12.5,
  },
  isLoading: false,
  error: null,
  unsubscribe: null,

  syncWithFirebase: () => {
    // Demo mode - no Firebase sync
    console.log('Demo mode: Using local data');
  },

  login: (email: string) => set({ user: { name: email.split('@')[0], email, isPremium: true } }),
  logout: () => {
    const unsubscribe = get().unsubscribe;
    if (unsubscribe) {
      unsubscribe();
    }
    set({ user: null });
  },

  addInventoryItem: async (item) => {
    set({ isLoading: true });
    const newItem: InventoryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      addedDate: new Date().toISOString(),
    };
    set((state) => ({
      inventory: [...state.inventory, newItem],
      isLoading: false,
    }));
  },

  removeInventoryItem: async (id: string) => {
    const item = get().inventory.find((i: InventoryItem) => i.id === id);
    
    // Auto-add to shopping list if item was in Fridge and not expired
    if (item && item.location === 'Fridge') {
      const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
      if (daysLeft > 0) {
        await get().addShoppingItem(item.name, false, item.category);
      }
    }
    
    set((state) => ({
      inventory: state.inventory.filter((i: InventoryItem) => i.id !== id),
    }));
  },

  updateInventoryItem: async (id: string, updates: Partial<InventoryItem>) => {
    set((state) => ({
      inventory: state.inventory.map((i: InventoryItem) => 
        i.id === id ? { ...i, ...updates } : i
      ),
    }));
  },

  toggleSaveRecipe: (recipe: Recipe) => set((state) => {
    const exists = state.savedRecipes.find((r: Recipe) => r.id === recipe.id);
    if (exists) {
      return { savedRecipes: state.savedRecipes.filter((r: Recipe) => r.id !== recipe.id) };
    }
    return { savedRecipes: [...state.savedRecipes, { ...recipe, isSaved: true }] };
  }),

  addShoppingItem: async (name: string, isAiSuggestion = false, category?: string) => {
    set((state) => ({
      shoppingList: [...state.shoppingList, { 
        id: Math.random().toString(36).substr(2, 9), 
        name, 
        checked: false,
        isAiSuggestion,
        category 
      }],
    }));
  },

  toggleShoppingItem: async (id: string) => {
    set((state) => ({
      shoppingList: state.shoppingList.map((i: ShoppingItem) => 
        i.id === id ? { ...i, checked: !i.checked } : i
      ),
    }));
  },

  removeShoppingItem: async (id: string) => {
    set((state) => ({
      shoppingList: state.shoppingList.filter((i: ShoppingItem) => i.id !== id),
    }));
  },

  clearCompletedShoppingItems: async () => {
    set((state) => ({
      shoppingList: state.shoppingList.filter((i: ShoppingItem) => !i.checked),
    }));
  },

  recordWastePrevention: async (itemValue: number, weightKg: number) => {
    set((state) => ({
      impact: {
        ...state.impact,
        mealsSaved: state.impact.mealsSaved + Math.round(weightKg * 2),
        moneySaved: state.impact.moneySaved + itemValue,
        co2Prevented: state.impact.co2Prevented + (weightKg * 2.5),
        wasteReduced: state.impact.wasteReduced + weightKg,
      }
    }));
  },
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
}));
