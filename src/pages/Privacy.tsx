import { useNavigate } from "react-router-dom";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-24">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
          <span className="material-symbols-outlined text-slate-700">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Privacy & Security</h1>
        <div className="w-10"></div>
      </header>

      <main className="px-6 py-8 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Data, Your Control</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          At SmartFood AI, we take your privacy seriously. We only collect data necessary to provide you with the best experience, such as your inventory items and dietary preferences to generate personalized recipes.
        </p>

        <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">Data Collection</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
          <li>Account information (email, name)</li>
          <li>Inventory data (items, expiry dates)</li>
          <li>Usage data to improve AI recommendations</li>
        </ul>

        <h3 className="text-lg font-bold text-slate-900 mt-8 mb-3">Security Measures</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          All data is encrypted in transit and at rest. We use industry-standard security protocols to ensure your information is safe from unauthorized access.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-8">
          <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">shield</span>
            End-to-End Encryption
          </h4>
          <p className="text-sm text-slate-600">Your personal data and inventory lists are securely encrypted. We never sell your data to third parties.</p>
        </div>
      </main>
    </div>
  );
}
