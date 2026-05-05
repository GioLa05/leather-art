/* vault-app.js — Leather Art Vault Index */

/* ─── i18n ─────────────────────────────────────────────────── */
const I18N = {
  EN: {
    "status.archive":"ARCHIVE","status.coords":"COORDS","status.batch":"BATCH","status.live":"LIVE · TANNING",
    "bc.vault":"VAULT","bc.sector":"SECTOR_03","bc.index":"INDEX_OPEN",
    "title.sub":"Every specimen, catalogued.",
    "counter.specs":"SPECIMENS","counter.vault":"IN VAULT","counter.sel":"SELECTED",
    "results.showing":"SHOWING","results.specs":"SPECIMENS",
    "view.dossier":"DOSSIER","view.specimen":"SPECIMEN",
    "filter.tan":"TANNAGE HOURS","filter.grain":"GRAIN DENSITY","filter.origin":"HIDE ORIGIN",
    "filter.weight":"WEIGHT (G)","filter.entry":"VAULT ENTRY","filter.sort":"SORT BY",
    "filters.title":"FILTERS",
    "drawer.title":"COMPARE SPECIMENS","drawer.slot":"SLOTS","drawer.clear":"CLEAR ALL","drawer.view":"VIEW COMPARISON →","drawer.empty":"EMPTY SLOT // PRESS [+] ON A SPECIMEN",
    "modal.prev":"[ ← PREV ]","modal.next":"[ NEXT → ]","modal.request":"REQUEST SPECIMEN →","modal.compare":"ADD TO COMPARE [+]",
    "modal.bc.vault":"VAULT","modal.bc.all":"ALL",
    "footer.k.house":"HOUSE","footer.k.cycle":"CYCLE","footer.k.coords":"COORDINATES","footer.k.copy":"COPYRIGHT",
    "th.idx":"IDX","th.name":"SPECIMEN","th.img":"IMG","th.tan":"TANNAGE","th.grain":"GRAIN",
    "th.origin":"ORIGIN","th.weight":"WEIGHT","th.coord":"COORD","th.price":"PRICE",
    "cat.bags":"BAGS","cat.belts":"BELTS","cat.wallets":"WALLETS",
    "cat.jackets":"JACKETS","cat.smallgoods":"SMALL GOODS","cat.archive":"ARCHIVE",
    "grain.fine":"FINE","grain.medium":"MEDIUM","grain.coarse":"COARSE","grain.raw":"RAW","grain.mixed":"MIXED",
    "sort.tan":"TANNAGE HOURS","sort.grain":"GRAIN DENSITY","sort.entry":"VAULT ENTRY DATE","sort.weight":"WEIGHT","sort.idx":"SPECIMEN INDEX",
    "empty.big":"VAULT EMPTY // RECALIBRATE PARAMETERS",
    "empty.sub":"NO SPECIMENS MATCH THE CURRENT TELEMETRY BAND",
    "calibrating":"CALIBRATING…",
    "origin.tuscany":"TUSCANY","origin.andalusia":"ANDALUSIA","origin.morocco":"MOROCCO",
    "origin.kyoto":"KYOTO","origin.archive_unknown":"ARCHIVE_UNKNOWN",
    "nav.index":"INDEX","nav.vault":"VAULT","nav.archive":"ARCHIVE","nav.journal":"JOURNAL","nav.contact":"CONTACT","nav.cart":"CART",
    /* Modal spec labels */
    "ms.tannage":"TANNAGE","ms.hours":"HOURS","ms.grain":"GRAIN","ms.origin":"ORIGIN",
    "ms.weight":"WEIGHT","ms.coord":"COORD","ms.batch":"BATCH","ms.finish":"FINISH","ms.entry":"ENTRY"
  },
  KA: {
    "status.archive":"არქივი","status.coords":"კოორდ.","status.batch":"პარტია","status.live":"ცოცხალი · თრიმვა",
    "bc.vault":"სარდაფი","bc.sector":"სექტ_03","bc.index":"ინდექსი_ღია",
    "title.sub":"ყოველი ნიმუში, კატალოგებული.",
    "counter.specs":"ნიმუშები","counter.vault":"სარდაფში","counter.sel":"არჩეული",
    "results.showing":"ნაჩვენებია","results.specs":"ნიმუში",
    "view.dossier":"დოსიე","view.specimen":"ნიმუში",
    "filter.tan":"თრიმვის საათები","filter.grain":"ბოჭკო","filter.origin":"ტყავის წარმოშობა",
    "filter.weight":"წონა (გ)","filter.entry":"სარდაფში შეტანა","filter.sort":"დალაგება",
    "filters.title":"ფილტრები",
    "drawer.title":"ნიმუშების შედარება","drawer.slot":"სლოტი","drawer.clear":"გასუფთავება","drawer.view":"შედარების ნახვა →","drawer.empty":"ცარიელი სლოტი // დააჭირე [+] ნიმუშზე",
    "modal.prev":"[ ← წინა ]","modal.next":"[ შემდ. → ]","modal.request":"მოითხოვე ნიმუში →","modal.compare":"შედარებაში დამატება [+]",
    "modal.bc.vault":"სარდაფი","modal.bc.all":"ყველა",
    "footer.k.house":"სახლი","footer.k.cycle":"ციკლი","footer.k.coords":"კოორდინატები","footer.k.copy":"საავტ. უფლ.",
    "th.idx":"ინდ.","th.name":"ნიმუში","th.img":"სურ.","th.tan":"თრიმვა","th.grain":"ბოჭკო",
    "th.origin":"წარმოშობა","th.weight":"წონა","th.coord":"კოორდ.","th.price":"ფასი",
    "cat.bags":"ჩანთები","cat.belts":"ქამრები","cat.wallets":"საფულეები",
    "cat.jackets":"ქურთუკები","cat.smallgoods":"მცირე ნივთები","cat.archive":"არქივი",
    "grain.fine":"წვრილი","grain.medium":"საშუალო","grain.coarse":"მსხვილი","grain.raw":"ნედლი","grain.mixed":"შერეული",
    "sort.tan":"თრიმვის საათები","sort.grain":"ბოჭკოს სიმკვრივე","sort.entry":"სარდაფში შეტანის თარიღი","sort.weight":"წონა","sort.idx":"ნიმუშის ინდექსი",
    "empty.big":"სარდაფი ცარიელია // გადააწყვე პარამეტრები",
    "empty.sub":"არცერთი ნიმუში არ შეესაბამება მიმდინარე ტელემეტრიას",
    "calibrating":"კალიბრება…",
    "origin.tuscany":"ტოსკანა","origin.andalusia":"ანდალუსია","origin.morocco":"მაროკო",
    "origin.kyoto":"კიოტო","origin.archive_unknown":"არქივი_უცნობი",
    "nav.index":"ინდექსი","nav.vault":"სარდაფი","nav.archive":"არქივი","nav.journal":"ჟურნალი","nav.contact":"კონტაქტი","nav.cart":"კალათა",
    "ms.tannage":"თრიმვა","ms.hours":"საათები","ms.grain":"ბოჭკო","ms.origin":"წარმოშ.",
    "ms.weight":"წონა","ms.coord":"კოორდ.","ms.batch":"პარტია","ms.finish":"დასრულება","ms.entry":"შეტანა"
  },
  RU: {
    "status.archive":"АРХИВ","status.coords":"КООРД.","status.batch":"ПАРТИЯ","status.live":"В ЭФИРЕ · ДУБЛЕНИЕ",
    "bc.vault":"ХРАНИЛИЩЕ","bc.sector":"СЕКТОР_03","bc.index":"ИНДЕКС_ОТКР",
    "title.sub":"Каждый образец каталогизирован.",
    "counter.specs":"ОБРАЗЦЫ","counter.vault":"В ХРАНИЛИЩЕ","counter.sel":"ВЫБРАНО",
    "results.showing":"ПОКАЗАНО","results.specs":"ОБРАЗЦЫ",
    "view.dossier":"ДОСЬЕ","view.specimen":"ОБРАЗЕЦ",
    "filter.tan":"ЧАСЫ ДУБЛЕНИЯ","filter.grain":"ВОЛОКНО","filter.origin":"ПРОИСХОЖДЕНИЕ",
    "filter.weight":"ВЕС (Г)","filter.entry":"ВХОД В АРХИВ","filter.sort":"СОРТИРОВКА",
    "filters.title":"ФИЛЬТРЫ",
    "drawer.title":"СРАВНЕНИЕ ОБРАЗЦОВ","drawer.slot":"СЛОТЫ","drawer.clear":"ОЧИСТИТЬ","drawer.view":"СМОТРЕТЬ СРАВНЕНИЕ →","drawer.empty":"ПУСТО // ЖМИ [+] НА ОБРАЗЦЕ",
    "modal.prev":"[ ← ПРЕД ]","modal.next":"[ СЛЕД → ]","modal.request":"ЗАПРОСИТЬ ОБРАЗЕЦ →","modal.compare":"В СРАВНЕНИЕ [+]",
    "modal.bc.vault":"ХРАНИЛИЩЕ","modal.bc.all":"ВСЕ",
    "footer.k.house":"ДОМ","footer.k.cycle":"ЦИКЛ","footer.k.coords":"КООРД.","footer.k.copy":"АВТ. ПРАВА",
    "th.idx":"ИНД.","th.name":"ОБРАЗЕЦ","th.img":"ИЗО.","th.tan":"ДУБЛ.","th.grain":"ВОЛОКНО",
    "th.origin":"ПРОИСХ.","th.weight":"ВЕС","th.coord":"КООРД.","th.price":"ЦЕНА",
    "cat.bags":"СУМКИ","cat.belts":"РЕМНИ","cat.wallets":"КОШЕЛЬКИ",
    "cat.jackets":"КУРТКИ","cat.smallgoods":"МЕЛОЧЬ","cat.archive":"АРХИВ",
    "grain.fine":"ТОНК.","grain.medium":"СРЕД.","grain.coarse":"ГРУБ.","grain.raw":"СЫРОЕ","grain.mixed":"СМЕШ.",
    "sort.tan":"ЧАСЫ ДУБЛЕНИЯ","sort.grain":"ПЛОТНОСТЬ ВОЛОКНА","sort.entry":"ДАТА ВХОДА","sort.weight":"ВЕС","sort.idx":"ИНДЕКС ОБРАЗЦА",
    "empty.big":"ХРАНИЛИЩЕ ПУСТО // ПЕРЕКАЛИБРУЙТЕ",
    "empty.sub":"НЕТ ОБРАЗЦОВ В ТЕКУЩЕМ КОРИДОРЕ ТЕЛЕМЕТРИИ",
    "calibrating":"КАЛИБРОВКА…",
    "origin.tuscany":"ТОСКАНА","origin.andalusia":"АНДАЛУСИЯ","origin.morocco":"МАРОККО",
    "origin.kyoto":"КИОТО","origin.archive_unknown":"АРХИВ_НЕИЗВ",
    "nav.index":"ИНДЕКС","nav.vault":"ХРАНИЛИЩЕ","nav.archive":"АРХИВ","nav.journal":"ЖУРНАЛ","nav.contact":"КОНТАКТ","nav.cart":"КОРЗИНА",
    "ms.tannage":"ДУБЛЕНИЕ","ms.hours":"ЧАСЫ","ms.grain":"ВОЛОКНО","ms.origin":"ПРОИСХ.",
    "ms.weight":"ВЕС","ms.coord":"КООРД.","ms.batch":"ПАРТИЯ","ms.finish":"ОТДЕЛКА","ms.entry":"ВХОД"
  }
};

/* ─── Nav items ────────────────────────────────────────────── */
const NAV = [
  { idx:"01", k:"nav.index",   href:"Leather Art Landing.html", id:"index" },
  { idx:"02", k:"nav.vault",   href:"Leather Art Vault Index.html", id:"vault" },
  { idx:"03", k:"nav.archive", href:"#", id:"archive" },
  { idx:"04", k:"nav.journal", href:"#", id:"journal" },
  { idx:"05", k:"nav.contact", href:"#", id:"contact" }
];
const ACTIVE_NAV = "vault";

/* ─── Categories ───────────────────────────────────────────── */
const CATS = [
  { id:"all", num:"00", k:null, isAll:true },
  { id:"bags", num:"01", k:"cat.bags" },
  { id:"belts", num:"02", k:"cat.belts" },
  { id:"wallets", num:"03", k:"cat.wallets" },
  { id:"jackets", num:"04", k:"cat.jackets" },
  { id:"smallgoods", num:"05", k:"cat.smallgoods" },
  { id:"archive", num:"06", k:"cat.archive" }
];

/* ─── Specimens ────────────────────────────────────────────── */
const ORIGINS = ["TUSCANY","ANDALUSIA","MOROCCO","KYOTO","ARCHIVE_UNKNOWN"];
const GRAINS  = ["FINE","MEDIUM","COARSE","RAW","MIXED"];

const SPECIMENS = [
  { i:1,  cat:"bags",       sn:"LA·001·2099", name:"BAG // PROTOCOL_07",   sil:"tote",    tan:148, grain:"MEDIUM", origin:"TUSCANY",        weight:540,  coord:"41.71/44.83", entry:"2099.03.14", price:1480, span:"s1", quote:"A hide is a manuscript; the tannin is the ink.", finish:"Hand-burnished, edge-painted", editorial:"A daily tote born from Tuscan pastures, this specimen carries the warm amber of its origin in every fiber. The vegetable tannage is patient — mimosa bark, pit-soaked for twenty-one days. The result is a grain that deepens with use." },
  { i:2,  cat:"belts",      sn:"LA·002·2099", name:"BELT // SPECIMEN_142", sil:"belt",    tan:96,  grain:"COARSE", origin:"ANDALUSIA",      weight:218,  coord:"37.39/-5.99", entry:"2099.04.02", price:340,  span:"s3", quote:"A belt outlives its wearer.", finish:"Oil-pulled, raw edge", editorial:"Sourced from the plains of Andalusia, this belt uses a deliberately coarse grain for texture and grip. Finished raw — no paint, no polish — it develops its own patina over months of wear." },
  { i:3,  cat:"wallets",    sn:"LA·003·2099", name:"WALLET // ARCHIVE_03", sil:"wallet",  tan:54,  grain:"FINE",   origin:"KYOTO",          weight:96,   coord:"35.01/135.7", entry:"2099.04.18", price:280,  span:"s2", quote:"Stitched once. Carried always.", finish:"Saddle-stitched, slicked", editorial:"A bifold wallet from a single shell, skived to 1.1mm at the fold and saddle-stitched with waxed linen. The Kyoto origin gives it a distinctly tight grain that resists scratching." },
  { i:4,  cat:"bags",       sn:"LA·004·2099", name:"BAG // CARRARA_28",    sil:"satchel", tan:192, grain:"FINE",   origin:"TUSCANY",        weight:684,  coord:"44.07/10.10", entry:"2099.05.04", price:1980, span:"s2", quote:"Patience is the eighth tannin.", finish:"Hand-burnished, 4 coats edge", editorial:"Twenty-eight days in the pit. The Carrara satchel is the longest tannage in the current cycle — a specimen of pure patience. Its fine Tuscan grain carries depth and warmth that shorter processes never achieve." },
  { i:5,  cat:"belts",      sn:"LA·005·2099", name:"BELT // FIELD_021",    sil:"belt",    tan:72,  grain:"RAW",    origin:"ANDALUSIA",      weight:286,  coord:"37.18/-3.60", entry:"2099.05.21", price:380,  span:"s3", quote:"Wear it raw. Let it remember.", finish:"Brass keeper, raw burnish", editorial:"This field belt is intentionally left raw. The Andalusian hide carries natural scars and marks — each one a record. Paired with a solid brass keeper and a single tongue, it is built to outlast trends." },
  { i:6,  cat:"smallgoods", sn:"LA·006·2099", name:"NOTEBOOK // 84",       sil:"book",    tan:48,  grain:"FINE",   origin:"KYOTO",          weight:312,  coord:"35.01/135.7", entry:"2099.06.07", price:240,  span:"s6", quote:"Eighty-four blank specimens.", finish:"Blind-debossed, hand-bound", editorial:"Hand-bound in Kyoto-sourced leather, with eighty-four pages of tan card stock. The blind-debossed vault sigil on the cover sinks into the grain over time, becoming more visible with age." },
  { i:7,  cat:"jackets",    sn:"LA·007·2099", name:"JACKET // PROTOTYPE_A",sil:"jacket",  tan:228, grain:"MEDIUM", origin:"MOROCCO",        weight:2640, coord:"31.79/-7.09", entry:"2099.06.22", price:5400, span:"s7", quote:"A second skin, slowly earned.", finish:"Drum-dyed, lined cotton", editorial:"The first jacket prototype in the archive. Drum-dyed in Morocco using a single chocolate vat, then lined in raw cotton. It is heavy — deliberately so. A second skin that takes months to break in." },
  { i:8,  cat:"bags",       sn:"LA·008·2099", name:"BAG // ARCHIVE_55",    sil:"brief",   tan:196, grain:"FINE",   origin:"TUSCANY",        weight:1420, coord:"43.77/11.25", entry:"2099.07.03", price:2840, span:"s5", quote:"It carries the year, not the day.", finish:"5 coats edge, cotton lined", editorial:"A two-compartment briefcase for archival purposes. Saddle-stitched, drum-dyed in chocolate, and lined in raw cotton. Designed to carry weight evenly, the Archive_55 distributes its load across reinforced seams." },
  { i:9,  cat:"smallgoods", sn:"LA·009·2099", name:"CARDHOLDER // 12",     sil:"wallet",  tan:48,  grain:"FINE",   origin:"KYOTO",          weight:42,   coord:"35.01/135.7", entry:"2099.07.18", price:160,  span:"s6", quote:"Twelve cards, twelve months.", finish:"Saddle-stitched, slicked", editorial:"A cardholder designed for twelve cards — one for each month. Thin Kyoto shell, fine grain, minimal stitching. The leather compresses over the year, molding to your exact stack." },
  { i:10, cat:"wallets",    sn:"LA·010·2099", name:"WALLET // LONG_05",    sil:"wallet",  tan:88,  grain:"MEDIUM", origin:"ANDALUSIA",      weight:128,  coord:"36.72/-4.42", entry:"2099.08.04", price:380,  span:"s2", quote:"", finish:"Saddle-stitched, burnished", editorial:"A long wallet format — designed for notes folded once, not twice. Andalusian medium grain provides structure without stiffness. Burnished edges, no paint, for a clean utilitarian finish." },
  { i:11, cat:"jackets",    sn:"LA·011·2099", name:"JACKET // FIELDCOAT_C",sil:"jacket",  tan:168, grain:"MIXED",  origin:"ARCHIVE_UNKNOWN",weight:2980, coord:"??.??/??.??", entry:"2099.08.21", price:6200, span:"s8", quote:"Catalogued by hand. Origin redacted.", finish:"Origin unknown, hand-catalogued", editorial:"The origin of this hide is redacted. Filed under ARCHIVE_UNKNOWN, the Fieldcoat_C carries a mixed grain that suggests multiple sources — possibly reclaimed, possibly experimental. It arrived without documentation." },
  { i:12, cat:"belts",      sn:"LA·012·2099", name:"BELT // DRESS_034",    sil:"belt",    tan:120, grain:"FINE",   origin:"TUSCANY",        weight:172,  coord:"43.77/11.25", entry:"2099.09.02", price:420,  span:"s3", quote:"", finish:"Polished, fine grain", editorial:"A dress belt in fine Tuscan grain. Polished to a quiet sheen, it reflects light without flash. Thinner than the field belts, it is designed for tailoring — pairing with structured trousers and jackets." },
  { i:13, cat:"archive",    sn:"LA·013·2099", name:"PATCH // BLIND_002",   sil:"book",    tan:60,  grain:"RAW",    origin:"MOROCCO",        weight:18,   coord:"31.79/-7.09", entry:"2099.09.19", price:48,   span:"s6", quote:"", finish:"Blind-stamped, raw", editorial:"A square patch of raw Moroccan leather, blind-stamped with the vault sigil. Intended for repair, customization, or as a collector's specimen. Each patch is unique — the raw grain guarantees that." },
  { i:14, cat:"bags",       sn:"LA·014·2099", name:"BAG // POUCH_19",      sil:"tote",    tan:96,  grain:"MEDIUM", origin:"KYOTO",          weight:208,  coord:"35.01/135.7", entry:"2099.10.05", price:520,  span:"s9", quote:"", finish:"Drawstring, waxed cord", editorial:"A soft drawstring pouch in Kyoto medium grain. No rigid structure — it conforms to its contents. Waxed linen cord closure, unlined interior. Designed for objects that deserve contact with raw leather." },
  { i:15, cat:"smallgoods", sn:"LA·015·2099", name:"KEY FOB // 03",        sil:"wallet",  tan:48,  grain:"FINE",   origin:"ANDALUSIA",      weight:24,   coord:"37.39/-5.99", entry:"2099.10.21", price:80,   span:"s6", quote:"", finish:"Rivet, burnished", editorial:"A key fob in fine Andalusian grain, fastened with a single copper rivet. Burnished edges, no stitching. It darkens with pocket wear, developing a deep chocolate patina in three to four months." },
  { i:16, cat:"archive",    sn:"LA·016·2099", name:"FILE // RAW_HIDE_07",  sil:"satchel", tan:240, grain:"MIXED",  origin:"ARCHIVE_UNKNOWN",weight:1840, coord:"??.??/??.??", entry:"2099.11.02", price:1200, span:"s4", quote:"Sourced. Untouched. Filed.", finish:"Untouched, raw archival", editorial:"The longest tannage in the vault — two hundred and forty hours. This specimen was sourced, tanned, and filed without any finishing. It exists purely as a record: raw hide, fully processed, never touched by hand or tool." }
];

const TOTAL_SPECIMENS = 247;
const IN_VAULT = 12;

/* ─── Silhouettes ──────────────────────────────────────────── */
function silhouette(kind, color){
  const stroke = color || "#3D1F0F";
  const s = `stroke="${stroke}" stroke-width="0.8" fill="none" stroke-linejoin="round"`;
  switch(kind){
    case "tote": return `<svg viewBox="0 0 200 200" ${s}><path d="M40 70 L40 180 Q40 188 48 188 L152 188 Q160 188 160 180 L160 70 Z"/><path d="M70 70 Q70 35 100 35 Q130 35 130 70"/><path d="M40 90 L160 90"/><path d="M86 130 L114 130"/></svg>`;
    case "wallet": return `<svg viewBox="0 0 200 200" ${s}><rect x="36" y="76" width="128" height="78"/><path d="M100 76 L100 154"/><rect x="48" y="92" width="40" height="8"/><rect x="112" y="92" width="40" height="8"/><circle cx="142" cy="115" r="4"/></svg>`;
    case "satchel": return `<svg viewBox="0 0 200 240" ${s}><path d="M30 70 L30 200 Q30 220 50 220 L150 220 Q170 220 170 200 L170 70 Z"/><path d="M30 70 L40 50 L160 50 L170 70"/><path d="M70 50 Q70 22 100 22 Q130 22 130 50"/><path d="M30 100 L170 100"/><circle cx="100" cy="135" r="5"/></svg>`;
    case "belt": return `<svg viewBox="0 0 240 120" ${s}><rect x="20" y="50" width="180" height="20"/><rect x="200" y="44" width="22" height="32"/><path d="M210 50 L210 70"/><circle cx="40" cy="60" r="2.4"/><circle cx="56" cy="60" r="2.4"/><circle cx="72" cy="60" r="2.4"/><circle cx="88" cy="60" r="2.4"/></svg>`;
    case "brief": return `<svg viewBox="0 0 240 180" ${s}><rect x="30" y="50" width="180" height="110"/><path d="M90 50 Q90 28 120 28 Q150 28 150 50"/><path d="M30 90 L210 90"/><rect x="108" y="98" width="24" height="14"/></svg>`;
    case "book": return `<svg viewBox="0 0 200 220" ${s}><rect x="50" y="30" width="100" height="160"/><path d="M150 30 L156 36 L156 196 L150 190"/><path d="M64 60 L136 60 M64 70 L120 70"/><path d="M75 130 L125 130"/></svg>`;
    case "jacket": return `<svg viewBox="0 0 220 240" ${s}><path d="M60 60 L40 80 L40 200 L80 200 L80 100 L100 60 Z"/><path d="M160 60 L180 80 L180 200 L140 200 L140 100 L120 60 Z"/><path d="M100 60 L110 90 L120 60"/><path d="M110 90 L110 200"/><circle cx="120" cy="130" r="2"/><circle cx="120" cy="150" r="2"/><circle cx="120" cy="170" r="2"/></svg>`;
  }
  return "";
}

/* Schematic overlay SVG */
function schematicSvg(){
  const c = 'stroke="#F0E4D2" stroke-width="0.6" fill="none"';
  const cd = 'stroke="#F0E4D2" stroke-width="0.5" stroke-dasharray="2 3" fill="none"';
  return `<svg viewBox="0 0 240 240" preserveAspectRatio="xMidYMid meet">
    <g ${cd}><line x1="20" y1="20" x2="220" y2="20"/><line x1="20" y1="220" x2="220" y2="220"/><line x1="20" y1="20" x2="20" y2="220"/><line x1="220" y1="20" x2="220" y2="220"/></g>
    <g ${c}><line x1="20" y1="60" x2="220" y2="60"/><line x1="20" y1="180" x2="220" y2="180"/><line x1="80" y1="20" x2="80" y2="220"/><line x1="160" y1="20" x2="160" y2="220"/><circle cx="120" cy="120" r="56"/><circle cx="120" cy="120" r="2.4" fill="#F0E4D2"/><line x1="120" y1="64" x2="120" y2="176"/><line x1="64" y1="120" x2="176" y2="120"/></g>
    <g fill="#F0E4D2" font-family="JetBrains Mono" font-size="7" letter-spacing="0.5"><text x="22" y="14">A.01</text><text x="200" y="14">A.02</text><text x="22" y="234">B.01</text><text x="200" y="234">B.02</text><text x="124" y="118">⌖</text></g>
  </svg>`;
}

function rowMeasureSvg(){
  return `<svg viewBox="0 0 70 30" preserveAspectRatio="none"><g stroke="#3D1F0F" stroke-width="0.5" fill="none"><line x1="2" y1="6" x2="68" y2="6"/><line x1="2" y1="6" x2="2" y2="14"/><line x1="68" y1="6" x2="68" y2="14"/><line x1="35" y1="14" x2="35" y2="22" stroke-dasharray="2 2"/><line x1="2" y1="22" x2="68" y2="22"/></g><text x="2" y="29" font-family="JetBrains Mono" font-size="5" fill="#3D1F0F">A.01—A.02</text></svg>`;
}

/* Gallery views for each silhouette: 4 slightly different viewpoints */
function galleryViews(kind, color){
  const c = color || "#3D1F0F";
  const base = silhouette(kind, c);
  // Rotate/offset the base silhouette to simulate different angles
  const s = `stroke="${c}" stroke-width="0.8" fill="none" stroke-linejoin="round"`;
  const views = [base];
  // view 2: detail/close crop
  switch(kind){
    case "tote": views.push(`<svg viewBox="30 60 100 80" ${s}><path d="M40 70 L40 130 Q40 135 48 135 L92 135 Q100 135 100 130 L100 70 Z"/><path d="M40 90 L100 90"/><path d="M60 105 L80 105"/></svg>`); break;
    case "wallet": views.push(`<svg viewBox="30 70 140 90" ${s}><rect x="36" y="76" width="128" height="78"/><path d="M100 76 L100 154"/><rect x="48" y="92" width="40" height="8"/></svg>`); break;
    case "satchel": views.push(`<svg viewBox="20 40 160 140" ${s}><path d="M30 70 L30 160 Q30 170 50 170 L150 170 Q170 170 170 160 L170 70 Z"/><path d="M30 100 L170 100"/><circle cx="100" cy="130" r="8"/></svg>`); break;
    case "belt": views.push(`<svg viewBox="10 40 120 40" ${s}><rect x="20" y="50" width="100" height="20"/><circle cx="40" cy="60" r="3"/><circle cx="56" cy="60" r="3"/><circle cx="72" cy="60" r="3"/></svg>`); break;
    case "brief": views.push(`<svg viewBox="20 20 200 140" ${s}><rect x="30" y="50" width="180" height="100"/><path d="M30 90 L210 90"/><rect x="108" y="96" width="24" height="14"/></svg>`); break;
    case "book": views.push(`<svg viewBox="40 20 120 180" ${s}><rect x="50" y="30" width="100" height="160"/><path d="M150 30 L156 36 L156 196 L150 190"/></svg>`); break;
    case "jacket": views.push(`<svg viewBox="30 50 160 160" ${s}><path d="M60 60 L40 80 L40 200 L80 200 L80 100 L100 60 Z"/><path d="M160 60 L180 80 L180 200 L140 200 L140 100 L120 60 Z"/></svg>`); break;
    default: views.push(base);
  }
  // views 3 & 4: simple measurement/construction variants
  views.push(`<svg viewBox="0 0 240 240" stroke="${c}" stroke-width="0.5" fill="none"><line x1="20" y1="40" x2="220" y2="40" stroke-dasharray="3 4"/><line x1="20" y1="120" x2="220" y2="120" stroke-dasharray="3 4"/><line x1="20" y1="200" x2="220" y2="200" stroke-dasharray="3 4"/><line x1="60" y1="20" x2="60" y2="220" stroke-dasharray="3 4"/><line x1="120" y1="20" x2="120" y2="220" stroke-dasharray="3 4"/><line x1="180" y1="20" x2="180" y2="220" stroke-dasharray="3 4"/><circle cx="120" cy="120" r="44"/><text x="126" y="118" font-family="JetBrains Mono" font-size="8" fill="${c}">⌖</text></svg>`);
  views.push(`<svg viewBox="0 0 200 200" stroke="${c}" stroke-width="0.6" fill="none"><rect x="30" y="30" width="140" height="140"/><line x1="30" y1="30" x2="170" y2="170"/><line x1="170" y1="30" x2="30" y2="170"/><circle cx="100" cy="100" r="50"/><text x="86" y="22" font-family="JetBrains Mono" font-size="7" fill="${c}">SPEC</text></svg>`);
  return views;
}

/* ─── State ────────────────────────────────────────────────── */
let lang = "EN";
let activeCat = "all";
let view = "dossier";
let selected = [];
let filters = { tanLo: 48, tanHi: 240, grain: null, origins: new Set(ORIGINS), wLo: 0, wHi: 3000, dLo: "2099.03.14", dHi: "2099.11.02", sort: "idx" };
const SORTS = ["tan","grain","entry","weight","idx"];
let modalSpecId = null;
let modalImgIdx = 0;
let currentFilteredList = [];

/* ─── Helpers ──────────────────────────────────────────────── */
function t(k){ return I18N[lang][k] ?? I18N.EN[k] ?? k; }
function pad3(n){ return String(n).padStart(3,"0"); }
function pad2(n){ return String(n).padStart(2,"0"); }
function grainDensity(g){ return ({FINE:7.4,MEDIUM:6.9,COARSE:6.2,RAW:5.8,MIXED:6.5})[g]?.toFixed(1) ?? "6.8"; }

/* ─── Apply static i18n ────────────────────────────────────── */
function applyStatic(){
  document.querySelectorAll("[data-k]").forEach(el=>{
    const k = el.getAttribute("data-k");
    const v = I18N[lang][k];
    if(v != null) el.textContent = v;
  });
  document.documentElement.lang = lang === "KA" ? "ka" : lang === "RU" ? "ru" : "en";
}

/* ─── Primary Nav ──────────────────────────────────────────── */
function renderNav(){
  const links = document.getElementById("pnavLinks");
  links.innerHTML = NAV.map(n=>`
    <a href="${n.href}" class="${n.id===ACTIVE_NAV?'active':''}">
      <span class="dot" aria-hidden="true"></span>
      <span class="idx">${n.idx}</span>
      <span data-k="${n.k}">${t(n.k)}</span>
    </a>
  `).join("");

  const mob = document.getElementById("pnavMobLinks");
  mob.innerHTML = NAV.map(n=>`
    <a href="${n.href}" class="${n.id===ACTIVE_NAV?'active':''}">
      <span class="idx">${n.idx}</span>
      <span>${t(n.k)}</span>
    </a>
  `).join("");
}
document.getElementById("pnavHam").addEventListener("click",()=>{
  const m = document.getElementById("pnavMobile");
  m.classList.add("open"); m.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
});
document.getElementById("pnavMobClose").addEventListener("click",()=>{
  const m = document.getElementById("pnavMobile");
  m.classList.remove("open"); m.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
});

/* ─── Categories ───────────────────────────────────────────── */
function categoryCount(id){ return id==="all" ? SPECIMENS.length : SPECIMENS.filter(s=>s.cat===id).length; }
function renderCategories(){
  const root = document.getElementById("catBlocks");
  root.innerHTML = CATS.map(c=>{
    const label = c.isAll ? (lang==='KA'?'ყველა':lang==='RU'?'ВСЕ':'ALL') : t(c.k);
    return `<div class="cat-block ${c.id===activeCat?'active':''}" data-id="${c.id}">
      <div class="num">${c.num}</div>
      <div class="meta"><div class="nm">${label}</div><div class="ct">${pad3(categoryCount(c.id))} <span style="opacity:.6">SPM</span></div></div>
    </div>`;
  }).join("");
  root.querySelectorAll(".cat-block").forEach(el=>{
    el.addEventListener("click",()=>{ activeCat = el.dataset.id; renderCategories(); calibrateAndRender(); });
  });
  const strip = document.getElementById("catStrip");
  strip.innerHTML = CATS.map(c=>{
    const label = c.isAll ? (lang==='KA'?'ყველა':lang==='RU'?'ВСЕ':'ALL') : t(c.k);
    return `<button class="${c.id===activeCat?'active':''}" data-id="${c.id}"><span class="num">${c.num}</span><span>${label}</span></button>`;
  }).join("");
  strip.querySelectorAll("button").forEach(el=>{
    el.addEventListener("click",()=>{ activeCat = el.dataset.id; renderCategories(); calibrateAndRender(); });
  });
}

/* ─── Filters ──────────────────────────────────────────────── */
function renderGrainStepper(){
  const root = document.getElementById("grainStepper");
  root.innerHTML = GRAINS.map(g=>`<button class="${filters.grain===g?'active':''}" data-g="${g}">${t("grain."+g.toLowerCase())}</button>`).join("");
  root.querySelectorAll("button").forEach(b=>{
    b.addEventListener("click",()=>{ filters.grain = (filters.grain===b.dataset.g)?null:b.dataset.g; renderGrainStepper(); calibrateAndRender(); });
  });
}
function renderOrigins(){
  const root = document.getElementById("originList");
  root.innerHTML = ORIGINS.map(o=>{
    const checked = filters.origins.has(o);
    const ct = SPECIMENS.filter(s=>s.origin===o).length;
    return `<button data-o="${o}"><span class="box mono">[${checked?'X':' '}]</span><span>${t("origin."+o.toLowerCase())}</span><span class="ct">${pad2(ct)}</span></button>`;
  }).join("");
  root.querySelectorAll("button").forEach(b=>{
    b.addEventListener("click",()=>{ const o=b.dataset.o; if(filters.origins.has(o)) filters.origins.delete(o); else filters.origins.add(o); renderOrigins(); calibrateAndRender(); });
  });
}
function renderSortList(){
  const root = document.getElementById("sortList");
  root.innerHTML = SORTS.map(s=>`<button class="${filters.sort===s?'active':''}" data-s="${s}">${t("sort."+s)}</button>`).join("");
  root.querySelectorAll("button").forEach(b=>{
    b.addEventListener("click",()=>{ filters.sort=b.dataset.s; renderSortList(); calibrateAndRender(); });
  });
}
function setupRange(){
  const lo=document.getElementById("tanRangeLo"), hi=document.getElementById("tanRangeHi"), fill=document.getElementById("tanFill");
  function update(){
    let a=+lo.value, b=+hi.value;
    if(a>b-1){ if(this===lo) lo.value=(b-1); else hi.value=(a+1); a=+lo.value; b=+hi.value; }
    filters.tanLo=a; filters.tanHi=b;
    document.getElementById("tanLo").textContent=pad3(a);
    document.getElementById("tanHi").textContent=pad3(b);
    const min=+lo.min,max=+lo.max;
    fill.style.left=((a-min)/(max-min)*100)+"%";
    fill.style.right=(100-(b-min)/(max-min)*100)+"%";
    calibrateAndRender();
  }
  lo.addEventListener("input",update); hi.addEventListener("input",update); update.call(lo);
}
function setupNumberInputs(){
  document.getElementById("wLo").addEventListener("input",e=>{filters.wLo=+e.target.value||0;calibrateAndRender();});
  document.getElementById("wHi").addEventListener("input",e=>{filters.wHi=+e.target.value||0;calibrateAndRender();});
  document.getElementById("dLo").addEventListener("input",e=>{filters.dLo=e.target.value;calibrateAndRender();});
  document.getElementById("dHi").addEventListener("input",e=>{filters.dHi=e.target.value;calibrateAndRender();});
}

/* ─── Filter & sort ────────────────────────────────────────── */
function applyFilters(){
  let out = SPECIMENS.slice();
  if(activeCat!=="all") out=out.filter(s=>s.cat===activeCat);
  out=out.filter(s=>s.tan>=filters.tanLo&&s.tan<=filters.tanHi);
  if(filters.grain) out=out.filter(s=>s.grain===filters.grain);
  out=out.filter(s=>filters.origins.has(s.origin));
  out=out.filter(s=>s.weight>=filters.wLo&&s.weight<=filters.wHi);
  out=out.filter(s=>s.entry>=filters.dLo&&s.entry<=filters.dHi);
  const go={FINE:0,MEDIUM:1,COARSE:2,RAW:3,MIXED:4};
  switch(filters.sort){
    case "tan":out.sort((a,b)=>a.tan-b.tan);break;
    case "grain":out.sort((a,b)=>go[a.grain]-go[b.grain]);break;
    case "entry":out.sort((a,b)=>a.entry<b.entry?-1:a.entry>b.entry?1:0);break;
    case "weight":out.sort((a,b)=>a.weight-b.weight);break;
    case "idx":out.sort((a,b)=>a.i-b.i);break;
  }
  return out;
}

/* ─── Render results ───────────────────────────────────────── */
function renderResults(){
  const list = applyFilters();
  currentFilteredList = list;
  const calib = document.getElementById("calibText");
  calib.innerHTML = `<b id="cShown">${pad3(list.length)}</b> / <b id="cTotal">${pad3(SPECIMENS.length)}</b>`;

  // Dossier
  const dossier = document.getElementById("dossier");
  if(list.length===0){
    dossier.innerHTML = `<div class="empty"><div class="big">${t("empty.big")}</div><div class="sub">${t("empty.sub")}</div></div>`;
  } else {
    dossier.innerHTML = `<div class="dossier-head">
        <div class="h-thumb">${t("th.img")}</div>
        <div>${t("th.idx")}</div><div>${t("th.name")}</div><div>${t("th.tan")}</div>
        <div class="h-grain">${t("th.grain")}</div><div>${t("th.origin")}</div>
        <div class="h-weight">${t("th.weight")}</div><div>${t("th.price")}</div><div></div>
      </div>` +
      list.map(s=>`<div class="drow ${selected.includes(s.i)?'selected':''}" data-i="${s.i}">
        <div class="drow-thumb"><div class="img-frame">${silhouette(s.sil)}</div></div>
        <div class="mono">${pad2(s.i)}/${pad3(SPECIMENS.length)}</div>
        <div class="nm">${s.name}</div>
        <div class="v">${pad3(s.tan)}H</div>
        <div class="v c-grain">${t("grain."+s.grain.toLowerCase())}</div>
        <div class="v">${t("origin."+s.origin.toLowerCase())}</div>
        <div class="v c-weight">${s.weight} G</div>
        <div class="price">€${s.price}</div>
        <button class="add" data-add="${s.i}" aria-label="add to compare">${selected.includes(s.i)?'×':'+'}</button>
        <span class="meas" aria-hidden="true">${rowMeasureSvg()}</span>
      </div>`).join("");
  }

  // Specimen grid
  const grid = document.getElementById("specGrid");
  if(list.length===0){
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1;"><div class="big">${t("empty.big")}</div><div class="sub">${t("empty.sub")}</div></div>`;
  } else {
    grid.innerHTML = list.map(s=>`<article class="scard ${s.span} ${selected.includes(s.i)?'selected':''}" data-i="${s.i}">
        <div class="scard-head"><span class="sn mono">${s.sn}</span><span class="mono">${pad2(s.i)} / ${pad3(SPECIMENS.length)}</span></div>
        <div class="scard-img"><div class="img-frame">${silhouette(s.sil)}</div></div>
        <h3 class="scard-name">${s.name}</h3>
        <div class="scard-meta">
          <div><span class="k">${t("th.tan")}</span>${pad3(s.tan)}H</div>
          <div><span class="k">${t("th.origin")}</span>${t("origin."+s.origin.toLowerCase())}</div>
          <div><span class="k">${t("th.weight")}</span>${s.weight} G</div>
        </div>
        <div class="scard-foot"><span class="price">€${s.price}</span><button class="add" data-add="${s.i}" aria-label="add to compare">${selected.includes(s.i)?'×':'+'}</button></div>
        <div class="schematic" aria-hidden="true">
          <div class="head"><span>SCHEMATIC · ${s.sn}</span><span>${pad2(s.i)} / ${pad3(SPECIMENS.length)}</span></div>
          <div class="draw">${schematicSvg()}</div>
          <div class="foot">
            <div><span class="k">${t("th.tan")}</span>${pad3(s.tan)}H</div>
            <div><span class="k">${t("th.origin")}</span>${t("origin."+s.origin.toLowerCase())}</div>
            <div><span class="k">${t("th.weight")}</span>${s.weight} G</div>
          </div>
        </div>
      </article>`).join("");
  }

  // Wire events
  document.querySelectorAll(".drow").forEach(el=>{ el.addEventListener("click",e=>{ if(e.target.closest("[data-add]")) return; openModal(+el.dataset.i); }); });
  document.querySelectorAll(".scard").forEach(el=>{ el.addEventListener("click",e=>{ if(e.target.closest("[data-add]")) return; openModal(+el.dataset.i); }); });
  document.querySelectorAll("[data-add]").forEach(b=>{ b.addEventListener("click",e=>{ e.stopPropagation(); toggleSelect(+b.dataset.add); }); });
}

/* ─── Calibrating flicker ──────────────────────────────────── */
let calibTimer;
function calibrateAndRender(){
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const calib = document.getElementById("calibText");
  if(reduced){ renderResults(); return; }
  calib.classList.add("calibrating-flicker");
  calib.innerHTML = `<b>${t("calibrating")}</b>`;
  clearTimeout(calibTimer);
  calibTimer = setTimeout(()=>{ calib.classList.remove("calibrating-flicker"); renderResults(); }, 200);
}

/* ─── Compare drawer ───────────────────────────────────────── */
function toggleSelect(id){
  if(selected.includes(id)) selected=selected.filter(x=>x!==id);
  else if(selected.length<3) selected.push(id);
  else { selected.shift(); selected.push(id); }
  document.getElementById("cSel").textContent=pad3(selected.length);
  renderResults(); renderDrawer();
}
function renderDrawer(){
  const drawer=document.getElementById("drawer"), slots=document.getElementById("drawerSlots");
  document.getElementById("drawerCt").textContent=selected.length;
  if(selected.length>0){ drawer.classList.add("open"); drawer.setAttribute("aria-hidden","false"); }
  else { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden","true"); }
  let html="";
  for(let i=0;i<3;i++){
    const id=selected[i];
    if(id==null){ html+=`<div class="dslot empty">${t("drawer.empty")}</div>`; }
    else {
      const s=SPECIMENS.find(x=>x.i===id);
      html+=`<div class="dslot"><div class="top"><span class="nm">${s.name}</span><button class="rm" data-rm="${s.i}">[ × ]</button></div>
        <div class="mono" style="color:var(--mid);font-size:10px;letter-spacing:0.1em;">${s.sn}</div>
        <div class="rows">
          <div><span class="k">${t("th.tan")}</span><span>${pad3(s.tan)}H</span></div>
          <div><span class="k">${t("th.grain")}</span><span>${t("grain."+s.grain.toLowerCase())}</span></div>
          <div><span class="k">${t("th.origin")}</span><span>${t("origin."+s.origin.toLowerCase())}</span></div>
          <div><span class="k">${t("th.weight")}</span><span>${s.weight} G</span></div>
          <div><span class="k">${t("th.price")}</span><span>€${s.price}</span></div>
        </div></div>`;
    }
  }
  slots.innerHTML=html;
  slots.querySelectorAll("[data-rm]").forEach(b=>{ b.addEventListener("click",()=>{toggleSelect(+b.dataset.rm);}); });
}
document.getElementById("drawerClear").addEventListener("click",()=>{
  selected=[]; document.getElementById("cSel").textContent="000"; renderResults(); renderDrawer();
});

/* ─── Modal ────────────────────────────────────────────────── */
function openModal(id){
  const s = SPECIMENS.find(x=>x.i===id); if(!s) return;
  modalSpecId = id;
  modalImgIdx = 0;

  // breadcrumb
  const catName = CATS.find(c=>c.id===s.cat);
  const catLabel = catName && catName.k ? t(catName.k) : t("modal.bc.all");
  document.getElementById("modalBc").innerHTML = `<span>${t("modal.bc.vault")}</span><span class="sep"> // </span><span>${catLabel}</span><span class="sep"> // </span><span class="cur">${s.name.replace(" // ","_")}</span>`;

  // specimen idx
  document.getElementById("modalIdx").textContent = `SPECIMEN ${pad2(s.i)} / ${pad3(TOTAL_SPECIMENS)}`;

  // name
  const parts = s.name.split(" // ");
  document.getElementById("modalName").innerHTML = parts.length===2
    ? `${parts[0]}<br/><span class="slash">//</span>${parts[1]}`
    : s.name;

  // tagline
  document.getElementById("modalTagline").textContent = s.quote || "";

  // spec table
  const spec = document.getElementById("modalSpec");
  spec.innerHTML = [
    [t("ms.tannage"), "Vegetable · mimosa"],
    [t("ms.hours"), `${pad3(s.tan)} hrs`],
    [t("ms.grain"), `${grainDensity(s.grain)} fibers/mm² · ${t("grain."+s.grain.toLowerCase())}`],
    [t("ms.origin"), t("origin."+s.origin.toLowerCase())],
    [t("ms.weight"), `${s.weight} g · ±6`],
    [t("ms.coord"), s.coord],
    [t("ms.batch"), s.sn],
    [t("ms.finish"), s.finish],
    [t("ms.entry"), s.entry]
  ].map(([k,v])=>`<div class="row"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("");

  // editorial
  document.getElementById("modalEditorial").textContent = s.editorial;

  // price
  document.getElementById("modalPrice").innerHTML = `€${s.price}`;

  // compare button text
  const cmpBtn = document.getElementById("modalCompare");
  cmpBtn.textContent = selected.includes(s.i) ? `${t("modal.compare").replace("[+]","[×]")}` : t("modal.compare");

  // gallery
  renderGallery(s);

  // show
  const backdrop = document.getElementById("modalBackdrop");
  backdrop.classList.add("open"); backdrop.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}

function renderGallery(s){
  const views = galleryViews(s.sil);
  // Primary
  const primary = document.getElementById("modalPrimary");
  primary.innerHTML = `<div class="img-wrap">${views[modalImgIdx]}</div>`;

  // Thumbs
  const thumbs = document.getElementById("modalThumbs");
  thumbs.innerHTML = views.map((v,i)=>`<button class="${i===modalImgIdx?'active':''}" data-gi="${i}">${v}</button>`).join("");
  thumbs.querySelectorAll("button").forEach(b=>{
    b.addEventListener("click",()=>{
      const idx = +b.dataset.gi;
      if(idx === modalImgIdx) return;
      // cross-fade
      const wrap = primary.querySelector(".img-wrap");
      if(wrap) wrap.classList.add("fading");
      setTimeout(()=>{
        modalImgIdx = idx;
        primary.innerHTML = `<div class="img-wrap">${views[modalImgIdx]}</div>`;
        thumbs.querySelectorAll("button").forEach(x=>x.classList.toggle("active", +x.dataset.gi===modalImgIdx));
        updateCaption();
      }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220);
    });
  });
  updateCaption();
}

function updateCaption(){
  document.getElementById("modalCaption").textContent = `IMG ${pad2(modalImgIdx+1)} / 04`;
}

function closeModal(){
  const backdrop = document.getElementById("modalBackdrop");
  const modal = backdrop.querySelector(".modal");
  modal.style.opacity = "0";
  modal.style.transform = "translateY(8px)";
  setTimeout(()=>{
    backdrop.classList.remove("open"); backdrop.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    modal.style.opacity = ""; modal.style.transform = "";
  }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180);
}

function modalNav(dir){
  if(!currentFilteredList.length) return;
  const idx = currentFilteredList.findIndex(s=>s.i===modalSpecId);
  if(idx===-1) return;
  let next = idx + dir;
  if(next < 0) next = currentFilteredList.length - 1;
  if(next >= currentFilteredList.length) next = 0;
  openModal(currentFilteredList[next].i);
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalPrev").addEventListener("click", ()=>modalNav(-1));
document.getElementById("modalNext").addEventListener("click", ()=>modalNav(1));
document.getElementById("modalCompare").addEventListener("click", ()=>{
  if(modalSpecId != null) toggleSelect(modalSpecId);
  const cmpBtn = document.getElementById("modalCompare");
  cmpBtn.textContent = selected.includes(modalSpecId) ? `${t("modal.compare").replace("[+]","[×]")}` : t("modal.compare");
});
document.getElementById("modalBackdrop").addEventListener("click", e=>{
  if(e.target === e.currentTarget) closeModal();
});
document.addEventListener("keydown", e=>{
  if(!document.getElementById("modalBackdrop").classList.contains("open")) return;
  if(e.key === "Escape") closeModal();
  if(e.key === "ArrowLeft") modalNav(-1);
  if(e.key === "ArrowRight") modalNav(1);
});

/* ─── View toggle ──────────────────────────────────────────── */
document.querySelectorAll(".view-toggle button").forEach(b=>{
  b.addEventListener("click",()=>{
    view=b.dataset.view;
    document.querySelectorAll(".view-toggle button").forEach(x=>x.classList.toggle("active",x.dataset.view===view));
    document.getElementById("viewDossier").classList.toggle("hide",view!=="dossier");
    document.getElementById("viewSpecimen").classList.toggle("hide",view!=="specimen");
  });
});

/* ─── Counter count-up ─────────────────────────────────────── */
function countUp(elId,to,dur){
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el=document.getElementById(elId);
  if(!el) return;
  if(reduced){el.textContent=pad3(to);return;}
  const start=performance.now();
  function tick(now){
    const node=document.getElementById(elId);
    if(!node) return;
    const p=Math.min(1,(now-start)/dur);
    const eased=1-Math.pow(1-p,3);
    node.textContent=pad3(Math.round(to*eased));
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ─── Live timestamp ───────────────────────────────────────── */
function tickClock(){
  const d=new Date(), tsEl=document.getElementById("ts");
  if(tsEl) tsEl.textContent=`2099.${pad2(d.getMonth()+1)}.${pad2(d.getDate())} · ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())} UTC`;
}

/* ─── Lang switch ──────────────────────────────────────────── */
function setLang(next){
  lang=next;
  document.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("active",b.dataset.lang===next));
  applyStatic(); renderNav(); renderCategories(); renderGrainStepper(); renderOrigins(); renderSortList(); renderResults(); renderDrawer();
}
document.querySelectorAll(".lang button").forEach(b=>{
  b.addEventListener("click",()=>setLang(b.dataset.lang));
});

/* ─── Custom cursor ────────────────────────────────────────── */
(function cursor(){
  if(matchMedia("(pointer: coarse)").matches) return;
  const c=document.getElementById("cursor"),tr=document.getElementById("cursorTrail");
  let x=-50,y=-50,tx=-50,ty=-50;
  document.addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;});
  function loop(){
    tx+=(x-tx)*0.18; ty+=(y-ty)*0.18;
    c.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    tr.style.transform=`translate3d(${tx}px,${ty}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.addEventListener("mousemove",e=>{
      c.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
      tr.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
    });
  } else { loop(); }
  document.addEventListener("mousemove",e=>{
    const el=e.target; if(!el||!el.closest) return;
    const inSpec=el.closest(".scard, .drow");
    const inFilter=el.closest(".right-rail, .stepper, .sort-list, .origins");
    document.body.classList.toggle("cursor-cross",!!inSpec);
    document.body.classList.toggle("cursor-square",!!inFilter&&!inSpec);
  });
})();

/* ─── Mobile filter ────────────────────────────────────────── */
document.getElementById("filterFab").addEventListener("click",()=>{document.getElementById("rightRail").classList.add("mobile-open");});
document.getElementById("rightRailClose").addEventListener("click",()=>{document.getElementById("rightRail").classList.remove("mobile-open");});

/* ─── Init ─────────────────────────────────────────────────── */
applyStatic();
renderNav();
renderCategories();
renderGrainStepper();
renderOrigins();
renderSortList();
setupRange();
setupNumberInputs();
renderResults();
renderDrawer();
tickClock();
setInterval(tickClock, 1000);
countUp("cSpecs", TOTAL_SPECIMENS, 1200);
countUp("cVault", IN_VAULT, 900);
document.getElementById("cSel").textContent = "000";
