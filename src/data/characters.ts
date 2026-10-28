import { CharacterSchema, type Character } from '../schemas/character';

const rawCharacters = [
  {
    id: 'char_01',
    name: 'Эрнест Пирогов',
    role: 'detective' as const,
    barOrder: -1,
    portraitId: 'portrait_pirogov',
    visibleFacts: {
      age: 42,
      occupation: 'Частный детектив',
      firstImpression: 'Невысокий мужчина с внимательными серыми глазами. Говорит тихо, но каждое слово — как щелчок по струне.',
    },
  },
  {
    id: 'char_02',
    name: 'Саймон Дойл',
    role: 'suspect' as const,
    barOrder: 1,
    portraitId: 'portrait_simon',
    visibleFacts: {
      age: 28,
      occupation: 'Управляющий поместьем',
      firstImpression: 'Красивый, загорелый мужчина. Широкая улыбка, но глаза бегают — словно он чего-то опасается.',
    },
  },
  {
    id: 'char_03',
    name: 'Жаклин де Бельфор',
    role: 'suspect' as const,
    barOrder: 2,
    portraitId: 'portrait_jacqueline',
    visibleFacts: {
      age: 26,
      occupation: 'Без определённых занятий',
      firstImpression: 'Огненная брюнетка. Говорит громко, жестикулирует бурно. В её взгляде — смесь страсти и отчаяния.',
    },
  },
  {
    id: 'char_04',
    name: 'Эндрю Пеннингтон',
    role: 'suspect' as const,
    barOrder: 3,
    portraitId: 'portrait_pennington',
    visibleFacts: {
      age: 55,
      occupation: 'Адвокат',
      firstImpression: 'Сухощавый господин в безупречном костюме. Говорит вкрадчиво, как человек, привыкший убеждать.',
    },
  },
  {
    id: 'char_05',
    name: 'Джим Оллертон',
    role: 'suspect' as const,
    barOrder: 4,
    portraitId: 'portrait_allerton',
    visibleFacts: {
      age: 24,
      occupation: 'Студент',
      firstImpression: 'Обаятельный молодой человек с лёгкой улыбкой. Слегка развязные манеры, но глаза умные.',
    },
  },
  {
    id: 'char_06',
    name: 'Мари Ван Скайлер',
    role: 'suspect' as const,
    barOrder: 5,
    portraitId: 'portrait_van_schuyler',
    visibleFacts: {
      age: 60,
      occupation: 'Богатая наследница',
      firstImpression: 'Пожилая дама с каменным лицом. Держится с достоинством, но в глазах — холодная расчётливость.',
    },
  },
  {
    id: 'char_07',
    name: 'Доктор Людвиг Бесснер',
    role: 'suspect' as const,
    barOrder: 6,
    portraitId: 'portrait_bessner',
    visibleFacts: {
      age: 48,
      occupation: 'Врач-специалист',
      firstImpression: 'Полный немец с густыми усами. Говорит с акцентом, смотрит прямо и уверенно.',
    },
  },
  {
    id: 'char_08',
    name: 'Лина Риджуэй-Дойл',
    role: 'victim' as const,
    barOrder: 7,
    portraitId: 'portrait_linnet',
    visibleFacts: {
      age: 22,
      occupation: 'Наследница состояния',
      firstImpression: 'Ослепительная красавица. Держится как королева — но за этой маской скрывается одиночество.',
    },
  },
  {
    id: 'char_09',
    name: 'Луиза Бурже',
    role: 'victim' as const,
    barOrder: 8,
    portraitId: 'portrait_louise',
    visibleFacts: {
      age: 30,
      occupation: 'Горничная',
      firstImpression: 'Тёмноволосая женщина с острым взглядом. Держится скромно, но в её глазах читается скрытность.',
    },
  },
  {
    id: 'char_10',
    name: 'Саломея Оттерборн',
    role: 'victim' as const,
    barOrder: 9,
    portraitId: 'portrait_otterbourne',
    visibleFacts: {
      age: 50,
      occupation: 'Писательница',
      firstImpression: 'Полная дама с рюмкой в руке. Говорит громко и невпопад, словно не замечая, что её никто не слушает.',
    },
  },
] as const;

export const CHARACTERS: Character[] = rawCharacters.map((c) =>
  CharacterSchema.parse(c)
);

export const getCharacterById = (id: string): Character | undefined =>
  CHARACTERS.find((c) => c.id === id);

export const getDetective = (): Character =>
  CHARACTERS.find((c) => c.role === 'detective')!;

export const getSuspects = (): Character[] =>
  CHARACTERS.filter((c) => c.role === 'suspect');

export const getVictims = (): Character[] =>
  CHARACTERS.filter((c) => c.role === 'victim');
