export type ProvenanceStop = {
  label: string;
  unknown?: boolean;
};

export type Piece = {
  lot: string;
  type: string;
  title: string;
  maison: string;
  maisonName: string;
  city: string;
  year: number;
  designer: string;
  attribution: string;
  price: number;
  shadeTone: string;
  desc?: string;
  meta?: Record<string, string>;
  provenance?: ProvenanceStop[];
};

export const PIECES: Piece[] = [
  {
    lot: '0142', type: 'Lampada da tavolo', title: 'Modello 2128',
    maison: 'STILNOVO', maisonName: 'Stilnovo', city: 'Milano', year: 1962,
    designer: 'Bruno Gatta', attribution: 'Design attribuito a', price: 2400,
    shadeTone: '#E8E1D2',
    desc: 'Base in marmo di Carrara, stelo in ottone brunito, diffusore in vetro opalino. Etichetta Stilnovo originale presente sotto la base. In produzione tra il 1962 e il 1968. Cablatura sostituita; conforme CE; lampadina E14 inclusa.',
    meta: { 'Periodo': '1962', 'Materiali': 'marmo, ottone, opalino', 'Dimensioni': 'h 38 · ø 22 cm', 'Cablatura': 'sostituita, conforme CE', 'Etichetta': 'originale presente', 'Stato': 'eccellente' },
    provenance: [{ label: 'Milano, c. 1962' }, { label: 'Collezione privata, Lombardia' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0086', type: 'Sospensione', title: 'Modello 2097/50',
    maison: 'ARTELUCE', maisonName: 'Arteluce', city: 'Milano', year: 1958,
    designer: 'Gino Sarfatti', attribution: 'Design di', price: 12800,
    shadeTone: '#D9D2C2',
    desc: 'Il 2097 è la voce più riconoscibile di Sarfatti — cinquanta porte-lampadine in ottone satinato, montate su un disco centrale che galleggia sopra ogni stanza. Questo esemplare è in produzione originale Arteluce; le branche sono integre, il cablaggio è conforme CE.',
    meta: { 'Periodo': '1958', 'Materiali': 'ottone satinato, acciaio', 'Dimensioni': 'ø 150 cm · h 60 cm', 'Cablatura': 'sostituita, conforme CE', 'Stato': 'ottimo' },
    provenance: [{ label: 'Milano, c. 1958' }, { label: 'Studio di architettura, Bologna', unknown: true }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0014', type: 'Lampada da tavolo', title: 'Vetro a incalmo',
    maison: 'MAZZEGA', maisonName: 'Mazzega', city: 'Murano', year: 1971,
    designer: 'Carlo Nason', attribution: 'Attribuito a', price: 3200,
    shadeTone: '#EFEAD8',
    desc: 'Diffusore in vetro soffiato a Murano con tecnica incalmo — due vetri lavorati separatamente e uniti a caldo, creando la caratteristica fascetta di colore alla giunzione. Tono ambra su bianco opalino. Base in ottone brunito.',
    meta: { 'Periodo': '1971', 'Materiali': 'vetro incalmo, ottone', 'Dimensioni': 'h 42 · ø 28 cm', 'Cablatura': 'sostituita, conforme CE', 'Stato': 'molto buono' },
    provenance: [{ label: 'Murano, c. 1971' }, { label: 'Mercato antiquario, Vicenza' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0231', type: 'Piantana', title: 'Modello 387',
    maison: 'O‑LUCE', maisonName: 'O‑Luce', city: 'Milano', year: 1974,
    designer: 'Vico Magistretti', attribution: 'Design di', price: 5400,
    shadeTone: '#E2DBC9',
    desc: 'Piantana regolabile in altezza con stelo in acciaio verniciato bianco e diffusore conico in metallo. La semplicità strutturale del 387 è la sua posizione — la luce come architettura della stanza, mai come gesto. Tre proprietari documentati.',
    meta: { 'Periodo': '1974', 'Materiali': 'acciaio, metallo verniciato', 'Dimensioni': 'h 160 — 210 cm · ø 35 cm', 'Cablatura': 'sostituita, conforme CE', 'Stato': 'molto buono' },
    provenance: [{ label: 'Milano, c. 1974' }, { label: 'Collezione privata, Torino' }, { label: 'Collezione privata, Genova' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0307', type: 'Applique', title: 'Vetro opalino',
    maison: 'STILNOVO', maisonName: 'Stilnovo', city: 'Milano', year: 1965,
    designer: '—', attribution: 'Manifattura', price: 1800,
    shadeTone: '#EBE5D2',
    desc: 'Applique da parete con diffusore in vetro opalino bianco su braccio in ottone brunito. Etichetta manifattura presente sul supporto. Pezzo di manifattura Stilnovo, senza attribuzione certa a un singolo designer.',
    meta: { 'Periodo': '1965', 'Materiali': 'vetro opalino, ottone', 'Dimensioni': 'l 32 · h 18 · sporg. 22 cm', 'Cablatura': 'sostituita, conforme CE', 'Etichetta': 'manifattura presente', 'Stato': 'eccellente' },
    provenance: [{ label: 'Milano, c. 1965' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0412', type: 'Sospensione', title: 'Murano, fascia rossa',
    maison: 'VISTOSI', maisonName: 'Vistosi', city: 'Murano', year: 1973,
    designer: 'Alessandro Pianon', attribution: 'Attribuito a', price: 2900,
    shadeTone: '#E5DECC',
    desc: 'Sospensione in vetro soffiato di Murano con caratteristica fascia rossa alla base del diffusore — variante cromatica rara nella produzione Vistosi degli anni Settanta. Attribuita ad Alessandro Pianon sulla base di confronto stilistico con pezzi firmati del periodo.',
    meta: { 'Periodo': '1973', 'Materiali': 'vetro soffiato Murano', 'Dimensioni': 'ø 38 cm · h diffusore 30 cm', 'Cablatura': 'sostituita, conforme CE', 'Stato': 'ottimo' },
    provenance: [{ label: 'Murano, c. 1973' }, { label: 'Collezione privata, Venezia' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0198', type: 'Lampada da tavolo', title: 'Eclisse',
    maison: 'ARTEMIDE', maisonName: 'Artemide', city: 'Milano', year: 1965,
    designer: 'Vico Magistretti', attribution: 'Design di', price: 1650,
    shadeTone: '#DDD7C5',
    desc: 'La sfera interna ruotante è il meccanismo che regola il fascio luminoso — la luce stessa come variabile di progetto, non come effetto. Esemplare in laccato bianco originale, perfettamente funzionante. Premio Compasso d\'Oro 1967.',
    meta: { 'Periodo': '1965', 'Materiali': 'metallo laccato', 'Dimensioni': 'ø 18 cm', 'Cablatura': 'originale, conforme CE', 'Premio': 'Compasso d\'Oro 1967', 'Stato': 'molto buono' },
    provenance: [{ label: 'Milano, c. 1965' }, { label: 'Collezione privata, Milano' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0055', type: 'Sospensione', title: 'Modello 1063 / 100',
    maison: 'ARTELUCE', maisonName: 'Arteluce', city: 'Milano', year: 1954,
    designer: 'Gino Sarfatti', attribution: 'Design di', price: 8400,
    shadeTone: '#D4CEBC',
    desc: 'Cento porte-lampadine su struttura in filo di acciaio brunito — la grammatica dematerializzata di Sarfatti nella sua forma più completa. Produzione Arteluce originale, 1954. Documentazione di acquisto in archivio privato milanese.',
    meta: { 'Periodo': '1954', 'Materiali': 'acciaio brunito, vetro', 'Dimensioni': 'ø 120 cm · h 80 cm', 'Cablatura': 'sostituita, conforme CE', 'Stato': 'ottimo' },
    provenance: [{ label: 'Milano, c. 1954' }, { label: 'Archivio privato, Milano' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0389', type: 'Lampada da tavolo', title: 'Pipistrello',
    maison: 'MARTINELLI LUCE', maisonName: 'Martinelli Luce', city: 'Lucca', year: 1965,
    designer: 'Gae Aulenti', attribution: 'Design di', price: 2100,
    shadeTone: '#E6E0CF',
    desc: 'La Pipistrello è la grammatica sartoriale italiana della lampada da tavolo — stelo telescopico, diffusore opalino a calice, base laccata. Questo esemplare è nella versione originale bianco/arancio. Ancora in produzione; questo è un pezzo degli anni Settanta.',
    meta: { 'Periodo': '1965', 'Materiali': 'metallo, vetro opalino', 'Dimensioni': 'h 62 — 86 cm · ø 55 cm', 'Cablatura': 'sostituita, conforme CE', 'Stato': 'buono' },
    provenance: [{ label: 'Lucca, c. 1970s' }, { label: 'Returned, 2026' }],
  },
];

export type Maison = {
  name: string;
  city: string;
  dates: string;
  count: number;
  bio?: string;
};

export const MAISONS: Maison[] = [
  { name: 'Stilnovo',        city: 'Milano',  dates: '1946 — 1989',   count: 12, bio: 'Fondata da Bruno Gatta a Milano nel 1946. La risposta sartoriale alla grammatica di Sarfatti — ottone, marmo, opalino. L\'etichetta Stilnovo è il documento di autenticità più affidabile nel mercato italiano.' },
  { name: 'Arteluce',        city: 'Milano',  dates: '1939 — 1973',   count: 9,  bio: 'L\'officina di Gino Sarfatti. Ogni pezzo porta un numero di modello, non un nome di fantasia. La dematerializzazione della struttura come posizione estetica.' },
  { name: 'Arredoluce',      city: 'Monza',   dates: '1943 — 1980',   count: 6,  bio: 'Casa monzese con una produzione di lampade da tavolo e piantane che non cerca il gesto, cerca la proporzione.' },
  { name: 'Flos',            city: 'Brescia', dates: '1962 — present', count: 8, bio: 'Fondata nel 1962 da Dino Gavina e Cesare Cassina per portare in produzione i progetti dei fratelli Castiglioni. L\'Arco e la Taccia escono nello stesso anno di fondazione.' },
  { name: 'O‑Luce',          city: 'Milano',  dates: '1945 — present', count: 7, bio: 'Casa milanese con un catalogo che comprende Magistretti, Joe Colombo, Rodolfo Bonetto. La luce come architettura, non come decorazione.' },
  { name: 'Fontana Arte',    city: 'Milano',  dates: '1932 — present', count: 5, bio: 'Nata come divisione del vetro di Gio Ponti per La Rinascente. Il vetro soffiato e i cristalli molati sono la materia prima.' },
  { name: 'Martinelli Luce', city: 'Lucca',   dates: '1950 — present', count: 4, bio: 'Casa toscana nota per la Pipistrello di Gae Aulenti (1965) e per una produzione di lampade in metallo laccato degli anni Settanta.' },
  { name: 'Mazzega',         city: 'Murano',  dates: '1946 — 1992',   count: 11, bio: 'Fornace muranese che lavora con Carlo Nason negli anni Sessanta e Settanta. L\'incalmo e il vetro subacqueo definiscono la loro grammatica.' },
  { name: 'Vistosi',         city: 'Murano',  dates: '1945 — present', count: 6, bio: 'Fornace muranese. Alessandro Pianon firma i Pulcini nel 1962 — serie di figure zoomorfe in vetro colorato che restano il pezzo più riconoscibile della casa.' },
  { name: 'Sciolari',        city: 'Roma',    dates: '1949 — 1985',   count: 4,  bio: 'Casa romana con una produzione di lampadari elaborati in ottone e cristallo degli anni Sessanta e Settanta. Pezzo meno documentato ma con un mercato in crescita.' },
];

export type Designer = {
  name: string;
  years: string;
  city: string;
  maison: string;
  pieces: number;
  bio: string;
};

export const DESIGNERS: Designer[] = [
  { name: 'Gino Sarfatti',            years: '1912 — 1985', city: 'Venezia · Milano', maison: 'Arteluce',           pieces: 9,  bio: 'Fondatore di Arteluce nel 1939; la grammatica insuperata dell\'illuminazione italiana. I suoi inventari numerano ogni attacco — Modello 1063, Modello 2097 — e rifiutano la metafora della lampada come ornamento.' },
  { name: 'Bruno Gatta',              years: '1908 — 1976', city: 'Milano',            maison: 'Stilnovo',           pieces: 7,  bio: 'Fondò Stilnovo nel 1946. Il 2128 (1962) è la risposta sartoriale a Sarfatti — collare in ottone, plinto in marmo, diffusore in opalino — selezionati come stoffe.' },
  { name: 'Vico Magistretti',         years: '1920 — 2006', city: 'Milano',            maison: 'O‑Luce · Artemide',  pieces: 6,  bio: 'Architetto-designer; l\'Eclisse (1965) e la piantana Mod. 387 (1974). La luce come architettura della stanza, mai come gesto.' },
  { name: 'Achille Castiglioni',      years: '1918 — 2002', city: 'Milano',            maison: 'Flos',               pieces: 5,  bio: 'Con il fratello Pier Giacomo, l\'Arco (1962) e la Taccia (1962). Il wit e l\'ingegneria tenuti nella stessa mano.' },
  { name: 'Tobia Scarpa',             years: '1935 — ',     city: 'Venezia',           maison: 'Flos · Venini',      pieces: 3,  bio: 'Figlio di vetraio muranese. Autore della Biagio (1968) e della Fantasma (1961). La massa coniugata con la luce.' },
  { name: 'Gae Aulenti',              years: '1927 — 2012', city: 'Milano',            maison: 'Martinelli Luce',    pieces: 4,  bio: 'Architetto di musei. La Pipistrello (1965) — piantana telescopica, diffusore opalino, base laccata — ha codificato una grammatica italiana ancora in produzione.' },
  { name: 'Joe Colombo',              years: '1930 — 1971', city: 'Milano',            maison: 'O‑Luce',             pieces: 4,  bio: 'Designer della Spider (1965) e della Coupé (1967). Geometria ingegnerizzata, vita breve, voce duratura.' },
  { name: 'Carlo Nason',              years: '1935 — 2020', city: 'Murano',            maison: 'Mazzega',            pieces: 5,  bio: 'Vetraio muranese che lavora in incalmo e colore sommerso. La linea Mazzega dei primi anni Settanta.' },
  { name: 'Alessandro Pianon',        years: '1931 — 1984', city: 'Venezia · Murano',  maison: 'Vistosi',            pieces: 3,  bio: 'Vetro e architettura; la serie Pulcini (1962) e un corpo di sospensioni per Vistosi.' },
  { name: 'Pier Giacomo Castiglioni', years: '1913 — 1968', city: 'Milano',            maison: 'Flos',               pieces: 3,  bio: 'Con il fratello minore Achille, la coscienza e la giunzione dello studio Castiglioni.' },
];

export const QUADERNO_ARTICLES = [
  {
    n: '003',
    readTime: '12',
    title: 'La rivalità Stilnovo – Arteluce, 1958 – 1965',
    body: [
      'Bruno Gatta progettò il modello 2128 nel periodo in cui Stilnovo si stava consolidando come la principale alternativa milanese ad Arteluce. Il decennio tra il 1958 e il 1965 produsse i pezzi più fotografati delle due case — e la deriva più profonda nelle loro rispettive filosofie della luce.',
      'Mentre l\'Arteluce di Sarfatti perseguiva un\'armatura dematerializzata — oggetti di luce che quasi si rifiutavano di essere oggetti — Stilnovo si impegnava invece in una giunzione sartoriale: collari in ottone, plinti in marmo, diffusori in opalino selezionati come stoffe.',
    ],
    dropLetter: 'B',
  },
  {
    n: '002',
    readTime: '8',
    title: 'L\'incalmo: tecnica e mercato',
    body: [
      'La tecnica dell\'incalmo — due vetri lavorati separatamente a temperature identiche, poi uniti a caldo — produce la caratteristica fascetta di colore che separa visivamente i due corpi del diffusore. Non è decorazione: è la traccia visibile del processo.',
      'Nel mercato attuale, i pezzi Mazzega in incalmo degli anni Settanta sono tra i meglio documentati della produzione muranese post-bellica.',
    ],
    dropLetter: 'L',
  },
  {
    n: '001',
    readTime: '6',
    title: 'Documentazione e provenienza: il metodo del dealer',
    body: [
      'Il lavoro del dealer è documentare, non raccontare. La provenienza è una catena di fatti verificabili — ogni passaggio di proprietà, ogni restauro, ogni etichetta originale presente o assente.',
      'Dove la catena si spezza, lo diciamo. L\'onestà sulla provenienza non riduce il valore di un pezzo: lo protegge.',
    ],
    dropLetter: 'I',
  },
];
