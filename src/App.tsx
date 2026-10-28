import { useGameStore } from './store';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { TutorialScreen } from './screens/TutorialScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { HowToPlayScreen } from './screens/HowToPlayScreen';
import { DailyMenuScreen } from './screens/DailyMenuScreen';
import { CaseBuilderScreen } from './screens/CaseBuilderScreen';
import { SceneScreen } from './screens/SceneScreen';

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
      return <DailyMenuScreen />;
    case 'case_builder':
      return <CaseBuilderScreen />;
    case 'scene':
      return <SceneScreen />;
    default:
      return <MainMenuScreen />;
  }
}
