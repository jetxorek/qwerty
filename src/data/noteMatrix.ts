import type { NoteMatrixItem, Note } from '../schemas/note';

export const NOTE_MATRIX: NoteMatrixItem[] = [
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
];

// Функция поиска улики в матрице по выделенному тексту
// Возвращает объект, совместимый с Note (для использования в gameStore)
export function findNoteInMatrix(selectedText: string): Note | undefined {
  const normalized = selectedText.trim().toLowerCase();
  const found = NOTE_MATRIX.find((note) => {
    const noteText = note.text.trim().toLowerCase();
    return normalized.includes(noteText) || noteText.includes(normalized);
  });
  
  if (!found) return undefined;
  
  // Конвертируем NoteMatrixItem в Note
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
