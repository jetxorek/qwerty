import { CHARACTERS, getDetective, getSuspects, getVictims } from './data/characters';
import { DAILY_PUZZLES, getPuzzlesByType } from './data/dailyPuzzles';
import type { Character } from './schemas/character';
import type { DailyPuzzle } from './schemas/dailyPuzzle';

function CharacterCard({ character }: { character: Character }) {
  const roleColors: Record<string, string> = {
    detective: 'bg-amber-100 text-amber-800 border-amber-300',
    suspect: 'bg-red-50 text-red-800 border-red-300',
    victim: 'bg-purple-50 text-purple-800 border-purple-300',
  };

  const roleLabels: Record<string, string> = {
    detective: '🔍 Детектив',
    suspect: '🎭 Подозреваемый',
    victim: '💀 Жертва',
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900">{character.name}</h3>
        <span className={`text-xs px-2 py-1 rounded-full border ${roleColors[character.role]}`}>
          {roleLabels[character.role]}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p><span className="font-medium text-gray-700">Возраст:</span> {character.visibleFacts.age}</p>
        <p><span className="font-medium text-gray-700">Профессия:</span> {character.visibleFacts.occupation}</p>
        <p className="italic text-gray-500 pt-2 border-t border-gray-100">
          «{character.visibleFacts.firstImpression}»
        </p>
      </div>
    </div>
  );
}

function PuzzleCard({ puzzle }: { puzzle: DailyPuzzle }) {
  const typeIcons: Record<string, string> = {
    secret: '🤫',
    cipher: '🔐',
    item: '🔎',
  };

  const typeLabels: Record<string, string> = {
    secret: 'Секрет',
    cipher: 'Шифр',
    item: 'Вещдок',
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900">{puzzle.title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-300">
          {typeIcons[puzzle.type]} {typeLabels[puzzle.type]}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{puzzle.description}</p>
      {puzzle.hint && (
        <p className="text-xs text-gray-500 italic mb-3">💡 Подсказка: {puzzle.hint}</p>
      )}
      <details className="mt-3">
        <summary className="text-sm font-medium text-indigo-600 cursor-pointer hover:text-indigo-800">
          Показать ответ
        </summary>
        <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm font-bold text-green-800">Ответ: {puzzle.answer}</p>
          <p className="text-xs text-green-700 mt-1">{puzzle.explanation}</p>
        </div>
      </details>
    </div>
  );
}

export default function App() {
  const detective = getDetective();
  const suspects = getSuspects();
  const victims = getVictims();
  const secrets = getPuzzlesByType('secret');
  const ciphers = getPuzzlesByType('cipher');
  const items = getPuzzlesByType('item');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-sm border-b border-amber-500/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-400 tracking-wide">
            🚢 Смерть на Ниле
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Детективная игра • Египет, 1937 год</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Detective Section */}
        <section>
          <h2 className="text-2xl font-bold text-amber-300 mb-4 flex items-center gap-2">
            <span>🔍</span> Главный герой
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CharacterCard character={detective} />
          </div>
        </section>

        {/* Suspects */}
        <section>
          <h2 className="text-2xl font-bold text-red-300 mb-4 flex items-center gap-2">
            <span>🎭</span> Подозреваемые ({suspects.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suspects.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>

        {/* Victims */}
        <section>
          <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
            <span>💀</span> Жертвы ({victims.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {victims.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>

        {/* Daily Puzzles */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
            <span>🧩</span> Ежедневные загадки ({DAILY_PUZZLES.length})
          </h2>
          <div className="space-y-8">
            {secrets.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3">🤫 Секреты</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {secrets.map((p) => <PuzzleCard key={p.id} puzzle={p} />)}
                </div>
              </div>
            )}
            {ciphers.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3">🔐 Шифры</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ciphers.map((p) => <PuzzleCard key={p.id} puzzle={p} />)}
                </div>
              </div>
            )}
            {items.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-3">🔎 Вещдоки</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((p) => <PuzzleCard key={p.id} puzzle={p} />)}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Schema Info */}
        <section className="bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-200 mb-4">📋 Схема данных</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-amber-300 mb-2">Character</h3>
              <pre className="bg-black/40 rounded-lg p-3 text-gray-400 overflow-x-auto text-xs">
{`{
  id: string
  name: string
  role: 'detective' | 'suspect' | 'victim'
  barOrder: number
  portraitId: string
  visibleFacts: {
    age: number
    occupation: string
    firstImpression: string
  }
}`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 mb-2">DailyPuzzle</h3>
              <pre className="bg-black/40 rounded-lg p-3 text-gray-400 overflow-x-auto text-xs">
{`{
  id: string
  type: 'item' | 'cipher' | 'secret'
  title: string
  description: string
  hint?: string
  answer: string
  explanation: string
}`}
              </pre>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold text-amber-300 mb-2">CaseDraft (UGC)</h3>
              <pre className="bg-black/40 rounded-lg p-3 text-gray-400 overflow-x-auto text-xs">
{`{
  title: string
  description: string
  characters: Array<{ id, name, role, description, motive?, alibi? }>
  murdererId: string
  keyEvidence: Array<{ id, name, description, pointsTo? }>
}`}
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-gray-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          Персонажей: {CHARACTERS.length} • Загадок: {DAILY_PUZZLES.length} • По мотивам Агаты Кристи
        </div>
      </footer>
    </div>
  );
}
