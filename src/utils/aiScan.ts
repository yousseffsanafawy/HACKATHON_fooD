import { Category, Location } from '../store';

export interface ScannedItem {
  id: string;
  name: string;
  category: Category;
  location: Location;
  expiryDays: number;
  confidence: number;
}

// Simulated database of food items for AI recognition
const FOOD_DATABASE: Omit<ScannedItem, 'id' | 'confidence'>[] = [
  { name: 'Whole Milk', category: 'Dairy', location: 'Fridge', expiryDays: 7 },
  { name: 'Organic Eggs', category: 'Dairy', location: 'Fridge', expiryDays: 14 },
  { name: 'Vine Tomatoes', category: 'Vegetables', location: 'Fridge', expiryDays: 5 },
  { name: 'Sourdough Bread', category: 'Pantry', location: 'Pantry', expiryDays: 3 },
  { name: 'Chicken Breast', category: 'Poultry', location: 'Fridge', expiryDays: 2 },
  { name: 'Greek Yogurt', category: 'Dairy', location: 'Fridge', expiryDays: 10 },
  { name: 'Baby Spinach', category: 'Vegetables', location: 'Fridge', expiryDays: 4 },
  { name: 'Cheddar Cheese', category: 'Dairy', location: 'Fridge', expiryDays: 21 },
  { name: 'Orange Juice', category: 'Beverages', location: 'Fridge', expiryDays: 7 },
  { name: 'Ground Beef', category: 'Meat', location: 'Freezer', expiryDays: 90 },
  { name: 'Carrots', category: 'Vegetables', location: 'Fridge', expiryDays: 14 },
  { name: 'Apples', category: 'Fruits', location: 'Fridge', expiryDays: 21 },
  { name: 'Bananas', category: 'Fruits', location: 'Pantry', expiryDays: 5 },
  { name: 'Rice', category: 'Pantry', location: 'Pantry', expiryDays: 365 },
  { name: 'Pasta', category: 'Pantry', location: 'Pantry', expiryDays: 365 },
  { name: 'Olive Oil', category: 'Pantry', location: 'Pantry', expiryDays: 365 },
  { name: 'Butter', category: 'Dairy', location: 'Fridge', expiryDays: 30 },
  { name: 'Salmon Fillet', category: 'Meat', location: 'Fridge', expiryDays: 2 },
  { name: 'Lettuce', category: 'Vegetables', location: 'Fridge', expiryDays: 5 },
  { name: 'Strawberries', category: 'Fruits', location: 'Fridge', expiryDays: 3 },
];

/**
 * Simulates AI-powered image recognition for food items
 * Returns a promise that resolves after 3 seconds with detected items
 */
export async function simulateScan(): Promise<ScannedItem[]> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Randomly select 3-6 items from the database
      const numItems = Math.floor(Math.random() * 4) + 3;
      const shuffled = [...FOOD_DATABASE].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, numItems);
      
      const scannedItems: ScannedItem[] = selected.map((item, index) => ({
        ...item,
        id: `scan-${Date.now()}-${index}`,
        confidence: Math.floor(Math.random() * 15) + 85, // 85-99% confidence
      }));
      
      resolve(scannedItems);
    }, 3000); // 3 second delay
  });
}

/**
 * Simulates scanning a single item with detailed analysis
 */
export async function simulateSingleScan(itemName?: string): Promise<ScannedItem> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let selectedItem: Omit<ScannedItem, 'id' | 'confidence'>;
      
      if (itemName) {
        // Find matching item or create based on name
        const found = FOOD_DATABASE.find(i => 
          i.name.toLowerCase().includes(itemName.toLowerCase())
        );
        selectedItem = found || {
          name: itemName,
          category: 'Pantry',
          location: 'Pantry',
          expiryDays: 7,
        };
      } else {
        const random = FOOD_DATABASE[Math.floor(Math.random() * FOOD_DATABASE.length)];
        selectedItem = random;
      }
      
      resolve({
        ...selectedItem,
        id: `scan-${Date.now()}`,
        confidence: Math.floor(Math.random() * 15) + 85,
      });
    }, 2000);
  });
}

/**
 * Get category suggestions based on item name
 */
export function suggestCategory(itemName: string): { category: Category; location: Location } {
  const name = itemName.toLowerCase();
  
  if (name.includes('milk') || name.includes('yogurt') || name.includes('cheese') || name.includes('butter')) {
    return { category: 'Dairy', location: 'Fridge' };
  }
  if (name.includes('chicken') || name.includes('beef') || name.includes('pork') || name.includes('lamb')) {
    return { category: 'Meat', location: 'Fridge' };
  }
  if (name.includes('tomato') || name.includes('lettuce') || name.includes('spinach') || name.includes('carrot')) {
    return { category: 'Vegetables', location: 'Fridge' };
  }
  if (name.includes('apple') || name.includes('banana') || name.includes('orange') || name.includes('berry')) {
    return { category: 'Fruits', location: 'Fridge' };
  }
  if (name.includes('rice') || name.includes('pasta') || name.includes('flour') || name.includes('sugar')) {
    return { category: 'Pantry', location: 'Pantry' };
  }
  if (name.includes('juice') || name.includes('soda') || name.includes('water')) {
    return { category: 'Beverages', location: 'Pantry' };
  }
  
  return { category: 'Pantry', location: 'Pantry' };
}
