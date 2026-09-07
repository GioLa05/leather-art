import { Lang } from '@/i18n/translations';

export interface JournalEntry {
  id: string;
  num: string;
  date: string;
  read: string;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
}

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'pit-014',
    num: '01',
    date: '2099.03.02',
    read: '6 MIN',
    title: {
      EN: 'Twenty-eight days in the pit',
      KA: 'ოცდარვა დღე ორმოში',
      RU: 'Двадцать восемь дней в яме',
    },
    excerpt: {
      EN: 'A tannage log from Δ-014. What mimosa bark does to a hide over four weeks, measured day by day.',
      KA: 'თრიმვის ჟურნალი Δ-014-დან. რას უკეთებს მიმოზის ქერქი ტყავს ოთხ კვირაში, დღითი დღე გაზომილი.',
      RU: 'Журнал дубления Δ-014. Что кора мимозы делает со шкурой за четыре недели, измеренное по дням.',
    },
  },
  {
    id: 'edge-paint',
    num: '02',
    date: '2099.05.19',
    read: '4 MIN',
    title: {
      EN: 'Four coats of chocolate',
      KA: 'შოკოლადის ოთხი ფენა',
      RU: 'Четыре слоя шоколада',
    },
    excerpt: {
      EN: 'Edge-painting is patience at the millimetre. Why the fourth coat matters more than the first three.',
      KA: 'კიდის შეღებვა მილიმეტრის მოთმინებაა. რატომ არის მეოთხე ფენა პირველ სამზე მნიშვნელოვანი.',
      RU: 'Окраска края — терпение на миллиметре. Почему четвёртый слой важнее первых трёх.',
    },
  },
  {
    id: 'redacted',
    num: '03',
    date: '2099.08.21',
    read: '7 MIN',
    title: {
      EN: 'On hides without provenance',
      KA: 'წარმოშობის გარეშე ტყავზე',
      RU: 'О шкурах без происхождения',
    },
    excerpt: {
      EN: 'Some specimens arrive with no documentation. We file them under ARCHIVE_UNKNOWN — and catalogue them anyway.',
      KA: 'ზოგი ნიმუში დოკუმენტაციის გარეშე ჩამოდის. ჩვენ ვინახავთ ARCHIVE_UNKNOWN-ში — და მაინც ვაკატალოგებთ.',
      RU: 'Некоторые образцы приходят без документов. Мы заносим их в ARCHIVE_UNKNOWN — и всё равно каталогизируем.',
    },
  },
  {
    id: 'waxed-linen',
    num: '04',
    date: '2099.10.07',
    read: '5 MIN',
    title: {
      EN: 'Eight stitches per inch',
      KA: 'რვა ნაკერი დუიმზე',
      RU: 'Восемь стежков на дюйм',
    },
    excerpt: {
      EN: 'Saddle-stitching in waxed linen, by hand. A study in why the slow seam outlasts the fast one.',
      KA: 'ცვილიანი ტილოს უნაგირული ნაკერი, ხელით. კვლევა იმაზე, თუ რატომ ცოცხლობს ნელი ნაკერი სწრაფზე მეტ ხანს.',
      RU: 'Седельная сшивка вощёным льном, вручную. Исследование того, почему медленный шов переживает быстрый.',
    },
  },
];
