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
  /** Optional photo (path under /assets). Falls back to the line silhouette. */
  image?: string;
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
  name: Record<Lang, string>;
  sil: SilhouetteKind;
  tan: number;
  grain: GrainKind;
  origin: OriginKind;
  weight: number;
  coord: string;
  entry: string;
  /** Price in USD — shown for EN and RU. */
  price: number;
  /** Price in Georgian lari — shown for KA. */
  priceGel: number;
  span: SpanKind;
  quote: Record<Lang, string>;
  finish: Record<Lang, string>;
  editorial: Record<Lang, string>;
  /** Optional photo (path under /assets). Falls back to the line silhouette. */
  image?: string;
}

export const ORIGINS: OriginKind[] = [
  'TUSCANY',
  'ANDALUSIA',
  'MOROCCO',
  'KYOTO',
  'ARCHIVE_UNKNOWN',
];
export const GRAINS: GrainKind[] = ['FINE', 'MEDIUM', 'COARSE', 'RAW', 'MIXED'];

export const TOTAL_SPECIMENS = 247;
export const IN_VAULT = 12;

export const VAULT_SPECIMENS: VaultSpecimen[] = [
  {
    i: 1,
    cat: 'bags',
    sn: 'LA·001·2099',
    name: { EN: 'BAG // PROTOCOL_07', KA: 'ჩანთა // პროტოკოლი_07', RU: 'СУМКА // ПРОТОКОЛ_07' },
    sil: 'tote',
    tan: 148,
    grain: 'MEDIUM',
    origin: 'TUSCANY',
    weight: 540,
    coord: '41.71/44.83',
    entry: '2099.03.14',
    price: 1480,
    priceGel: 4000,
    span: 's1',
    quote: {
      EN: 'A hide is a manuscript; the tannin is the ink.',
      KA: 'ტყავი ხელნაწერია; ტანინი — მელანი.',
      RU: 'Шкура — рукопись; танин — чернила.',
    },
    finish: {
      EN: 'Hand-burnished, edge-painted',
      KA: 'ხელით გაპრიალებული, კიდე შეღებილი',
      RU: 'Ручная полировка, окрашенный край',
    },
    editorial: {
      EN: 'A daily tote born from Tuscan pastures, this specimen carries the warm amber of its origin in every fiber. The vegetable tannage is patient — mimosa bark, pit-soaked for twenty-one days. The result is a grain that deepens with use.',
      KA: 'ყოველდღიური ტომარა ტოსკანური საძოვრებიდან — ეს ნიმუში წარმოშობის თბილ ქარვისფერს ატარებს ყოველ ბოჭკოში. მცენარეული თრიმვა მომთმენია — მიმოზის ქერქი, ოცდაერთი დღე ორმოში. შედეგი — ბოჭკო, რომელიც ხმარებით ღრმავდება.',
      RU: 'Повседневный тоут с тосканских пастбищ — этот образец несёт тёплый янтарь своего происхождения в каждом волокне. Растительное дубление терпеливо: кора мимозы, двадцать один день в яме. Итог — зерно, которое с ноской становится глубже.',
    },
  },
  {
    i: 2,
    cat: 'belts',
    sn: 'LA·002·2099',
    name: { EN: 'BELT // SPECIMEN_142', KA: 'ქამარი // ნიმუში_142', RU: 'РЕМЕНЬ // ОБРАЗЕЦ_142' },
    sil: 'belt',
    tan: 96,
    grain: 'COARSE',
    origin: 'ANDALUSIA',
    weight: 218,
    coord: '37.39/-5.99',
    entry: '2099.04.02',
    price: 340,
    priceGel: 920,
    span: 's3',
    quote: {
      EN: 'A belt outlives its wearer.',
      KA: 'ქამარი გადარჩება პატრონს.',
      RU: 'Ремень переживает своего владельца.',
    },
    finish: {
      EN: 'Oil-pulled, raw edge',
      KA: 'ზეთით გაჟღენთილი, ნედლი კიდე',
      RU: 'Пропитан маслом, необработанный край',
    },
    editorial: {
      EN: 'Sourced from the plains of Andalusia, this belt uses a deliberately coarse grain for texture and grip. Finished raw — no paint, no polish — it develops its own patina over months of wear.',
      KA: 'ანდალუსიის ველებიდან მოტანილი ეს ქამარი განზრახ მსხვილ ბოჭკოს იყენებს ტექსტურისა და მოჭიდებისთვის. ნედლად დასრულებული — არც საღებავი, არც პრიალი — თვეების ტარებით საკუთარ პატინას ივითარებს.',
      RU: 'Родом с равнин Андалусии, этот ремень использует нарочито грубое зерно ради текстуры и хвата. Финиш сырой — ни краски, ни полировки — за месяцы носки он вырабатывает собственную патину.',
    },
  },
  {
    i: 3,
    cat: 'wallets',
    sn: 'LA·003·2099',
    name: { EN: 'WALLET // ARCHIVE_03', KA: 'საფულე // არქივი_03', RU: 'КОШЕЛЁК // АРХИВ_03' },
    sil: 'wallet',
    tan: 54,
    grain: 'FINE',
    origin: 'KYOTO',
    weight: 96,
    coord: '35.01/135.7',
    entry: '2099.04.18',
    price: 280,
    priceGel: 760,
    span: 's2',
    quote: {
      EN: 'Stitched once. Carried always.',
      KA: 'ერთხელ გაკერილი. სამუდამოდ სატარებელი.',
      RU: 'Сшит однажды. Носится всегда.',
    },
    finish: {
      EN: 'Saddle-stitched, slicked',
      KA: 'საუნაგირე ნაკერი, გლუვი კიდე',
      RU: 'Седельный шов, заглаженный край',
    },
    editorial: {
      EN: 'A bifold wallet from a single shell, skived to 1.1mm at the fold and saddle-stitched with waxed linen. The Kyoto origin gives it a distinctly tight grain that resists scratching.',
      KA: 'ბიფოლდი საფულე ერთი ნაჭრისგან — დაკეცვაზე 1.1 მმ-მდე გათხელებული და ცვილიანი სელის ძაფით ნაკერი. კიოტოს წარმოშობა მას განსაკუთრებით მკვრივ ბოჭკოს ანიჭებს, რომელიც ნაკაწრებს უძლებს.',
      RU: 'Бифолд из одной детали: снят до 1,1 мм на сгибе и прошит вощёным льном седельным швом. Киотское происхождение даёт особенно плотное зерно, устойчивое к царапинам.',
    },
  },
  {
    i: 4,
    cat: 'bags',
    sn: 'LA·004·2099',
    name: { EN: 'BAG // CARRARA_28', KA: 'ჩანთა // კარარა_28', RU: 'СУМКА // КАРРАРА_28' },
    sil: 'satchel',
    tan: 192,
    grain: 'FINE',
    origin: 'TUSCANY',
    weight: 684,
    coord: '44.07/10.10',
    entry: '2099.05.04',
    price: 1980,
    priceGel: 5350,
    span: 's2',
    quote: {
      EN: 'Patience is the eighth tannin.',
      KA: 'მოთმინება — მერვე ტანინი.',
      RU: 'Терпение — восьмой танин.',
    },
    finish: {
      EN: 'Hand-burnished, 4 coats edge',
      KA: 'ხელით გაპრიალებული, კიდე 4 ფენად',
      RU: 'Ручная полировка, край в 4 слоя',
    },
    editorial: {
      EN: 'Twenty-eight days in the pit. The Carrara satchel is the longest tannage in the current cycle — a specimen of pure patience. Its fine Tuscan grain carries depth and warmth that shorter processes never achieve.',
      KA: 'ოცდარვა დღე ორმოში. კარარას ჩანთა მიმდინარე ციკლის ყველაზე ხანგრძლივი თრიმვაა — სუფთა მოთმინების ნიმუში. მისი წვრილი ტოსკანური ბოჭკო სიღრმესა და სითბოს ატარებს, რასაც მოკლე პროცესები ვერასდროს აღწევს.',
      RU: 'Двадцать восемь дней в яме. Сумка Каррара — самое долгое дубление текущего цикла, образец чистого терпения. Тонкое тосканское зерно несёт глубину и тепло, недостижимые для коротких процессов.',
    },
  },
  {
    i: 5,
    cat: 'belts',
    sn: 'LA·005·2099',
    name: { EN: 'BELT // FIELD_021', KA: 'ქამარი // ველი_021', RU: 'РЕМЕНЬ // ПОЛЕ_021' },
    sil: 'belt',
    tan: 72,
    grain: 'RAW',
    origin: 'ANDALUSIA',
    weight: 286,
    coord: '37.18/-3.60',
    entry: '2099.05.21',
    price: 380,
    priceGel: 1030,
    span: 's3',
    quote: {
      EN: 'Wear it raw. Let it remember.',
      KA: 'ატარე ნედლი. მიეცი დამახსოვრების ნება.',
      RU: 'Носи сырым. Пусть помнит.',
    },
    finish: {
      EN: 'Brass keeper, raw burnish',
      KA: 'თითბრის რგოლი, ნედლი პრიალი',
      RU: 'Латунный держатель, сырая полировка',
    },
    editorial: {
      EN: 'This field belt is intentionally left raw. The Andalusian hide carries natural scars and marks — each one a record. Paired with a solid brass keeper and a single tongue, it is built to outlast trends.',
      KA: 'ეს ველის ქამარი განზრახ ნედლადაა დატოვებული. ანდალუსიური ტყავი ბუნებრივ ნაიარევებსა და ნიშნებს ატარებს — თითოეული ჩანაწერია. მთლიანი თითბრის რგოლითა და ერთი ენით, ის ტენდენციებზე მეტ ხანს გასაძლებადაა შექმნილი.',
      RU: 'Этот полевой ремень намеренно оставлен сырым. Андалусская кожа несёт естественные шрамы и отметины — каждая из них запись. С цельной латунной пряжкой и одним язычком он построен, чтобы пережить моду.',
    },
  },
  {
    i: 6,
    cat: 'smallgoods',
    sn: 'LA·006·2099',
    name: { EN: 'NOTEBOOK // 84', KA: 'რვეული // 84', RU: 'ТЕТРАДЬ // 84' },
    sil: 'book',
    tan: 48,
    grain: 'FINE',
    origin: 'KYOTO',
    weight: 312,
    coord: '35.01/135.7',
    entry: '2099.06.07',
    price: 240,
    priceGel: 650,
    span: 's6',
    quote: {
      EN: 'Eighty-four blank specimens.',
      KA: 'ოთხმოცდაოთხი ცარიელი ნიმუში.',
      RU: 'Восемьдесят четыре пустых образца.',
    },
    finish: {
      EN: 'Blind-debossed, hand-bound',
      KA: 'ბრმა ტვიფრი, ხელით აკინძული',
      RU: 'Слепое тиснение, ручной переплёт',
    },
    editorial: {
      EN: 'Hand-bound in Kyoto-sourced leather, with eighty-four pages of tan card stock. The blind-debossed vault sigil on the cover sinks into the grain over time, becoming more visible with age.',
      KA: 'კიოტოდან მოტანილი ტყავით ხელით აკინძული, ოთხმოცდაოთხი გვერდი ქარვისფერი მუყაოსგან. ყდაზე ბრმად დატვიფრული სარდაფის ნიშანი დროთა განმავლობაში ბოჭკოში იძირება და ასაკთან ერთად უფრო თვალსაჩინო ხდება.',
      RU: 'Переплетена вручную в киотскую кожу, восемьдесят четыре страницы тонированного картона. Слепое тиснение печати хранилища на обложке со временем утопает в зерне, становясь заметнее с возрастом.',
    },
  },
  {
    i: 7,
    cat: 'jackets',
    sn: 'LA·007·2099',
    name: { EN: 'JACKET // PROTOTYPE_A', KA: 'ქურთუკი // პროტოტიპი_A', RU: 'КУРТКА // ПРОТОТИП_A' },
    sil: 'jacket',
    tan: 228,
    grain: 'MEDIUM',
    origin: 'MOROCCO',
    weight: 2640,
    coord: '31.79/-7.09',
    entry: '2099.06.22',
    price: 5400,
    priceGel: 14580,
    span: 's7',
    quote: {
      EN: 'A second skin, slowly earned.',
      KA: 'მეორე კანი, ნელა დამსახურებული.',
      RU: 'Вторая кожа, заслуженная медленно.',
    },
    finish: {
      EN: 'Drum-dyed, lined cotton',
      KA: 'დოლში შეღებილი, ბამბის სარჩული',
      RU: 'Барабанная окраска, хлопковая подкладка',
    },
    editorial: {
      EN: 'The first jacket prototype in the archive. Drum-dyed in Morocco using a single chocolate vat, then lined in raw cotton. It is heavy — deliberately so. A second skin that takes months to break in.',
      KA: 'პირველი ქურთუკის პროტოტიპი არქივში. მაროკოში, ერთ შოკოლადისფერ ავზში დოლით შეღებილი, შემდეგ ნედლი ბამბით შემოსილი. მძიმეა — განზრახ. მეორე კანი, რომლის მოთელვას თვეები სჭირდება.',
      RU: 'Первый прототип куртки в архиве. Окрашена в Марокко барабанным способом в одном шоколадном чане, затем подбита сырым хлопком. Она тяжёлая — намеренно. Вторая кожа, которую разнашивают месяцами.',
    },
  },
  {
    i: 8,
    cat: 'bags',
    sn: 'LA·008·2099',
    name: { EN: 'BAG // ARCHIVE_55', KA: 'ჩანთა // არქივი_55', RU: 'СУМКА // АРХИВ_55' },
    sil: 'brief',
    tan: 196,
    grain: 'FINE',
    origin: 'TUSCANY',
    weight: 1420,
    coord: '43.77/11.25',
    entry: '2099.07.03',
    price: 2840,
    priceGel: 7670,
    span: 's5',
    quote: {
      EN: 'It carries the year, not the day.',
      KA: 'ის ატარებს წელიწადს, არა დღეს.',
      RU: 'Носит год, а не день.',
    },
    finish: {
      EN: '5 coats edge, cotton lined',
      KA: 'კიდე 5 ფენად, ბამბის სარჩული',
      RU: 'Край в 5 слоёв, хлопковая подкладка',
    },
    editorial: {
      EN: 'A two-compartment briefcase for archival purposes. Saddle-stitched, drum-dyed in chocolate, and lined in raw cotton. Designed to carry weight evenly, the Archive_55 distributes its load across reinforced seams.',
      KA: 'ორ-განყოფილებიანი ჩემოდანი საარქივო დანიშნულებით. საუნაგირე ნაკერით, შოკოლადისფრად დოლში შეღებილი და ნედლი ბამბით შემოსილი. წონის თანაბრად გადასანაწილებლად შექმნილი Archive_55 დატვირთვას გაძლიერებულ ნაკერებზე ანაწილებს.',
      RU: 'Двухсекционный портфель для архивных задач. Седельный шов, барабанная окраска в шоколад, подкладка из сырого хлопка. Archive_55 распределяет нагрузку по усиленным швам, неся вес равномерно.',
    },
  },
  {
    i: 9,
    cat: 'smallgoods',
    sn: 'LA·009·2099',
    name: { EN: 'CARDHOLDER // 12', KA: 'საბარათე // 12', RU: 'КАРДХОЛДЕР // 12' },
    sil: 'wallet',
    tan: 48,
    grain: 'FINE',
    origin: 'KYOTO',
    weight: 42,
    coord: '35.01/135.7',
    entry: '2099.07.18',
    price: 160,
    priceGel: 430,
    span: 's6',
    quote: {
      EN: 'Twelve cards, twelve months.',
      KA: 'თორმეტი ბარათი, თორმეტი თვე.',
      RU: 'Двенадцать карт, двенадцать месяцев.',
    },
    finish: {
      EN: 'Saddle-stitched, slicked',
      KA: 'საუნაგირე ნაკერი, გლუვი კიდე',
      RU: 'Седельный шов, заглаженный край',
    },
    editorial: {
      EN: 'A cardholder designed for twelve cards — one for each month. Thin Kyoto shell, fine grain, minimal stitching. The leather compresses over the year, molding to your exact stack.',
      KA: 'საბარათე თორმეტი ბარათისთვის — თითო ყოველი თვისთვის. თხელი კიოტოს ნაჭერი, წვრილი ბოჭკო, მინიმალური ნაკერი. ტყავი წლის განმავლობაში იკუმშება და ზუსტად შენს დასტას ერგება.',
      RU: 'Кардхолдер на двенадцать карт — по одной на каждый месяц. Тонкая киотская кожа, мелкое зерно, минимум швов. За год кожа сжимается, принимая форму именно вашей стопки.',
    },
  },
  {
    i: 10,
    cat: 'wallets',
    sn: 'LA·010·2099',
    name: { EN: 'WALLET // LONG_05', KA: 'საფულე // გრძელი_05', RU: 'КОШЕЛЁК // ДЛИННЫЙ_05' },
    sil: 'wallet',
    tan: 88,
    grain: 'MEDIUM',
    origin: 'ANDALUSIA',
    weight: 128,
    coord: '36.72/-4.42',
    entry: '2099.08.04',
    price: 380,
    priceGel: 1030,
    span: 's2',
    quote: { EN: '', KA: '', RU: '' },
    finish: {
      EN: 'Saddle-stitched, burnished',
      KA: 'საუნაგირე ნაკერი, გაპრიალებული',
      RU: 'Седельный шов, полированный',
    },
    editorial: {
      EN: 'A long wallet format — designed for notes folded once, not twice. Andalusian medium grain provides structure without stiffness. Burnished edges, no paint, for a clean utilitarian finish.',
      KA: 'გრძელი საფულის ფორმატი — ერთხელ დაკეცილი ბანკნოტებისთვის, არა ორჯერ. ანდალუსიური საშუალო ბოჭკო სტრუქტურას სიხისტის გარეშე იძლევა. გაპრიალებული კიდეები, საღებავის გარეშე — სუფთა, პრაქტიკული დასრულება.',
      RU: 'Формат длинного кошелька — для купюр, сложенных один раз, а не дважды. Андалусское среднее зерно даёт структуру без жёсткости. Полированные края без краски — чистый утилитарный финиш.',
    },
  },
  {
    i: 11,
    cat: 'jackets',
    sn: 'LA·011·2099',
    name: {
      EN: 'JACKET // FIELDCOAT_C',
      KA: 'ქურთუკი // ველისკოატი_C',
      RU: 'КУРТКА // ФИЛДКОУТ_C',
    },
    sil: 'jacket',
    tan: 168,
    grain: 'MIXED',
    origin: 'ARCHIVE_UNKNOWN',
    weight: 2980,
    coord: '??.??/??.??',
    entry: '2099.08.21',
    price: 6200,
    priceGel: 16740,
    span: 's8',
    quote: {
      EN: 'Catalogued by hand. Origin redacted.',
      KA: 'ხელით კატალოგებული. წარმოშობა დაფარული.',
      RU: 'Каталогизирована вручную. Происхождение скрыто.',
    },
    finish: {
      EN: 'Origin unknown, hand-catalogued',
      KA: 'წარმოშობა უცნობი, ხელით კატალოგებული',
      RU: 'Происхождение неизвестно, ручная каталогизация',
    },
    editorial: {
      EN: 'The origin of this hide is redacted. Filed under ARCHIVE_UNKNOWN, the Fieldcoat_C carries a mixed grain that suggests multiple sources — possibly reclaimed, possibly experimental. It arrived without documentation.',
      KA: 'ამ ტყავის წარმოშობა დაფარულია. ARCHIVE_UNKNOWN-ში დარეგისტრირებული Fieldcoat_C შერეულ ბოჭკოს ატარებს, რაც რამდენიმე წყაროზე მიუთითებს — შესაძლოა აღდგენილი, შესაძლოა ექსპერიმენტული. ის დოკუმენტაციის გარეშე მოვიდა.',
      RU: 'Происхождение этой шкуры скрыто. Занесённый в ARCHIVE_UNKNOWN, Fieldcoat_C несёт смешанное зерно, указывающее на несколько источников — возможно, восстановленных, возможно, экспериментальных. Он прибыл без документов.',
    },
  },
  {
    i: 12,
    cat: 'belts',
    sn: 'LA·012·2099',
    name: { EN: 'BELT // DRESS_034', KA: 'ქამარი // კლასიკური_034', RU: 'РЕМЕНЬ // КЛАССИКА_034' },
    sil: 'belt',
    tan: 120,
    grain: 'FINE',
    origin: 'TUSCANY',
    weight: 172,
    coord: '43.77/11.25',
    entry: '2099.09.02',
    price: 420,
    priceGel: 1130,
    span: 's3',
    quote: { EN: '', KA: '', RU: '' },
    finish: {
      EN: 'Polished, fine grain',
      KA: 'გაპრიალებული, წვრილი ბოჭკო',
      RU: 'Полированный, мелкое зерно',
    },
    editorial: {
      EN: 'A dress belt in fine Tuscan grain. Polished to a quiet sheen, it reflects light without flash. Thinner than the field belts, it is designed for tailoring — pairing with structured trousers and jackets.',
      KA: 'კლასიკური ქამარი წვრილი ტოსკანური ბოჭკოთი. მშვიდ ბზინვამდე გაპრიალებული, ის შუქს ელვარების გარეშე ირეკლავს. ველის ქამრებზე თხელი, ის სამკერვალო სტილისთვისაა — სტრუქტურირებულ შარვალსა და ქურთუკებთან შესახამებლად.',
      RU: 'Классический ремень из мелкозернистой тосканской кожи. Отполирован до тихого блеска — отражает свет без вспышки. Тоньше полевых ремней, создан для костюма: под структурированные брюки и пиджаки.',
    },
  },
  {
    i: 13,
    cat: 'archive',
    sn: 'LA·013·2099',
    name: { EN: 'PATCH // BLIND_002', KA: 'ნაჭერი // ბრმა_002', RU: 'ПАТЧ // СЛЕПОЙ_002' },
    sil: 'book',
    tan: 60,
    grain: 'RAW',
    origin: 'MOROCCO',
    weight: 18,
    coord: '31.79/-7.09',
    entry: '2099.09.19',
    price: 48,
    priceGel: 130,
    span: 's6',
    quote: { EN: '', KA: '', RU: '' },
    finish: { EN: 'Blind-stamped, raw', KA: 'ბრმა ტვიფრი, ნედლი', RU: 'Слепое тиснение, сырой' },
    editorial: {
      EN: "A square patch of raw Moroccan leather, blind-stamped with the vault sigil. Intended for repair, customization, or as a collector's specimen. Each patch is unique — the raw grain guarantees that.",
      KA: 'ნედლი მაროკოული ტყავის კვადრატული ნაჭერი, სარდაფის ნიშნით ბრმად დატვიფრული. განკუთვნილია შესაკეთებლად, პერსონალიზაციისთვის ან როგორც საკოლექციო ნიმუში. თითოეული ნაჭერი უნიკალურია — ამას ნედლი ბოჭკო უზრუნველყოფს.',
      RU: 'Квадратный лоскут сырой марокканской кожи со слепым тиснением печати хранилища. Предназначен для ремонта, кастомизации или как коллекционный образец. Каждый патч уникален — сырое зерно это гарантирует.',
    },
  },
  {
    i: 14,
    cat: 'bags',
    sn: 'LA·014·2099',
    name: { EN: 'BAG // POUCH_19', KA: 'ჩანთა // ქისა_19', RU: 'СУМКА // КИСЕТ_19' },
    sil: 'tote',
    tan: 96,
    grain: 'MEDIUM',
    origin: 'KYOTO',
    weight: 208,
    coord: '35.01/135.7',
    entry: '2099.10.05',
    price: 520,
    priceGel: 1400,
    span: 's9',
    quote: { EN: '', KA: '', RU: '' },
    finish: {
      EN: 'Drawstring, waxed cord',
      KA: 'შესაკრავი, ცვილიანი თოკი',
      RU: 'Затяжка, вощёный шнур',
    },
    editorial: {
      EN: 'A soft drawstring pouch in Kyoto medium grain. No rigid structure — it conforms to its contents. Waxed linen cord closure, unlined interior. Designed for objects that deserve contact with raw leather.',
      KA: 'რბილი შესაკრავიანი ქისა კიოტოს საშუალო ბოჭკოთი. ხისტი სტრუქტურის გარეშე — ის შიგთავსს ერგება. ცვილიანი სელის თოკის შესაკრავი, უსარჩულო ინტერიერი. შექმნილია ნივთებისთვის, რომლებიც ნედლ ტყავთან შეხებას იმსახურებენ.',
      RU: 'Мягкий кисет на затяжке из киотской кожи среднего зерна. Без жёсткой структуры — принимает форму содержимого. Затяжка из вощёного льняного шнура, интерьер без подкладки. Для вещей, заслуживающих контакта с сырой кожей.',
    },
  },
  {
    i: 15,
    cat: 'smallgoods',
    sn: 'LA·015·2099',
    name: { EN: 'KEY FOB // 03', KA: 'გასაღების საკიდი // 03', RU: 'БРЕЛОК // 03' },
    sil: 'wallet',
    tan: 48,
    grain: 'FINE',
    origin: 'ANDALUSIA',
    weight: 24,
    coord: '37.39/-5.99',
    entry: '2099.10.21',
    price: 80,
    priceGel: 220,
    span: 's6',
    quote: { EN: '', KA: '', RU: '' },
    finish: { EN: 'Rivet, burnished', KA: 'მოქლონი, გაპრიალებული', RU: 'Заклёпка, полированный' },
    editorial: {
      EN: 'A key fob in fine Andalusian grain, fastened with a single copper rivet. Burnished edges, no stitching. It darkens with pocket wear, developing a deep chocolate patina in three to four months.',
      KA: 'გასაღების საკიდი წვრილი ანდალუსიური ბოჭკოთი, ერთი სპილენძის მოქლონით დამაგრებული. გაპრიალებული კიდეები, ნაკერის გარეშე. ჯიბეში ტარებით მუქდება და სამ-ოთხ თვეში ღრმა შოკოლადისფერ პატინას ივითარებს.',
      RU: 'Брелок из мелкозернистой андалусской кожи на одной медной заклёпке. Полированные края, без швов. Темнеет от носки в кармане, за три-четыре месяца приобретая глубокую шоколадную патину.',
    },
  },
  {
    i: 16,
    cat: 'archive',
    sn: 'LA·016·2099',
    name: {
      EN: 'FILE // RAW_HIDE_07',
      KA: 'საქმე // ნედლი_ტყავი_07',
      RU: 'ДЕЛО // СЫРАЯ_ШКУРА_07',
    },
    sil: 'satchel',
    tan: 240,
    grain: 'MIXED',
    origin: 'ARCHIVE_UNKNOWN',
    weight: 1840,
    coord: '??.??/??.??',
    entry: '2099.11.02',
    price: 1200,
    priceGel: 3240,
    span: 's4',
    quote: {
      EN: 'Sourced. Untouched. Filed.',
      KA: 'მოპოვებული. ხელუხლებელი. დარეგისტრირებული.',
      RU: 'Добыто. Нетронуто. Занесено.',
    },
    finish: {
      EN: 'Untouched, raw archival',
      KA: 'ხელუხლებელი, ნედლი საარქივო',
      RU: 'Нетронутый, сырой архивный',
    },
    editorial: {
      EN: 'The longest tannage in the vault — two hundred and forty hours. This specimen was sourced, tanned, and filed without any finishing. It exists purely as a record: raw hide, fully processed, never touched by hand or tool.',
      KA: 'ყველაზე ხანგრძლივი თრიმვა სარდაფში — ორას ორმოცი საათი. ეს ნიმუში მოპოვებულ, დათრიმულ და დარეგისტრირებულ იქნა ყოველგვარი დასრულების გარეშე. ის მხოლოდ ჩანაწერად არსებობს: ნედლი ტყავი, სრულად დამუშავებული, ხელითა თუ ხელსაწყოთი არასდროს შეხებული.',
      RU: 'Самое долгое дубление в хранилище — двести сорок часов. Этот образец был добыт, выдублен и занесён в архив без всякой отделки. Он существует только как запись: сырая шкура, полностью обработанная, но не тронутая ни рукой, ни инструментом.',
    },
  },
];

export function grainDensity(g: GrainKind): string {
  const map: Record<GrainKind, number> = {
    FINE: 7.4,
    MEDIUM: 6.9,
    COARSE: 6.2,
    RAW: 5.8,
    MIXED: 6.5,
  };
  return map[g].toFixed(1);
}
