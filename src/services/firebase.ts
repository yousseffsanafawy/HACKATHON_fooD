import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { InventoryItem, Location } from '../store';

// Convert Firestore Timestamp to ISO string
const fromFirestore = (data: any): InventoryItem => ({
  ...data,
  expiryDate: data.expiryDate?.toDate?.()?.toISOString() || data.expiryDate,
  addedDate: data.addedDate?.toDate?.()?.toISOString() || data.addedDate,
});

// Convert InventoryItem to Firestore format
const toFirestore = (item: Omit<InventoryItem, 'id'>) => ({
  ...item,
  expiryDate: Timestamp.fromDate(new Date(item.expiryDate)),
  addedDate: Timestamp.fromDate(new Date(item.addedDate)),
});

export const inventoryService = {
  // Get all inventory items for a user, sorted by expiry date
  getAll: (userId: string) => {
    const q = query(
      collection(db, 'users', userId, 'inventory'),
      orderBy('expiryDate', 'asc')
    );
    return getDocs(q);
  },

  // Subscribe to inventory changes in real-time
  subscribe: (userId: string, callback: (items: InventoryItem[]) => void) => {
    const q = query(
      collection(db, 'users', userId, 'inventory'),
      orderBy('expiryDate', 'asc')
    );
    return onSnapshot(q, (snapshot: any) => {
      const items = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...fromFirestore(doc.data())
      } as InventoryItem));
      callback(items);
    });
  },

  // Get single item
  getById: async (userId: string, itemId: string) => {
    const docRef = doc(db, 'users', userId, 'inventory', itemId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...fromFirestore(docSnap.data()) } as InventoryItem;
    }
    return null;
  },

  // Add new item
  add: async (userId: string, item: Omit<InventoryItem, 'id' | 'addedDate'>) => {
    const newItem: Omit<InventoryItem, 'id'> = {
      ...item,
      addedDate: new Date().toISOString(),
    };
    const docRef = await addDoc(
      collection(db, 'users', userId, 'inventory'),
      toFirestore(newItem)
    );
    return docRef.id;
  },

  // Update item
  update: async (userId: string, itemId: string, updates: Partial<InventoryItem>) => {
    const docRef = doc(db, 'users', userId, 'inventory', itemId);
    const updateData: any = { ...updates };
    
    if (updateData.expiryDate) {
      updateData.expiryDate = Timestamp.fromDate(new Date(updateData.expiryDate));
    }
    
    await updateDoc(docRef, updateData);
  },

  // Delete item
  delete: async (userId: string, itemId: string) => {
    const docRef = doc(db, 'users', userId, 'inventory', itemId);
    await deleteDoc(docRef);
  },

  // Get expiring items (within 3 days)
  getExpiring: (userId: string) => {
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    const q = query(
      collection(db, 'users', userId, 'inventory'),
      where('expiryDate', '<=', Timestamp.fromDate(threeDaysFromNow)),
      orderBy('expiryDate', 'asc')
    );
    return getDocs(q);
  },

  // Get items by location
  getByLocation: (userId: string, location: Location) => {
    const q = query(
      collection(db, 'users', userId, 'inventory'),
      where('location', '==', location),
      orderBy('expiryDate', 'asc')
    );
    return getDocs(q);
  }
};

export const shoppingListService = {
  // Get shopping list
  getAll: (userId: string) => {
    const q = query(
      collection(db, 'users', userId, 'shoppingList'),
      orderBy('createdAt', 'desc')
    );
    return getDocs(q);
  },

  // Subscribe to shopping list changes
  subscribe: (userId: string, callback: (items: any[]) => void) => {
    const q = query(
      collection(db, 'users', userId, 'shoppingList'),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot: any) => {
      const items = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(items);
    });
  },

  // Add item
  add: async (userId: string, name: string, isAiSuggestion: boolean = false, category?: string) => {
    await addDoc(collection(db, 'users', userId, 'shoppingList'), {
      name,
      checked: false,
      isAiSuggestion,
      category,
      createdAt: Timestamp.now(),
    });
  },

  // Toggle checked
  toggle: async (userId: string, itemId: string, checked: boolean) => {
    const docRef = doc(db, 'users', userId, 'shoppingList', itemId);
    await updateDoc(docRef, { checked });
  },

  // Delete item
  delete: async (userId: string, itemId: string) => {
    const docRef = doc(db, 'users', userId, 'shoppingList', itemId);
    await deleteDoc(docRef);
  },

  // Clear completed
  clearCompleted: async (userId: string) => {
    const q = query(
      collection(db, 'users', userId, 'shoppingList'),
      where('checked', '==', true)
    );
    const snapshot = await getDocs(q);
    const promises = snapshot.docs.map((doc: any) => deleteDoc(doc.ref));
    await Promise.all(promises);
  }
};

export const recipeService = {
  // Get saved recipes
  getSaved: (userId: string) => {
    return getDocs(collection(db, 'users', userId, 'savedRecipes'));
  },

  // Subscribe to saved recipes
  subscribe: (userId: string, callback: (recipes: any[]) => void) => {
    return onSnapshot(collection(db, 'users', userId, 'savedRecipes'), (snapshot: any) => {
      const recipes = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(recipes);
    });
  },

  // Save recipe
  save: async (userId: string, recipe: any) => {
    const docRef = doc(db, 'users', userId, 'savedRecipes', recipe.id);
    await setDoc(docRef, recipe);
  },

  // Unsave recipe
  unsave: async (userId: string, recipeId: string) => {
    const docRef = doc(db, 'users', userId, 'savedRecipes', recipeId);
    await deleteDoc(docRef);
  },

  // Check if recipe is saved
  isSaved: async (userId: string, recipeId: string) => {
    const docRef = doc(db, 'users', userId, 'savedRecipes', recipeId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }
};

export const impactService = {
  // Get user impact stats
  get: async (userId: string) => {
    const docRef = doc(db, 'users', userId, 'impact', 'stats', 'summary');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    // Initialize default stats
    const defaultStats = {
      mealsSaved: 0,
      moneySaved: 0,
      co2Prevented: 0,
      wasteReduced: 0,
      updatedAt: Timestamp.now(),
    };
    await setDoc(docRef, defaultStats);
    return defaultStats;
  },

  // Update impact stats
  update: async (userId: string, updates: Partial<any>) => {
    const docRef = doc(db, 'users', userId, 'impact', 'stats', 'summary');
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  },

  // Record waste prevention
  recordPrevention: async (userId: string, itemValue: number, weightKg: number) => {
    const docRef = doc(db, 'users', userId, 'impact', 'stats', 'summary');
    const docSnap = await getDoc(docRef);
    
    const current = docSnap.exists() ? docSnap.data() : {
      mealsSaved: 0,
      moneySaved: 0,
      co2Prevented: 0,
      wasteReduced: 0,
    };

    await updateDoc(docRef, {
      mealsSaved: current.mealsSaved + Math.round(weightKg * 2),
      moneySaved: current.moneySaved + itemValue,
      co2Prevented: current.co2Prevented + (weightKg * 2.5),
      wasteReduced: current.wasteReduced + weightKg,
      updatedAt: Timestamp.now(),
    });
  }
};
