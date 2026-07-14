const https = require('https');
const fs = require('fs');

const SUPABASE_URL = 'https://xawemvuralsgwvypiufl.supabase.co';
const KEY = fs.readFileSync('.env', 'utf8').match(/VITE_SUPABASE_ANON_KEY=(.+)/)[1].trim();

function upsert(table, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const parsedUrl = new globalThis.URL(`${SUPABASE_URL}/rest/v1/${table}`);
    const req = https.request(parsedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KEY}`,
        'apikey': KEY,
        'Prefer': 'resolution=merge-duplicates',
      },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        if (res.statusCode >= 400) reject(new Error(`${res.statusCode}: ${d}`));
        else resolve(d);
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function del(table, query) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new globalThis.URL(`${SUPABASE_URL}/rest/v1/${table}?${query}`);
    const req = https.request(parsedUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${KEY}`,
        'apikey': KEY,
      },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('Cleaning old data...');
  await del('intelligence_news', 'fonte_nome=eq.MIM&or=(fonte_nome.eq.Orizzonte%20Scuola)');
  await del('intelligence_scadenze', 'id=not.is.null');
  console.log('Cleaned.');

  const news = [
    {
      titolo: 'Contratto scuola pienamente efficace: 412 euro di aumento medio',
      descrizione: 'Nuovo contratto scuola operativo dal 1 luglio 2026. 412 euro di aumento medio mensile su tre bienni contrattuali.',
      data_pubblicazione: '2026-07-01',
      fonte_nome: 'MIM',
      fonte_url: 'https://www.mim.gov.it/web/guest/-/contratto-scuola-pienamente-efficace',
      fonte_livello: 'A', fonte_peso: 100,
      criticita: 'strategica', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti','ata','dirigenti'],
      categoria: 'Contratti, Salari e Personale ATA',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Contratto scuola 2024-2027 pienamente operativo dal 1 luglio 2026."},{livello:3,titolo:"Cosa Cambia per Te",contenuto:"412 euro di aumento medio mensile. Arretrati a oltre un milione di lavoratori entro l'estate 2026."}],
      tag: ['contratto','aumento stipendi','412 euro'],
      link: 'https://www.mim.gov.it/web/guest/-/contratto-scuola-pienamente-efficace',
      is_pinned: true, is_archived: false
    },
    {
      titolo: 'Corte Costituzionale: abolito il limite dei 70 anni per il personale scolastico',
      descrizione: 'Sentenza storica: docenti e ATA possono restare in servizio fino alla pensione effettiva.',
      data_pubblicazione: '2026-07-14',
      fonte_nome: 'Orizzonte Scuola',
      fonte_url: 'https://www.orizzontescuola.it/docenti-corte-costituzionale-limite-70-anni/',
      fonte_livello: 'A', fonte_peso: 95,
      criticita: 'strategica', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti','ata','dirigenti'],
      categoria: 'Pensioni, Previdenza e Welfare',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Corte Costituzionale abolisce il limite dei 70 anni."},{livello:3,titolo:"Cosa Cambia per Te",contenuto:"Docenti e ATA possono restare in servizio fino alla pensione effettiva."}],
      tag: ['Corte Costituzionale','limite 70 anni','pensionamento'],
      link: 'https://www.orizzontescuola.it/docenti-corte-costituzionale-limite-70-anni/',
      is_pinned: true, is_archived: false
    },
    {
      titolo: 'Docenti Infanzia e Primaria: petizione per equiparazione stipendiale',
      descrizione: 'Depositata in Senato la petizione per equiparare lo stipendio Infanzia/Primaria a Secondaria e pensionamento a 62 anni.',
      data_pubblicazione: '2026-07-14',
      fonte_nome: 'Orizzonte Scuola',
      fonte_url: 'https://www.orizzontescuola.it/docenti-infanzia-e-primaria-stipendio/',
      fonte_livello: 'A', fonte_peso: 95,
      criticita: 'alta', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti'],
      categoria: 'Contratti, Salari e Personale ATA',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Petizione depositata in Senato per equiparazione stipendiale."},{livello:3,titolo:"Cosa Cambia per Te",contenuto:"Possibile equiparazione retributiva e pensionamento anticipato a 62 anni."}],
      tag: ['equiparazione','Infanzia','Primaria'],
      link: 'https://www.orizzontescuola.it/docenti-infanzia-e-primaria-stipendio/',
      is_pinned: false, is_archived: false
    },
    {
      titolo: 'Assegnazioni provvisorie 2026: Gilda avverte sugli errori nelle preferenze',
      descrizione: 'Craparo (Gilda): errori nelle preferenze compromettono la domanda. Prima preferenza fondamentale.',
      data_pubblicazione: '2026-07-14',
      fonte_nome: 'Orizzonte Scuola',
      fonte_url: 'https://www.orizzontescuola.it/assegnazioni-provvisorie-gilda-preferenze/',
      fonte_livello: 'A', fonte_peso: 95,
      criticita: 'strategica', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti'],
      categoria: 'Mobilità, Assegnazioni e Utilizzazioni',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Gilda Docenti avverte: errori nelle preferenze compromettono la domanda."}],
      tag: ['assegnazioni provvisorie','preferenze','Gilda'],
      link: 'https://www.orizzontescuola.it/assegnazioni-provvisorie-gilda-preferenze/',
      is_pinned: false, is_archived: false
    },
    {
      titolo: 'Assegnazioni provvisorie docenti 2026: indicazioni MIM sulla prima preferenza',
      descrizione: 'MIM pubblica indicazioni ufficiali sulla compilazione della prima preferenza.',
      data_pubblicazione: '2026-07-14',
      fonte_nome: 'Orizzonte Scuola',
      fonte_url: 'https://www.orizzontescuola.it/assegnazioni-provvisorie-2026-prima-preferenza/',
      fonte_livello: 'A', fonte_peso: 95,
      criticita: 'strategica', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti'],
      categoria: 'Mobilità, Assegnazioni e Utilizzazioni',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"MIM pubblica indicazioni sulla compilazione della prima preferenza."}],
      tag: ['prima preferenza','assegnazioni provvisorie'],
      link: 'https://www.orizzontescuola.it/assegnazioni-provvisorie-2026-prima-preferenza/',
      is_pinned: false, is_archived: false
    },
    {
      titolo: 'Gruppo supporto PNRR: selezione 70 docenti e ATA',
      descrizione: 'Bando per 70 posizioni nei gruppi di supporto PNRR. Domande su Istanze Online.',
      data_pubblicazione: '2026-07-14',
      fonte_nome: 'Orizzonte Scuola',
      fonte_url: 'https://www.orizzontescuola.it/gruppo-supporto-pnrr-selezione-70/',
      fonte_livello: 'A', fonte_peso: 90,
      criticita: 'alta', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti','ata'],
      categoria: 'Bandi, Concorsi e Selezioni',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Bando per 70 posizioni nei gruppi di supporto PNRR."}],
      tag: ['PNRR','selezione','Istanze Online'],
      link: 'https://www.orizzontescuola.it/gruppo-supporto-pnrr-selezione-70/',
      is_pinned: false, is_archived: false
    },
    {
      titolo: 'Assegnazione provvisoria 2026/27: GPS sostegno trattate in subordine',
      descrizione: 'Domande assegnazione provvisoria GPS sostegno trattate in subordine rispetto a docenti non di sostegno.',
      data_pubblicazione: '2026-07-14',
      fonte_nome: 'Orizzonte Scuola',
      fonte_url: 'https://www.orizzontescuola.it/assegnazione-provvisoria-gps-sostegno-subordine/',
      fonte_livello: 'A', fonte_peso: 90,
      criticita: 'alta', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti','sostegno'],
      categoria: 'Mobilità, Assegnazioni e Utilizzazioni',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Regola MIM: assegnazioni provvisorie GPS sostegno in subordine."}],
      tag: ['sostegno','GPS','assegnazioni provvisorie'],
      link: 'https://www.orizzontescuola.it/assegnazione-provvisoria-gps-sostegno-subordine/',
      is_pinned: false, is_archived: false
    },
    {
      titolo: 'UNESCO: le Consulte studentesche italiane al Comitato di alto livello',
      descrizione: 'Il Ministro Valditara celebra la partecipazione delle Consulte studentesche italiane ai lavori del Comitato UNESCO.',
      data_pubblicazione: '2026-07-10',
      fonte_nome: 'MIM',
      fonte_url: 'https://www.mim.gov.it/web/guest/-/unesco-consulte-studentesche',
      fonte_livello: 'A', fonte_peso: 100,
      criticita: 'media', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti','dirigenti','studenti'],
      categoria: 'Didattica, Formazione e Innovazione',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Consulte studentesche italiane partecipano per la prima volta al Comitato UNESCO."}],
      tag: ['UNESCO','Consulte studentesche','Valditara'],
      link: 'https://www.mim.gov.it/web/guest/-/unesco-consulte-studentesche',
      is_pinned: false, is_archived: false
    },
    {
      titolo: 'Italia-Grecia bilaterale istruzione: rafforzata la collaborazione',
      descrizione: 'Bilaterale Italia-Grecia su istruzione e formazione. Scambi accademici intensificati.',
      data_pubblicazione: '2026-07-09',
      fonte_nome: 'MIM',
      fonte_url: 'https://www.mim.gov.it/web/guest/-/italia-grecia-bilaterale',
      fonte_livello: 'A', fonte_peso: 100,
      criticita: 'media', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti','dirigenti'],
      categoria: 'Didattica, Formazione e Innovazione',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Bilaterale Italia-Grecia su istruzione firmata ad Atene."}],
      tag: ['bilaterale','Grecia','cooperazione'],
      link: 'https://www.mim.gov.it/web/guest/-/italia-grecia-bilaterale',
      is_pinned: false, is_archived: false
    },
    {
      titolo: 'Percorso triennale MIM-INDIRE educazione digitale',
      descrizione: 'Percorso triennale sull\'educazione digitale MIM-INDIRE. Valditara: uso corretto dei social fondamentale.',
      data_pubblicazione: '2026-07-06',
      fonte_nome: 'MIM',
      fonte_url: 'https://www.mim.gov.it/web/guest/-/percorso-educazione-digitale',
      fonte_livello: 'A', fonte_peso: 100,
      criticita: 'alta', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti','studenti','genitori'],
      categoria: 'Didattica, Formazione e Innovazione',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Percorso triennale MIM-INDIRE sull'educazione digitale avviato."}],
      tag: ['educazione digitale','INDIRE','social'],
      link: 'https://www.mim.gov.it/web/guest/-/percorso-educazione-digitale',
      is_pinned: false, is_archived: false
    },
    {
      titolo: 'Piano Casa: priorità al personale scolastico per il welfare',
      descrizione: 'Piano Casa con priorità per docenti e ATA. Agevolazioni abitative per sedi disagiate.',
      data_pubblicazione: '2026-06-19',
      fonte_nome: 'MIM',
      fonte_url: 'https://www.mim.gov.it/web/guest/-/piano-casa-priorita-scolastico',
      fonte_livello: 'A', fonte_peso: 100,
      criticita: 'alta', impatto: 'nazionale', platea: 'ampia',
      target: ['docenti','ata'],
      categoria: 'Contratti, Salari e Personale ATA',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"Piano Casa con priorità per personale scolastico."}],
      tag: ['Piano Casa','welfare','abitazione'],
      link: 'https://www.mim.gov.it/web/guest/-/piano-casa-priorita-scolastico',
      is_pinned: false, is_archived: false
    },
    {
      titolo: 'Personale scolastico all\'estero: procedure trasferimenti 2026/27',
      descrizione: 'MAECI prepara avvisi per trasferimenti personale scolastico italiano all\'estero per a.s. 2026/27.',
      data_pubblicazione: '2026-07-13',
      fonte_nome: 'Orizzonte Scuola',
      fonte_url: 'https://www.orizzontescuola.it/scuole-estero-mobilita-2026-27/',
      fonte_livello: 'A', fonte_peso: 85,
      criticita: 'media', impatto: 'nazionale', platea: 'limitata',
      target: ['docenti','ata'],
      categoria: 'Mobilità, Assegnazioni e Utilizzazioni',
      produzione_livelli: [{livello:1,titolo:"Il Fatto",contenuto:"MAECI prepara avvisi per trasferimenti all'estero 2026/27."}],
      tag: ['scuole estero','MAECI','trasferimenti'],
      link: 'https://www.orizzontescuola.it/scuole-estero-mobilita-2026-27/',
      is_pinned: false, is_archived: false
    },
  ];

  console.log(`Inserting ${news.length} news...`);
  const r1 = await upsert('intelligence_news', news);
  console.log('News result:', r1);

  const scadenze = [
    {
      titolo: 'Assegnazioni provvisorie 2026/27 - Domande online',
      descrizione: 'Compilazione e invio domande assegnazione provvisoria per a.s. 2026/27 su Istanze Online.',
      normativa: 'OM 88/2024, CCNI Mobilità 2024/2027',
      soggetti_coinvolti: ['docenti'],
      data_scadenza: '2026-07-31',
      priorita: 'strategica', impatto: 'nazionale',
      conseguenze_non_azione: 'Perdita anno di mobilità.',
      link: 'https://www.orizzontescuola.it/assegnazioni-provvisorie-2026-27/',
      tipo: 'Mobilità del Personale Scolastico',
      guida_operativa: 'Compilare preferenze con coerenza rispetto al punteggio.',
      regione: ''
    },
    {
      titolo: 'Utilizzazioni 2026/27 - Domande online',
      descrizione: 'Domande utilizzazione per a.s. 2026/27 su Istanze Online. Per docenti con 10+ anni di servizio.',
      normativa: 'OM 88/2024, Art. 39',
      soggetti_coinvolti: ['docenti'],
      data_scadenza: '2026-07-31',
      priorita: 'strategica', impatto: 'nazionale',
      conseguenze_non_azione: 'Impossibilità ottenere utilizzazione.',
      link: 'https://www.orizzontescuola.it/utilizzazioni-2026-27/',
      tipo: 'Mobilità del Personale Scolastico',
      guida_operativa: 'Verificare requisiti 10+ anni servizio.',
      regione: ''
    },
    {
      titolo: 'Gruppo supporto PNRR - Selezione 70',
      descrizione: 'Selezione 70 posizioni gruppi supporto PNRR.',
      normativa: 'Bando MIM 2026',
      soggetti_coinvolti: ['docenti','ata'],
      data_scadenza: '2026-08-15',
      priorita: 'alta', impatto: 'nazionale',
      conseguenze_non_azione: 'Mancata partecipazione ruoli PNRR.',
      link: 'https://www.orizzontescuola.it/gruppo-supporto-pnrr-selezione-70/',
      tipo: 'Iscrizioni, Bandi e Concorsi pubblici',
      guida_operativa: 'Domanda su Istanze Online entro scadenza.',
      regione: ''
    },
    {
      titolo: 'Trasferimenti estero 2026/27 - Avvisi MAECI',
      descrizione: 'MAECI pubblicherà avvisi trasferimenti personale scolastico all\'estero.',
      normativa: 'DPR 122/2013',
      soggetti_coinvolti: ['docenti','ata'],
      data_scadenza: '2026-09-15',
      priorita: 'media', impatto: 'nazionale',
      conseguenze_non_azione: 'Mancata domanda trasferimento estero.',
      link: 'https://www.orizzontescuola.it/scuole-estero-mobilita-2026-27/',
      tipo: 'Mobilità del Personale Scolastico',
      guida_operativa: 'Monitorare sito MAECI.',
      regione: ''
    },
  ];

  console.log(`Inserting ${scadenze.length} scadenze...`);
  const r2 = await upsert('intelligence_scadenze', scadenze);
  console.log('Scadenze result:', r2);

  console.log('DONE!');
}

main().catch(e => { console.error(e); process.exit(1); });
