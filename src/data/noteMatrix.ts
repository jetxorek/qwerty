import type { Note } from '../schemas/note';

type NoteMatrixEntry = Omit<Note, 'isPersonal' | 'important' | 'discarded'>;

export const NOTE_MATRIX: Record<string, NoteMatrixEntry> = {
  'Я спал': {
    id: 'note_matrix_01',
    text: 'Я спал',
    statement: 'Подозреваемый утверждает, что спал в момент преступления.',
    category: 'alibi',
    target: 'char_02',
    truth: 'plausible',
  },
  'Она смотрела на него': {
    id: 'note_matrix_02',
    text: 'Она смотрела на него',
    statement: 'Свидетель заметил пристальный взгляд в сторону подозреваемого.',
    category: 'psychology',
    target: 'char_03',
    truth: 'true',
  },
  'Это всего лишь светская беседа': {
    id: 'note_matrix_03',
    text: 'Это всего лишь светская беседа',
    statement: 'Саймон пытается преуменьшить значимость разговора с детективом.',
    category: 'psychology',
    target: 'char_02',
    truth: 'false',
  },
  'Держаться от него подальше': {
    id: 'note_matrix_04',
    text: 'Держаться от него подальше',
    statement: 'Жаклин ревностно относится к контактам Саймона с другими людьми.',
    category: 'motive',
    target: 'char_03',
    truth: 'true',
  },
  'Кто-то быстро скрылся за дверью каюты': {
    id: 'note_matrix_05',
    text: 'Кто-то быстро скрылся за дверью каюты',
    statement: 'Неизвестный пытался скрыться — возможно, это убийца.',
    category: 'evidence',
    target: null,
    truth: 'true',
  },
  'Мне нужно поразмыслить': {
    id: 'note_matrix_06',
    text: 'Мне нужно поразмыслить',
    statement: 'Пирогов взял паузу для анализа ситуации.',
    category: 'timeline',
    target: 'char_01',
    truth: 'true',
  },
};

export const findNoteInMatrix = (text: string): NoteMatrixEntry | undefined => {
  // Ищем точное совпадение
  if (NOTE_MATRIX[text]) {
    return NOTE_MATRIX[text];
  }
  // Ищем частичное совпадение (фраза содержится в тексте)
  for (const key of Object.keys(NOTE_MATRIX)) {
    if (text.includes(key) || key.includes(text)) {
      return NOTE_MATRIX[key];
    }
  }
  return undefined;
};
