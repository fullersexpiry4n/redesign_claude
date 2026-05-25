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
    lot: '0142', type: 'Table lamp', title: 'Modello 2128',
    maison: 'STILNOVO', maisonName: 'Stilnovo', city: 'Milano', year: 1962,
    designer: 'Bruno Gatta', attribution: 'Attributed to', price: 2400,
    shadeTone: '#E8E1D2',
    desc: 'Carrara marble base, burnished brass stem, opaline glass diffuser. Original Stilnovo label present under the base. In production between 1962 and 1968. Wiring replaced; CE compliant; E14 bulb included.',
    meta: { 'Period': '1962', 'Materials': 'marble, brass, opaline', 'Dimensions': 'h 38 · ø 22 cm', 'Wiring': 'replaced, CE compliant', 'Label': 'original present', 'Condition': 'excellent' },
    provenance: [{ label: 'Milan, c. 1962' }, { label: 'Private collection, Lombardy' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0086', type: 'Pendant', title: 'Modello 2097/50',
    maison: 'ARTELUCE', maisonName: 'Arteluce', city: 'Milano', year: 1958,
    designer: 'Gino Sarfatti', attribution: 'Design by', price: 12800,
    shadeTone: '#D9D2C2',
    desc: 'The 2097 is Sarfatti\'s most recognisable voice — fifty lamp-holders in satin brass, mounted on a central disc that floats above any room. This specimen is in original Arteluce production; the arms are intact, wiring is CE compliant.',
    meta: { 'Period': '1958', 'Materials': 'satin brass, steel', 'Dimensions': 'ø 150 cm · h 60 cm', 'Wiring': 'replaced, CE compliant', 'Condition': 'excellent' },
    provenance: [{ label: 'Milan, c. 1958' }, { label: 'Architecture studio, Bologna', unknown: true }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0014', type: 'Table lamp', title: 'Vetro a incalmo',
    maison: 'MAZZEGA', maisonName: 'Mazzega', city: 'Murano', year: 1971,
    designer: 'Carlo Nason', attribution: 'Attributed to', price: 3200,
    shadeTone: '#EFEAD8',
    desc: 'Murano blown glass diffuser in incalmo technique — two glasses worked separately at identical temperatures, then joined hot, creating the characteristic colour band at the junction. Amber on white opaline. Burnished brass base.',
    meta: { 'Period': '1971', 'Materials': 'incalmo glass, brass', 'Dimensions': 'h 42 · ø 28 cm', 'Wiring': 'replaced, CE compliant', 'Condition': 'very good' },
    provenance: [{ label: 'Murano, c. 1971' }, { label: 'Antique market, Vicenza' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0231', type: 'Floor lamp', title: 'Modello 387',
    maison: 'O‑LUCE', maisonName: 'O‑Luce', city: 'Milano', year: 1974,
    designer: 'Vico Magistretti', attribution: 'Design by', price: 5400,
    shadeTone: '#E2DBC9',
    desc: 'Height-adjustable floor lamp with white lacquered steel stem and conical metal diffuser. The structural simplicity of the 387 is its position — light as room architecture, never as gesture. Three documented owners.',
    meta: { 'Period': '1974', 'Materials': 'steel, lacquered metal', 'Dimensions': 'h 160 — 210 cm · ø 35 cm', 'Wiring': 'replaced, CE compliant', 'Condition': 'very good' },
    provenance: [{ label: 'Milan, c. 1974' }, { label: 'Private collection, Turin' }, { label: 'Private collection, Genoa' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0307', type: 'Wall lamp', title: 'Vetro opalino',
    maison: 'STILNOVO', maisonName: 'Stilnovo', city: 'Milano', year: 1965,
    designer: '—', attribution: 'Manufacturer', price: 1800,
    shadeTone: '#EBE5D2',
    desc: 'Wall lamp with white opaline glass diffuser on burnished brass arm. Manufacturer label present on the mount. Stilnovo manufacture piece, with no certain attribution to a single designer.',
    meta: { 'Period': '1965', 'Materials': 'opaline glass, brass', 'Dimensions': 'l 32 · h 18 · d 22 cm', 'Wiring': 'replaced, CE compliant', 'Label': 'manufacturer present', 'Condition': 'excellent' },
    provenance: [{ label: 'Milan, c. 1965' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0412', type: 'Pendant', title: 'Murano, fascia rossa',
    maison: 'VISTOSI', maisonName: 'Vistosi', city: 'Murano', year: 1973,
    designer: 'Alessandro Pianon', attribution: 'Attributed to', price: 2900,
    shadeTone: '#E5DECC',
    desc: 'Murano blown glass pendant with characteristic red band at the base of the diffuser — a rare chromatic variant in the Vistosi production of the Seventies. Attributed to Alessandro Pianon on the basis of stylistic comparison with signed pieces of the period.',
    meta: { 'Period': '1973', 'Materials': 'Murano blown glass', 'Dimensions': 'ø 38 cm · h diffuser 30 cm', 'Wiring': 'replaced, CE compliant', 'Condition': 'excellent' },
    provenance: [{ label: 'Murano, c. 1973' }, { label: 'Private collection, Venice' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0198', type: 'Table lamp', title: 'Eclisse',
    maison: 'ARTEMIDE', maisonName: 'Artemide', city: 'Milano', year: 1965,
    designer: 'Vico Magistretti', attribution: 'Design by', price: 1650,
    shadeTone: '#DDD7C5',
    desc: 'The rotating inner sphere is the mechanism that regulates the light beam — light itself as a design variable, not as an effect. Specimen in original white lacquer, perfectly functional. Compasso d\'Oro 1967.',
    meta: { 'Period': '1965', 'Materials': 'lacquered metal', 'Dimensions': 'ø 18 cm', 'Wiring': 'original, CE compliant', 'Award': "Compasso d'Oro 1967", 'Condition': 'very good' },
    provenance: [{ label: 'Milan, c. 1965' }, { label: 'Private collection, Milan' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0055', type: 'Pendant', title: 'Modello 1063 / 100',
    maison: 'ARTELUCE', maisonName: 'Arteluce', city: 'Milano', year: 1954,
    designer: 'Gino Sarfatti', attribution: 'Design by', price: 8400,
    shadeTone: '#D4CEBC',
    desc: 'One hundred lamp-holders on a burnished steel wire structure — Sarfatti\'s dematerialised grammar in its most complete form. Original Arteluce production, 1954. Purchase documentation in a Milanese private archive.',
    meta: { 'Period': '1954', 'Materials': 'burnished steel, glass', 'Dimensions': 'ø 120 cm · h 80 cm', 'Wiring': 'replaced, CE compliant', 'Condition': 'excellent' },
    provenance: [{ label: 'Milan, c. 1954' }, { label: 'Private archive, Milan' }, { label: 'Returned, 2026' }],
  },
  {
    lot: '0389', type: 'Table lamp', title: 'Pipistrello',
    maison: 'MARTINELLI LUCE', maisonName: 'Martinelli Luce', city: 'Lucca', year: 1965,
    designer: 'Gae Aulenti', attribution: 'Design by', price: 2100,
    shadeTone: '#E6E0CF',
    desc: 'The Pipistrello is the Italian tailored grammar of the table lamp — telescopic stem, opaline chalice diffuser, lacquered base. This specimen is in the original white/orange version. Still in production; this is a piece from the Seventies.',
    meta: { 'Period': '1965', 'Materials': 'metal, opaline glass', 'Dimensions': 'h 62 — 86 cm · ø 55 cm', 'Wiring': 'replaced, CE compliant', 'Condition': 'good' },
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
  { name: 'Stilnovo',        city: 'Milano',  dates: '1946 — 1989',   count: 12, bio: 'Founded by Bruno Gatta in Milan in 1946. The tailored response to Sarfatti\'s vocabulary — brass, marble, opaline. The Stilnovo label is the most reliable authenticity document in the Italian market.' },
  { name: 'Arteluce',        city: 'Milano',  dates: '1939 — 1973',   count: 9,  bio: 'Gino Sarfatti\'s workshop. Each piece carries a model number, not a trade name. The dematerialisation of structure as an aesthetic position.' },
  { name: 'Arredoluce',      city: 'Monza',   dates: '1943 — 1980',   count: 6,  bio: 'A Monza house with a production of table lamps and floor lamps that does not seek the gesture, but seeks proportion.' },
  { name: 'Flos',            city: 'Brescia', dates: '1962 — present', count: 8, bio: 'Founded in 1962 by Dino Gavina and Cesare Cassina to bring the Castiglioni brothers\' designs into production. The Arco and the Taccia were released in the same founding year.' },
  { name: 'O‑Luce',          city: 'Milano',  dates: '1945 — present', count: 7, bio: 'Milanese house with a catalogue that includes Magistretti, Joe Colombo, Rodolfo Bonetto. Light as architecture, not as decoration.' },
  { name: 'Fontana Arte',    city: 'Milano',  dates: '1932 — present', count: 5, bio: 'Born as Gio Ponti\'s glass division for La Rinascente. Blown glass and cut crystal are the primary material.' },
  { name: 'Martinelli Luce', city: 'Lucca',   dates: '1950 — present', count: 4, bio: 'Tuscan house known for Gae Aulenti\'s Pipistrello (1965) and a production of lacquered metal lamps from the Seventies.' },
  { name: 'Mazzega',         city: 'Murano',  dates: '1946 — 1992',   count: 11, bio: 'Murano furnace that worked with Carlo Nason in the Sixties and Seventies. Incalmo and subaqueous glass define their vocabulary.' },
  { name: 'Vistosi',         city: 'Murano',  dates: '1945 — present', count: 6, bio: 'Murano furnace. Alessandro Pianon signed the Pulcini in 1962 — a series of zoomorphic figures in coloured glass that remain the house\'s most recognised piece.' },
  { name: 'Sciolari',        city: 'Roma',    dates: '1949 — 1985',   count: 4,  bio: 'Roman house with a production of elaborate brass and crystal chandeliers from the Sixties and Seventies. Less documented but with a growing market.' },
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
  { name: 'Gino Sarfatti',            years: '1912 — 1985', city: 'Venezia · Milano', maison: 'Arteluce',           pieces: 9,  bio: 'Founder of Arteluce in 1939; the unsurpassed grammar of Italian lighting. His inventories number every fitting — Model 1063, Model 2097 — and refuse the metaphor of the lamp as ornament.' },
  { name: 'Bruno Gatta',              years: '1908 — 1976', city: 'Milano',            maison: 'Stilnovo',           pieces: 7,  bio: 'Founded Stilnovo in 1946. The 2128 (1962) is the tailored response to Sarfatti — brass collar, marble plinth, opaline diffuser — selected like fabrics.' },
  { name: 'Vico Magistretti',         years: '1920 — 2006', city: 'Milano',            maison: 'O‑Luce · Artemide',  pieces: 6,  bio: 'Architect-designer; the Eclisse (1965) and the Mod. 387 floor lamp (1974). Light as room architecture, never as gesture.' },
  { name: 'Achille Castiglioni',      years: '1918 — 2002', city: 'Milano',            maison: 'Flos',               pieces: 5,  bio: 'With his brother Pier Giacomo, the Arco (1962) and the Taccia (1962). Wit and engineering held in the same hand.' },
  { name: 'Tobia Scarpa',             years: '1935 — ',     city: 'Venezia',           maison: 'Flos · Venini',      pieces: 3,  bio: 'Son of a Murano glassmaker. Author of the Biagio (1968) and the Fantasma (1961). Mass joined with light.' },
  { name: 'Gae Aulenti',              years: '1927 — 2012', city: 'Milano',            maison: 'Martinelli Luce',    pieces: 4,  bio: 'Museum architect. The Pipistrello (1965) — telescopic floor lamp, opaline diffuser, lacquered base — codified an Italian vocabulary still in production.' },
  { name: 'Joe Colombo',              years: '1930 — 1971', city: 'Milano',            maison: 'O‑Luce',             pieces: 4,  bio: 'Designer of the Spider (1965) and the Coupé (1967). Engineered geometry, short life, lasting voice.' },
  { name: 'Carlo Nason',              years: '1935 — 2020', city: 'Murano',            maison: 'Mazzega',            pieces: 5,  bio: 'Murano glassmaker working in incalmo and submerged colour. The Mazzega line of the early Seventies.' },
  { name: 'Alessandro Pianon',        years: '1931 — 1984', city: 'Venezia · Murano',  maison: 'Vistosi',            pieces: 3,  bio: 'Glass and architecture; the Pulcini series (1962) and a body of pendants for Vistosi.' },
  { name: 'Pier Giacomo Castiglioni', years: '1913 — 1968', city: 'Milano',            maison: 'Flos',               pieces: 3,  bio: 'With his younger brother Achille, the conscience and the joint of the Castiglioni studio.' },
];

export const QUADERNO_ARTICLES = [
  {
    n: '003',
    readTime: '12',
    title: 'The Stilnovo–Arteluce rivalry, 1958–1965',
    body: [
      'Bruno Gatta designed model 2128 during the period when Stilnovo was consolidating itself as the principal Milanese alternative to Arteluce. The decade between 1958 and 1965 produced the most photographed pieces of both houses — and the deepest divergence in their respective philosophies of light.',
      'While Sarfatti\'s Arteluce pursued a dematerialised armature — objects of light that almost refused to be objects — Stilnovo instead committed to a tailored junction: brass collars, marble plinths, opaline diffusers selected like fabrics.',
    ],
    dropLetter: 'B',
  },
  {
    n: '002',
    readTime: '8',
    title: 'Incalmo: technique and market',
    body: [
      'The incalmo technique — two glasses worked separately at identical temperatures, then joined hot — produces the characteristic colour band that visually separates the two bodies of the diffuser. It is not decoration: it is the visible trace of the process.',
      'In the current market, Mazzega incalmo pieces from the Seventies are among the best documented of post-war Murano production.',
    ],
    dropLetter: 'T',
  },
  {
    n: '001',
    readTime: '6',
    title: 'Documentation and provenance: the dealer\'s method',
    body: [
      'The dealer\'s work is to document, not to narrate. Provenance is a chain of verifiable facts — each change of ownership, each restoration, each original label present or absent.',
      'Where the chain breaks, we say so. Honesty about provenance does not reduce the value of a piece: it protects it.',
    ],
    dropLetter: 'T',
  },
];
