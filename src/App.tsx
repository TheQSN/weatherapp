import React from 'react';
import CitySelector from './components/CitySelector';
import WeatherScene from './components/WeatherScene';
import ProgressBar from './components/ProgressBar';
import Settings from './components/Settings';
import type { City, Weather, WeatherScene as WeatherSceneType, Settings as SettingsType } from './types';
import { translations } from './translations';

const DEFAULT_SETTINGS: SettingsType = {
  showProgressBar: true,
  showCityNames: true,
  darkMode: false,
  transitionDuration: 8000,
  language: 'en',
  animationStyle: 'fantastic',
  imageSource: 'unsplash',
  showSettingsInSlideshow: true,
};

const getWeatherData = (city: City, language: string): Weather => {
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  const conditions = ['clear', 'cloudy', 'rain', 'snow'];
  
  const season = seasons[Math.floor(Math.random() * seasons.length)];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    temp: Math.floor(Math.random() * 35) - 5,
    condition,
    season,
    description: translations[language as keyof typeof translations][condition as keyof typeof translations['en']],
    icon: condition
  };
};

function App() {
  const [started, setStarted] = React.useState(false);
  const [scenes, setScenes] = React.useState<WeatherSceneType[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = React.useState(0);
  const [settings, setSettings] = React.useState<SettingsType>(DEFAULT_SETTINGS);

  const handleCitiesSelected = (cities: City[]) => {
    const weatherScenes = cities.map(city => ({
      city,
      weather: getWeatherData(city, settings.language)
    }));
    setScenes(weatherScenes);
    setStarted(true);
  };

  React.useEffect(() => {
    if (scenes.length > 0) {
      const interval = setInterval(() => {
        setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
      }, settings.transitionDuration);

      return () => clearInterval(interval);
    }
  }, [scenes, settings.transitionDuration]);

  if (!started) {
    return (
      <>
        <Settings settings={settings} onSettingsChange={setSettings} />
        <CitySelector onCitiesSelected={handleCitiesSelected} settings={settings} />
      </>
    );
  }

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${
      settings.darkMode ? 'bg-gray-900' : ''
    }`}>
      {settings.showSettingsInSlideshow && (
        <Settings settings={settings} onSettingsChange={setSettings} />
      )}
      {scenes.map((scene, index) => (
        <WeatherScene
          key={scene.city.id}
          scene={scene}
          isVisible={index === currentSceneIndex}
          darkMode={settings.darkMode}
          animationStyle={settings.animationStyle}
          imageSource={settings.imageSource}
        />
      ))}
      {settings.showProgressBar && (
        <ProgressBar
          total={scenes.length}
          current={currentSceneIndex}
          duration={settings.transitionDuration}
          cities={scenes.map(s => s.city)}
          showCityNames={settings.showCityNames}
        />
      )}
    </div>
  );
}

export default App;