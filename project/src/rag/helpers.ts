import type { Criticalita, TargetUtente, SezioneIntelligence } from '../types/intelligence';

export function formatDataItaliana(data: string): string {
  const d = new Date(data);
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function calcolaGiorniRimasti(dataScadenza: string): number {
  const now = new Date();
  const scad = new Date(dataScadenza);
  const diff = scad.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function deriveCriticalita(dataScadenza: string): Criticalita {
  const giorni = calcolaGiorniRimasti(dataScadenza);
  if (giorni <= 3) return 'urgente';
  if (giorni <= 15) return 'alta';
  if (giorni <= 60) return 'media';
  return 'bassa';
}

export function generaDatiDataJournalism(): SezioneIntelligence[] {
  return [
    {
      titolo: 'Andamento Reclutamento 2026',
      descrizione: 'Dati aggregati sulle procedure concorsuali e di reclutamento in corso.',
      dati: [
        { label: 'Posti concorso ordinario secondaria', valore: '20.000', trend: 'up', confronto: '+15% vs 2024', fonte: 'MIM D.D. 987/2026' },
        { label: 'Posti TFA Sostegno VIII ciclo', valore: '12.000', trend: 'up', confronto: '+10% vs VII ciclo', fonte: 'MIM D.D. 1025/2026' },
        { label: 'Iscritti GPS (stima)', valore: '800.000', trend: 'stable', confronto: 'invariato vs 2024', fonte: 'MIM banche dati' },
        { label: 'Posti concorso infanzia/primaria', valore: '12.000', trend: 'up', confronto: '+20% vs 2024', fonte: 'MIM D.D. 989/2026' },
      ],
    },
    {
      titolo: 'Trend Abilitazioni e Formazione',
      descrizione: 'Evoluzione dei percorsi di abilitazione e formazione docenti.',
      dati: [
        { label: 'Università con percorsi 60 CFU', valore: '5', trend: 'up', confronto: 'vs 0 nel 2024', fonte: 'MIM/Indire' },
        { label: 'Posti TFA Sostegno totali (8 cicli)', valore: '85.000', trend: 'up', confronto: '+5% annuo', fonte: 'MIM' },
        { label: 'Docenti in formazione su SOFIA', valore: '450.000', trend: 'stable', confronto: 'invariato', fonte: 'MIM' },
      ],
    },
  ];
}

export function getTargetFromCategory(cat: string): TargetUtente[] {
  const map: Record<string, TargetUtente[]> = {
    'Bandi, Concorsi e Selezioni': ['docenti', 'aspiranti_docenti'],
    'Didattica, Formazione e Innovazione': ['docenti', 'ata', 'educatori', 'universita'],
    'Graduatorie (GPS, GAE, d\'Istituto)': ['docenti', 'aspiranti_docenti', 'sostegno', 'ata'],
    'Contratti, Salari e Personale ATA': ['ata', 'docenti', 'amministrativi', 'collaboratori', 'dsga', 'sindacati'],
    'Pensioni, Previdenza e Welfare': ['docenti', 'ata', 'dsga', 'dirigenti'],
    'Normative, Note e Circolari Ministeriali': ['docenti', 'dirigenti', 'dsga', 'universita', 'decisori_pubblici'],
    'Mobilità, Assegnazioni e Utilizzazioni': ['docenti', 'ata', 'dirigenti'],
    'Esami di Stato e Valutazioni (INVALSI)': ['docenti', 'studenti', 'famiglie', 'dirigenti'],
  };
  return map[cat] || ['docenti'];
}
