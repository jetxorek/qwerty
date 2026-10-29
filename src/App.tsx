import { useGameStore } from './store';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { TutorialScreen } from './screens/TutorialScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { HowToPlayScreen } from './screens/HowToPlayScreen';
import { DailyPuzzleScreen } from './screens/DailyPuzzleScreen';
import { CaseBuilderScreen } from './screens/CaseBuilderScreen';
import { SceneScreen } from './screens/SceneScreen';
import { AccusationScreen } from './screens/AccusationScreen';

export default function App() {
  const currentScreen = useGameStore((s) => s.currentScreen);

  switch (currentScreen) {
    case 'main_menu':
      return <MainMenuScreen />;
    case 'tutorial':
      return <TutorialScreen />;
    case 'settings':
      return <SettingsScreen />;
    case 'how_to_play':
      return <HowToPlayScreen />;
    case 'daily_menu':
      return <DailyPuzzleScreen />;
    case 'case_builder':
      return <CaseBuilderScreen />;
    case 'scene':
      return <SceneScreen />;
    case 'accusation':
    case 'accusation_result':
      return <AccusationScreen />;
    default:
      return <MainMenuScreen />;
  }
}
