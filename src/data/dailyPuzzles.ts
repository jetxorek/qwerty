import { DailyPuzzleSchema, type DailyPuzzle } from '../schemas/dailyPuzzle';

const rawPuzzles = [
  {
    id: 'puzzle_01',
    type: 'secret' as const,
    title: 'Свидетель из Мельбурна',
    description:
      'Свидетель утверждает, что видел грабителя, читающего вечернюю газету, ровно в 16:00. Как это возможно?',
    hint: 'Подумайте о том, когда выходят вечерние газеты.',
    answer: 'Газеты выходят в 18:00',
    explanation:
      'Вечерние газеты в Мельбурне выходят не раньше 18:00. В 16:00 грабитель не мог читать вечернюю газету — значит, свидетель лжёт.',
  },
  {
    id: 'puzzle_02',
    type: 'cipher' as const,
    title: 'Шифр на стене каюты',
    description:
      'На стене каюты найдена надпись азбукой Морзе: ". --. .. .--. . -". Что она означает?',
    hint: 'Каждая буква разделена пробелом. Точка — короткая, тире — длинная.',
    answer: 'ЕГИПЕТ',
    explanation:
      'Расшифровка по азбуке Морзе: . = Е, --. = П, .. = И, .--. = П, . = Е, - = Т. Слово — ЕГИПЕТ.',
  },
  {
    id: 'puzzle_03',
    type: 'item' as const,
    title: 'Спички из отеля "Шеферд"',
    description:
      'В кармане убийцы найдена коробка спичек из отеля "Шеферд" в Каире. Что это говорит о преступнике?',
    hint: 'Отель "Шеферд" — это конкретное место. Подумайте, где был убийца.',
    answer: 'Он был в Каире',
    explanation:
      'Спички из отеля "Шеферд" — фирменный сувенир. Это доказывает, что подозреваемый находился в Каире, а не там, где утверждает его алиби.',
  },
] as const;

export const DAILY_PUZZLES: DailyPuzzle[] = rawPuzzles.map((p) =>
  DailyPuzzleSchema.parse(p)
);

export const getPuzzleById = (id: string): DailyPuzzle | undefined =>
  DAILY_PUZZLES.find((p) => p.id === id);

export const getPuzzlesByType = (type: DailyPuzzle['type']): DailyPuzzle[] =>
  DAILY_PUZZLES.filter((p) => p.type === type);
