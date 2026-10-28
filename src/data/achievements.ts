import type { Achievement } from '../schemas/achievement';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    title: 'Первая кровь',
    description: 'Решить первое ежедневное дело.',
    icon: '🩸',
  },
  {
    id: 'five_puzzles',
    title: 'Депеша за депешей',
    description: 'Решить 5 ежедневных дел.',
    icon: '📜',
  },
  {
    id: 'ten_puzzles',
    title: 'Десять депеш',
    description: 'Решить 10 ежедневных дел.',
    icon: '📚',
  },
  {
    id: 'cipher_master',
    title: 'Идеальный шифровальщик',
    description: 'Решить 3 «Шифра дня».',
    icon: '🔐',
  },
  {
    id: 'item_master',
    title: 'Внимание к деталям',
    description: 'Решить 3 «Вещдока дня».',
    icon: '🔍',
  },
  {
    id: 'secret_master',
    title: 'Врун с большой дороги',
    description: 'Решить 3 «Секрета дня».',
    icon: '🎭',
  },
  {
    id: 'weekly_streak',
    title: 'Ни дня без строчки',
    description: 'Зайти в игру 7 дней подряд. Счётчик стрика — в ближайшем обновлении.',
    icon: '📅',
  },
  {
    id: 'hundred_points',
    title: 'Серые клеточки',
    description: 'Достичь 100 очков Дедукции.',
    icon: '🧠',
  },
];
