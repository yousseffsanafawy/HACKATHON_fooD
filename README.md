# SmartFood AI 🥗🤖

An AI-powered Food Expiry Tracker and Recipe Generator with Firebase backend integration.

## Features ✨

- **Smart Inventory Management** - Track groceries with expiry dates
- **AI-Powered Scanning** - Simulated image recognition for groceries (3-second scan with loading animation)
- **Expiry Alerts** - Color-coded warnings (Red: ≤1 day, Orange: ≤3 days, Yellow: ≤7 days)
- **Recipe Generator** - Get recipes based on available ingredients
- **Shopping List** - Auto-adds items when deleted from fridge (smart replenishment)
- **Analytics Dashboard** - Track food saved vs wasted with Recharts visualizations
- **Eco Impact Tracking** - Monitor CO₂ prevented, money saved, and waste reduced
- **Firebase Backend** - Real-time sync with Firestore, Auth with Google/Email

## Tech Stack 🛠

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (Custom design system with #22C55E primary)
- **State**: Zustand with Firestore real-time sync
- **Backend**: Firebase (Auth + Firestore)
- **Charts**: Recharts for analytics
- **Animations**: Framer Motion
- **Routing**: React Router v6 with Auth guards
- **Date**: date-fns

## Setup Instructions 🚀

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable **Authentication** (Email/Password + Google Sign-in)
4. Enable **Firestore Database** (Create database in production mode)
5. Go to Project Settings > Your apps > Web app
6. Copy the Firebase config object

### 3. Update Firebase Config

Edit `src/firebase/config.ts` with your Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### 4. Firestore Security Rules

Set up these security rules in Firebase Console > Firestore > Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure 📁

```
src/
├── components/
│   ├── AuthGuard.tsx      # Protected route wrapper
│   ├── BottomNav.tsx      # Bottom navigation bar
│   └── Skeleton.tsx       # Loading skeletons with shimmer
├── firebase/
│   └── config.ts          # Firebase initialization
├── hooks/
│   └── useAuth.tsx        # Auth context & hook
├── pages/
│   ├── AddInventoryItem.tsx
│   ├── Alerts.tsx         # Expiry alerts (Red/Orange/Yellow)
│   ├── Auth.tsx           # Login/Signup with Firebase
│   ├── Home.tsx           # Dashboard with skeleton loading
│   ├── Insights.tsx       # Analytics with Recharts
│   ├── Inventory.tsx      # Item list sorted by expiry
│   ├── ItemDetails.tsx
│   ├── Scan.tsx           # AI scan with Framer Motion
│   ├── ScanResults.tsx
│   ├── ShoppingList.tsx   # Auto-add on delete logic
│   └── ...
├── services/
│   └── firebase.ts        # CRUD operations
├── store/
│   └── index.ts           # Zustand store with Firestore sync
├── utils/
│   ├── aiScan.ts          # Simulated AI scan (3s delay)
│   └── cn.ts              # Classname utility
├── App.tsx                # Router with AuthGuard
└── index.css              # Tailwind + custom theme
```

## Key Features Implementation 🔑

### Authentication Flow
- `AuthProvider` wraps entire app
- `AuthGuard` protects all routes except `/`, `/onboarding`, `/auth`
- `PublicOnlyGuard` redirects logged-in users away from auth pages

### AI Scan Simulation
- 3-second loading state with Framer Motion spinner
- Returns dynamic items: `{ name, category, expiryDays, confidence }`
- Located in `src/utils/aiScan.ts`

### Expiry Logic
```typescript
const daysLeft = differenceInDays(parseISO(item.expiryDate), new Date());
// Red: daysLeft < 0 (Expired) or ≤ 1
// Orange: daysLeft ≤ 3
// Yellow: daysLeft ≤ 7
// Green: Fresh
```

### Auto-Add to Shopping List
When an item is deleted from inventory:
```typescript
if (item && item.location === 'Fridge' && daysLeft > 0) {
  await shoppingListService.add(userId, item.name, false, item.category);
}
```

### Real-time Sync
Zustand store subscribes to Firestore changes:
```typescript
onSnapshot(query(collection(db, 'users', userId, 'inventory')), (snapshot) => {
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  set({ inventory: items });
});
```

## Color System 🎨

Your design system is preserved exactly:

```css
--color-primary: #22c55e;        /* Green */
--color-primary-hover: #16a34a;
--color-accent-orange: #f59e0b;  /* Warnings */
--color-accent-blue: #3b82f6;    /* AI features */
--color-background-light: #f6f8f7;
```

## Production Build 📦

```bash
npm run build
npm run preview
```

## Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Missing Items / Notes ⚠️

1. **Firebase Config**: You must add your own Firebase credentials in `src/firebase/config.ts`
2. **Firestore Indexes**: Some queries may require composite indexes (Firebase will prompt you)
3. **Environment Variables**: For production, use `.env` file:
   ```
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   ```

## Screenshots 📸

- **Dashboard**: Shows expiring items with color alerts
- **Scan**: AI simulation with animated scanner overlay
- **Insights**: Bar chart comparing food saved vs wasted
- **Inventory**: Sorted by expiry date (ascending)

## License 📄

MIT License - Built for HACKATHON
