import type { NoteMatrixItem, Note } from '../schemas/note';

export const NOTE_MATRIX: NoteMatrixItem[] = [
  // АКТ I
  {
    id: 'n_01',
    targetId: 'char_02',
    category: 'psychology',
    text: '«Я её люблю»',
    statement: 'Симон утверждает, что любит Лину',
    truth: 'false',
    isStrong: false,
  },
  {
    id: 'n_02',
    targetId: 'char_03',
    category: 'psychology',
    text: '«Он женился на деньгах»',
    statement: 'Жанна считает, что Симон женился на деньгах',
    truth: 'true',
    isStrong: false,
  },
  {
    id: 'n_03',
    targetId: 'char_02',
    category: 'motive',
    text: '«Наследство»',
    statement: 'Симон наследует состояние Лины',
    truth: 'true',
    isStrong: true,
  },
  {
    id: 'n_04',
    targetId: 'char_04',
    category: 'psychology',
    text: '«Он будет моим»',
    statement: 'Лина уверена в своем влиянии на Симона',
    truth: 'true',
    isStrong: false,
  },
  {
    id: 'n_05',
    targetId: 'char_03',
    category: 'motive',
    text: '«Я всё решила за нас двоих»',
    statement: 'Жанна планирует что-то вместе с Симоном',
    truth: 'true',
    isStrong: true,
  },
  // АКТ II
  {
    id: 'n_06',
    targetId: 'char_02',
    category: 'alibi',
    text: '«Я спал в своей каюте»',
    statement: 'Симон утверждает, что спал',
    truth: 'false',
    isStrong: true,
  },
  {
    id: 'n_07',
    targetId: 'char_03',
    category: 'alibi',
    text: '«Всю ночь я была у себя»',
    statement: 'Жанна утверждает, что не выходила',
    truth: 'false',
    isStrong: true,
  },
  {
    id: 'n_08',
    targetId: 'char_03',
    category: 'opportunity',
    text: '«Она выходила ночью»',
    statement: 'Пирогов видел, как Жанна выходила',
    truth: 'true',
    isStrong: false,
  },
  {
    id: 'n_09',
    targetId: 'char_10',
    category: 'psychology',
    text: '«Рана не опасна»',
    statement: 'Бреннер говорит, что рана Симона не опасна',
    truth: 'true',
    isStrong: true,
  },
  {
    id: 'n_10',
    targetId: 'char_10',
    category: 'alibi',
    text: '«Каюта Симона была пуста»',
    statement: 'Бреннер видел пустую каюту Симона',
    truth: 'true',
    isStrong: true,
  },
  {
    id: 'n_11',
    targetId: 'char_05',
    category: 'psychology',
    text: '«Луиза видела Симона»',
    statement: 'Луиза знает, кто был у каюты',
    truth: 'true',
    isStrong: true,
  }
];

export function findNoteInMatrix(selectedText: string): Note | undefined {
  const normalized = selectedText.trim().toLowerCase();
  const found = NOTE_MATRIX.find((note) => {
    const noteText = note.text.trim().toLowerCase();
    return normalized.includes(noteText) || noteText.includes(normalized);
  });

  if (!found) return undefined;

  return {
    id: found.id,
    text: found.text,
    statement: found.statement,
    category: found.category,
    target: found.targetId,
    isPersonal: false,
    important: false,
    discarded: false,
    truth: found.truth,
  };
}
