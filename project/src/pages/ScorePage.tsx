import { useState } from 'react';
import GPSSimulator from '../components/ui/simulators/GPSSimulator';
import ATASimulator from '../components/ui/simulators/ATASimulator';

export default function ScorePage() {
  const [activeTab, setActiveTab] = useState<'gps' | 'ata'>('gps');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('gps')}
            className={`px-8 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'gps'
                ? 'bg-brand-blu text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-blu'
            }`}
          >
            Simulatore GPS 2026-2028
          </button>
          <button
            onClick={() => setActiveTab('ata')}
            className={`px-8 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'ata'
                ? 'bg-brand-verde text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-verde'
            }`}
          >
            Simulatore ATA Terza Fascia
          </button>
        </div>

        {activeTab === 'gps' ? <GPSSimulator /> : <ATASimulator />}
      </div>
    </div>
  );
}
