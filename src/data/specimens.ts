import { Lang } from '@/i18n/translations';

export type SilhouetteKind = 'tote' | 'wallet' | 'satchel' | 'belt' | 'brief' | 'book' | 'jacket';
export type GrainKind = 'FINE' | 'MEDIUM' | 'COARSE' | 'RAW' | 'MIXED';
export type OriginKind = 'TUSCANY' | 'ANDALUSIA' | 'MOROCCO' | 'KYOTO' | 'ARCHIVE_UNKNOWN';
export type SpanKind = 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's9';

// Landing page specimens
export interface LandingSpecimen {
  id: string;
  sn: string;
  idx: string;
  span: SpanKind;
  name: Record<Lang, string>;
  sub: Record<Lang, string>;
  quote: Record<Lang, string>;
  spec: {
    tan: string;
    grain: string;
    origin: string;
    finish: string;
    weight: string;
    edge: string;
    cert: string;
  };
  meta: [string, string][];
  silhouette: SilhouetteKind;
}

export const LANDING_SPECIMENS: LandingSpecimen[] = [
  {
    id: '01',
    sn: 'LA·001·2099',
    idx: '01',
    span: 's1',
    name: { EN: 'Tbilisi Tote', KA: 'თბილისის ტომარა', RU: 'Тбилисский тоут' },
    sub: {
      EN: 'A vegetable-tanned daily carry, edge-painted by hand and stamped with vault coordinates.',
      KA: 'მცენარეულად თრიმული ყოველდღიური ჩანთა, ხელით შეღებილი კიდით და სარდაფის კოორდინატებით.',
      RU: 'Растительно-дубленая повседневная сумка, край окрашен вручную, со штампом координат.',
    },
    quote: {
      EN: 'A hide is a manuscript; the tannin is the ink.',
      KA: 'ტყავი ხელნაწერია; ტანინი — მელანი.',
      RU: 'Шкура — рукопись; танин — чернила.',
    },
    spec: {
      tan: '21d · veg, mimosa',
      grain: '6.9 fibers / mm² · full',
      origin: 'Kakheti · Δ-011',
      finish: '118 hrs · hand-burnish',
      weight: '540 g · ±5',
      edge: 'painted · 3 coats',
      cert: 'LA·CRT·2099·001',
    },
    meta: [
      ['TAN', 'VEG · 21D'],
      ['GRM', '540'],
      ['ORG', 'Δ-011'],
    ],
    silhouette: 'tote',
  },
  {
    id: '02',
    sn: 'LA·002·2099',
    idx: '02',
    span: 's2',
    name: { EN: 'Mtkvari Wallet', KA: 'მტკვრის საფულე', RU: 'Кошелёк Мтквари' },
    sub: {
      EN: 'Bifold wallet from a single shell. Skived to 1.1mm at the fold; saddle-stitched in waxed linen.',
      KA: 'ერთიანი ნაჭრისგან ბიფოლდი საფულე. დაკეცვაზე 1.1მმ-მდე გათხელებული; ცვილიანი ნაკერით.',
      RU: 'Бифолд из одной детали. Снята до 1,1 мм по сгибу; сшит вощёным льном.',
    },
    quote: {
      EN: 'Stitched once. Carried always.',
      KA: 'ერთხელ გაკერილი. სამუდამოდ.',
      RU: 'Сшит однажды. Носится всегда.',
    },
    spec: {
      tan: '14d · veg',
      grain: '7.2 fibers / mm² · full',
      origin: 'Mtskheta · Δ-008',
      finish: '54 hrs',
      weight: '96 g · ±2',
      edge: 'slicked',
      cert: 'LA·CRT·2099·002',
    },
    meta: [
      ['TAN', 'VEG · 14D'],
      ['GRM', '096'],
      ['ORG', 'Δ-008'],
    ],
    silhouette: 'wallet',
  },
  {
    id: '03',
    sn: 'LA·003·2099',
    idx: '03',
    span: 's3',
    name: { EN: 'Carrara//Steed', KA: 'კარარა//მერანი', RU: 'Каррара//Конь' },
    sub: {
      EN: 'A full-grain shell from the Tuscan corridor. Twenty-eight days in the pit, hand-burnished.',
      KA: 'სრული ბოჭკოს ნაჭერი ტოსკანის დერეფნიდან. ოცდარვა დღე ორმოში, ხელით გაპრიალებული.',
      RU: 'Полнозернистый раккорд из тосканского коридора. Двадцать восемь дней в яме, ручная полировка.',
    },
    quote: {
      EN: 'Patience is the eighth tannin.',
      KA: 'მოთმინება — მერვე ტანინი.',
      RU: 'Терпение — восьмой танин.',
    },
    spec: {
      tan: '28d · veg, mimosa',
      grain: '7.4 fibers / mm² · full',
      origin: 'Kakheti · Δ-014',
      finish: '142 hrs · hand-burnish',
      weight: '684 g · ±6',
      edge: 'painted · 4 coats',
      cert: 'LA·CRT·2099·003',
    },
    meta: [
      ['TAN', 'VEG · 28D'],
      ['GRM', '684'],
      ['ORG', 'Δ-014'],
    ],
    silhouette: 'satchel',
  },
  {
    id: '04',
    sn: 'LA·004·2099',
    idx: '04',
    span: 's4',
    name: { EN: 'Field Belt', KA: 'ველის ქამარი', RU: 'Полевой ремень' },
    sub: {
      EN: '34mm bridle leather, oil-pulled. Solid brass keeper, single tongue, edge-burnished raw.',
      KA: '34მმ აღკაზმის ტყავი, ზეთით გაჟღენთილი. მთლიანი თითბრი, ერთი ენა, კიდე ნედლი.',
      RU: 'Шорно-седельная кожа 34 мм, маслом. Латунный держатель, один язык, край сырой.',
    },
    quote: {
      EN: 'A belt outlives its wearer.',
      KA: 'ქამარი გადარჩება პატრონს.',
      RU: 'Ремень переживает своего владельца.',
    },
    spec: {
      tan: '35d · bridle',
      grain: '6.4 fibers / mm² · full',
      origin: 'Imereti · Δ-021',
      finish: '22 hrs',
      weight: '218 g · ±3',
      edge: 'raw · burnished',
      cert: 'LA·CRT·2099·004',
    },
    meta: [
      ['TAN', 'OIL · 35D'],
      ['GRM', '218'],
      ['ORG', 'Δ-021'],
    ],
    silhouette: 'belt',
  },
  {
    id: '05',
    sn: 'LA·005·2099',
    idx: '05',
    span: 's5',
    name: { EN: 'Archive Briefcase', KA: 'არქივის ჩემოდანი', RU: 'Архивный портфель' },
    sub: {
      EN: 'Saddle-stitched two-compartment briefcase. Drum-dyed in chocolate, lined in raw cotton.',
      KA: 'სასადილო ნაკერით ორ-განყოფილებიანი ჩემოდანი. შოკოლადით შეღებილი, ბამბის სარჩული.',
      RU: 'Двухсекционный портфель ручной сшивки. Барабанная окраска шоколад, подкладка хлопок.',
    },
    quote: {
      EN: 'It carries the year, not the day.',
      KA: 'ის ატარებს წელიწადს, არა დღეს.',
      RU: 'Носит год, а не день.',
    },
    spec: {
      tan: '32d · veg + drum',
      grain: '7.0 fibers / mm² · full',
      origin: 'Kakheti · Δ-014',
      finish: '196 hrs',
      weight: '1.42 kg · ±20',
      edge: 'painted · 5 coats',
      cert: 'LA·CRT·2099·005',
    },
    meta: [
      ['TAN', 'VEG · 32D'],
      ['GRM', '1420'],
      ['ORG', 'Δ-014'],
    ],
    silhouette: 'brief',
  },
  {
    id: '06',
    sn: 'LA·006·2099',
    idx: '06',
    span: 's6',
    name: { EN: 'Notebook 84', KA: 'რვეული 84', RU: 'Тетрадь 84' },
    sub: {
      EN: 'Hand-bound A5 leather notebook. 84 pages of tan card, blind-debossed sigil on the cover.',
      KA: 'ხელით აკინძული A5 ტყავის რვეული. 84 გვერდი, ბრმად დაბეჭდილი ნიშანი ყდაზე.',
      RU: 'A5 тетрадь в кожаном переплёте. 84 страницы тонированного картона, слепое тиснение на обложке.',
    },
    quote: {
      EN: 'Eighty-four blank specimens.',
      KA: 'ოთხმოცდაოთხი ცარიელი ნიმუში.',
      RU: 'Восемьдесят четыре пустых образца.',
    },
    spec: {
      tan: '18d · veg',
      grain: '7.1 fibers / mm² · full',
      origin: 'Mtskheta · Δ-008',
      finish: '38 hrs · blind-deboss',
      weight: '312 g · ±4',
      edge: 'raw',
      cert: 'LA·CRT·2099·006',
    },
    meta: [
      ['TAN', 'VEG · 18D'],
      ['GRM', '312'],
      ['ORG', 'Δ-008'],
    ],
    silhouette: 'book',
  },
];

// Vault specimens
export interface VaultSpecimen {
  i: number;
  cat: string;
  sn: string;
  name: string;
  sil: SilhouetteKind;
  tan: number;
  grain: GrainKind;
  origin: OriginKind;
  weight: number;
  coord: string;
  entry: string;
  price: number;
  span: SpanKind;
  quote: string;
  finish: string;
  editorial: string;
}

export const ORIGINS: OriginKind[] = ['TUSCANY', 'ANDALUSIA', 'MOROCCO', 'KYOTO', 'ARCHIVE_UNKNOWN'];
export const GRAINS: GrainKind[] = ['FINE', 'MEDIUM', 'COARSE', 'RAW', 'MIXED'];

export const TOTAL_SPECIMENS = 247;
export const IN_VAULT = 12;

export const VAULT_SPECIMENS: VaultSpecimen[] = [
  {
    i: 1, cat: 'bags', sn: 'LA·001·2099', name: 'BAG // PROTOCOL_07', sil: 'tote',
    tan: 148, grain: 'MEDIUM', origin: 'TUSCANY', weight: 540, coord: '41.71/44.83',
    entry: '2099.03.14', price: 1480, span: 's1',
    quote: 'A hide is a manuscript; the tannin is the ink.',
    finish: 'Hand-burnished, edge-painted',
    editorial: 'A daily tote born from Tuscan pastures, this specimen carries the warm amber of its origin in every fiber. The vegetable tannage is patient — mimosa bark, pit-soaked for twenty-one days. The result is a grain that deepens with use.',
  },
  {
    i: 2, cat: 'belts', sn: 'LA·002·2099', name: 'BELT // SPECIMEN_142', sil: 'belt',
    tan: 96, grain: 'COARSE', origin: 'ANDALUSIA', weight: 218, coord: '37.39/-5.99',
    entry: '2099.04.02', price: 340, span: 's3',
    quote: 'A belt outlives its wearer.',
    finish: 'Oil-pulled, raw edge',
    editorial: 'Sourced from the plains of Andalusia, this belt uses a deliberately coarse grain for texture and grip. Finished raw — no paint, no polish — it develops its own patina over months of wear.',
  },
  {
    i: 3, cat: 'wallets', sn: 'LA·003·2099', name: 'WALLET // ARCHIVE_03', sil: 'wallet',
    tan: 54, grain: 'FINE', origin: 'KYOTO', weight: 96, coord: '35.01/135.7',
    entry: '2099.04.18', price: 280, span: 's2',
    quote: 'Stitched once. Carried always.',
    finish: 'Saddle-stitched, slicked',
    editorial: 'A bifold wallet from a single shell, skived to 1.1mm at the fold and saddle-stitched with waxed linen. The Kyoto origin gives it a distinctly tight grain that resists scratching.',
  },
  {
    i: 4, cat: 'bags', sn: 'LA·004·2099', name: 'BAG // CARRARA_28', sil: 'satchel',
    tan: 192, grain: 'FINE', origin: 'TUSCANY', weight: 684, coord: '44.07/10.10',
    entry: '2099.05.04', price: 1980, span: 's2',
    quote: 'Patience is the eighth tannin.',
    finish: 'Hand-burnished, 4 coats edge',
    editorial: 'Twenty-eight days in the pit. The Carrara satchel is the longest tannage in the current cycle — a specimen of pure patience. Its fine Tuscan grain carries depth and warmth that shorter processes never achieve.',
  },
  {
    i: 5, cat: 'belts', sn: 'LA·005·2099', name: 'BELT // FIELD_021', sil: 'belt',
    tan: 72, grain: 'RAW', origin: 'ANDALUSIA', weight: 286, coord: '37.18/-3.60',
    entry: '2099.05.21', price: 380, span: 's3',
    quote: 'Wear it raw. Let it remember.',
    finish: 'Brass keeper, raw burnish',
    editorial: 'This field belt is intentionally left raw. The Andalusian hide carries natural scars and marks — each one a record. Paired with a solid brass keeper and a single tongue, it is built to outlast trends.',
  },
  {
    i: 6, cat: 'smallgoods', sn: 'LA·006·2099', name: 'NOTEBOOK // 84', sil: 'book',
    tan: 48, grain: 'FINE', origin: 'KYOTO', weight: 312, coord: '35.01/135.7',
    entry: '2099.06.07', price: 240, span: 's6',
    quote: 'Eighty-four blank specimens.',
    finish: 'Blind-debossed, hand-bound',
    editorial: 'Hand-bound in Kyoto-sourced leather, with eighty-four pages of tan card stock. The blind-debossed vault sigil on the cover sinks into the grain over time, becoming more visible with age.',
  },
  {
    i: 7, cat: 'jackets', sn: 'LA·007·2099', name: 'JACKET // PROTOTYPE_A', sil: 'jacket',
    tan: 228, grain: 'MEDIUM', origin: 'MOROCCO', weight: 2640, coord: '31.79/-7.09',
    entry: '2099.06.22', price: 5400, span: 's7',
    quote: 'A second skin, slowly earned.',
    finish: 'Drum-dyed, lined cotton',
    editorial: 'The first jacket prototype in the archive. Drum-dyed in Morocco using a single chocolate vat, then lined in raw cotton. It is heavy — deliberately so. A second skin that takes months to break in.',
  },
  {
    i: 8, cat: 'bags', sn: 'LA·008·2099', name: 'BAG // ARCHIVE_55', sil: 'brief',
    tan: 196, grain: 'FINE', origin: 'TUSCANY', weight: 1420, coord: '43.77/11.25',
    entry: '2099.07.03', price: 2840, span: 's5',
    quote: 'It carries the year, not the day.',
    finish: '5 coats edge, cotton lined',
    editorial: 'A two-compartment briefcase for archival purposes. Saddle-stitched, drum-dyed in chocolate, and lined in raw cotton. Designed to carry weight evenly, the Archive_55 distributes its load across reinforced seams.',
  },
  {
    i: 9, cat: 'smallgoods', sn: 'LA·009·2099', name: 'CARDHOLDER // 12', sil: 'wallet',
    tan: 48, grain: 'FINE', origin: 'KYOTO', weight: 42, coord: '35.01/135.7',
    entry: '2099.07.18', price: 160, span: 's6',
    quote: 'Twelve cards, twelve months.',
    finish: 'Saddle-stitched, slicked',
    editorial: 'A cardholder designed for twelve cards — one for each month. Thin Kyoto shell, fine grain, minimal stitching. The leather compresses over the year, molding to your exact stack.',
  },
  {
    i: 10, cat: 'wallets', sn: 'LA·010·2099', name: 'WALLET // LONG_05', sil: 'wallet',
    tan: 88, grain: 'MEDIUM', origin: 'ANDALUSIA', weight: 128, coord: '36.72/-4.42',
    entry: '2099.08.04', price: 380, span: 's2',
    quote: '',
    finish: 'Saddle-stitched, burnished',
    editorial: 'A long wallet format — designed for notes folded once, not twice. Andalusian medium grain provides structure without stiffness. Burnished edges, no paint, for a clean utilitarian finish.',
  },
  {
    i: 11, cat: 'jackets', sn: 'LA·011·2099', name: 'JACKET // FIELDCOAT_C', sil: 'jacket',
    tan: 168, grain: 'MIXED', origin: 'ARCHIVE_UNKNOWN', weight: 2980, coord: '??.??/??.??',
    entry: '2099.08.21', price: 6200, span: 's8',
    quote: 'Catalogued by hand. Origin redacted.',
    finish: 'Origin unknown, hand-catalogued',
    editorial: 'The origin of this hide is redacted. Filed under ARCHIVE_UNKNOWN, the Fieldcoat_C carries a mixed grain that suggests multiple sources — possibly reclaimed, possibly experimental. It arrived without documentation.',
  },
  {
    i: 12, cat: 'belts', sn: 'LA·012·2099', name: 'BELT // DRESS_034', sil: 'belt',
    tan: 120, grain: 'FINE', origin: 'TUSCANY', weight: 172, coord: '43.77/11.25',
    entry: '2099.09.02', price: 420, span: 's3',
    quote: '',
    finish: 'Polished, fine grain',
    editorial: 'A dress belt in fine Tuscan grain. Polished to a quiet sheen, it reflects light without flash. Thinner than the field belts, it is designed for tailoring — pairing with structured trousers and jackets.',
  },
  {
    i: 13, cat: 'archive', sn: 'LA·013·2099', name: 'PATCH // BLIND_002', sil: 'book',
    tan: 60, grain: 'RAW', origin: 'MOROCCO', weight: 18, coord: '31.79/-7.09',
    entry: '2099.09.19', price: 48, span: 's6',
    quote: '',
    finish: 'Blind-stamped, raw',
    editorial: 'A square patch of raw Moroccan leather, blind-stamped with the vault sigil. Intended for repair, customization, or as a collector\'s specimen. Each patch is unique — the raw grain guarantees that.',
  },
  {
    i: 14, cat: 'bags', sn: 'LA·014·2099', name: 'BAG // POUCH_19', sil: 'tote',
    tan: 96, grain: 'MEDIUM', origin: 'KYOTO', weight: 208, coord: '35.01/135.7',
    entry: '2099.10.05', price: 520, span: 's9',
    quote: '',
    finish: 'Drawstring, waxed cord',
    editorial: 'A soft drawstring pouch in Kyoto medium grain. No rigid structure — it conforms to its contents. Waxed linen cord closure, unlined interior. Designed for objects that deserve contact with raw leather.',
  },
  {
    i: 15, cat: 'smallgoods', sn: 'LA·015·2099', name: 'KEY FOB // 03', sil: 'wallet',
    tan: 48, grain: 'FINE', origin: 'ANDALUSIA', weight: 24, coord: '37.39/-5.99',
    entry: '2099.10.21', price: 80, span: 's6',
    quote: '',
    finish: 'Rivet, burnished',
    editorial: 'A key fob in fine Andalusian grain, fastened with a single copper rivet. Burnished edges, no stitching. It darkens with pocket wear, developing a deep chocolate patina in three to four months.',
  },
  {
    i: 16, cat: 'archive', sn: 'LA·016·2099', name: 'FILE // RAW_HIDE_07', sil: 'satchel',
    tan: 240, grain: 'MIXED', origin: 'ARCHIVE_UNKNOWN', weight: 1840, coord: '??.??/??.??',
    entry: '2099.11.02', price: 1200, span: 's4',
    quote: 'Sourced. Untouched. Filed.',
    finish: 'Untouched, raw archival',
    editorial: 'The longest tannage in the vault — two hundred and forty hours. This specimen was sourced, tanned, and filed without any finishing. It exists purely as a record: raw hide, fully processed, never touched by hand or tool.',
  },
];

export function grainDensity(g: GrainKind): string {
  const map: Record<GrainKind, number> = { FINE: 7.4, MEDIUM: 6.9, COARSE: 6.2, RAW: 5.8, MIXED: 6.5 };
  return map[g].toFixed(1);
}
