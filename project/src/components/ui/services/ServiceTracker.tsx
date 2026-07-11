import { useState } from 'react';
import { ClipboardCheck, CheckCircle, Clock, ArrowRight, FileText, UserCheck, GraduationCap } from 'lucide-react';

interface ServiceStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
}

interface Service {
  id: string;
  name: string;
  steps: ServiceStep[];
}

const defaultServices: Service[] = [
  {
    id: 'gps',
    name: 'Graduatorie GPS',
    steps: [
      { id: 'gps-1', label: 'Verifica requisiti', icon: <ClipboardCheck size={14} />, completed: true, active: false },
      { id: 'gps-2', label: 'Calcolo punteggio', icon: <FileText size={14} />, completed: true, active: false },
      { id: 'gps-3', label: 'Controllo titoli', icon: <UserCheck size={14} />, completed: false, active: true },
      { id: 'gps-4', label: 'Invio domanda', icon: <GraduationCap size={14} />, completed: false, active: false },
      { id: 'gps-5', label: 'Completata', icon: <CheckCircle size={14} />, completed: false, active: false },
    ],
  },
  {
    id: 'ata',
    name: 'Graduatorie ATA',
    steps: [
      { id: 'ata-1', label: 'Verifica requisiti', icon: <ClipboardCheck size={14} />, completed: true, active: false },
      { id: 'ata-2', label: 'Calcolo punteggio', icon: <FileText size={14} />, completed: false, active: true },
      { id: 'ata-3', label: 'Controllo titoli', icon: <UserCheck size={14} />, completed: false, active: false },
      { id: 'ata-4', label: 'Invio domanda', icon: <GraduationCap size={14} />, completed: false, active: false },
      { id: 'ata-5', label: 'Completata', icon: <CheckCircle size={14} />, completed: false, active: false },
    ],
  },
  {
    id: 'concorso',
    name: 'Concorso Docenti',
    steps: [
      { id: 'co-1', label: 'Verifica bando', icon: <ClipboardCheck size={14} />, completed: true, active: false },
      { id: 'co-2', label: 'Preparazione domanda', icon: <FileText size={14} />, completed: false, active: true },
      { id: 'co-3', label: 'Prova scritta', icon: <UserCheck size={14} />, completed: false, active: false },
      { id: 'co-4', label: 'Prova orale', icon: <GraduationCap size={14} />, completed: false, active: false },
      { id: 'co-5', label: 'Immissione ruolo', icon: <CheckCircle size={14} />, completed: false, active: false },
    ],
  },
];

export default function ServiceTracker() {
  const [services] = useState<Service[]>(defaultServices);

  const getOverallProgress = (steps: ServiceStep[]) => {
    const completed = steps.filter(s => s.completed).length;
    return Math.round((completed / steps.length) * 100);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ClipboardCheck size={18} className="text-brand-blu" />
        <h3 className="font-semibold text-gray-800">Stato Pratiche</h3>
      </div>

      <div className="space-y-4">
        {services.map(service => {
          const progress = getOverallProgress(service.steps);
          return (
            <div key={service.id} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-800">{service.name}</h4>
                <span className="text-xs font-bold text-brand-blu">{progress}%</span>
              </div>

              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-brand-blu to-brand-verde rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-1.5">
                {service.steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center gap-2">
                    {step.completed ? (
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    ) : step.active ? (
                      <Clock size={14} className="text-brand-ambra flex-shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                    )}
                    <span
                      className={`text-xs ${
                        step.completed
                          ? 'text-green-600 line-through'
                          : step.active
                          ? 'text-brand-ambra font-semibold'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                    {idx < service.steps.length - 1 && step.completed && (
                      <ArrowRight size={10} className="text-green-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
