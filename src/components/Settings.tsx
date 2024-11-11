import React from 'react';
import { Settings as SettingsIcon, X, Moon, Sun } from 'lucide-react';
import type { Settings } from '../types';
import { translations } from '../translations';

interface SettingsProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export default function Settings({ settings, onSettingsChange }: SettingsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = translations[settings.language];

  const toggleSetting = (key: keyof Settings) => {
    if (typeof settings[key] === 'boolean') {
      onSettingsChange({ ...settings, [key]: !settings[key] });
    }
  };

  const updateTransitionDuration = (value: number) => {
    onSettingsChange({ ...settings, transitionDuration: value * 1000 });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
      >
        <SettingsIcon className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className={`w-96 p-6 rounded-xl shadow-xl ${settings.darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{t.settings}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span>{t.theme}</span>
                <button
                  onClick={() => toggleSetting('darkMode')}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {settings.darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <span>{t.language}</span>
                <select
                  value={settings.language}
                  onChange={(e) => onSettingsChange({ ...settings, language: e.target.value as Settings['language'] })}
                  className={`w-full p-2 rounded-lg ${
                    settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                  <option value="ru">Русский</option>
                </select>
              </div>

              <div className="space-y-2">
                <span>{t.animationStyle}</span>
                <select
                  value={settings.animationStyle}
                  onChange={(e) => onSettingsChange({ ...settings, animationStyle: e.target.value as Settings['animationStyle'] })}
                  className={`w-full p-2 rounded-lg ${
                    settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="simple">{t.simple}</option>
                  <option value="cool">{t.cool}</option>
                  <option value="fantastic">{t.fantastic}</option>
                </select>
              </div>

              <div className="space-y-2">
                <span>{t.imageSource}</span>
                <select
                  value={settings.imageSource}
                  onChange={(e) => onSettingsChange({ ...settings, imageSource: e.target.value as Settings['imageSource'] })}
                  className={`w-full p-2 rounded-lg ${
                    settings.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="unsplash">Unsplash</option>
                  <option value="pexels">Pexels</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span>{t.showProgressBar}</span>
                <button
                  onClick={() => toggleSetting('showProgressBar')}
                  className={`w-11 h-6 rounded-full transition-colors ${
                    settings.showProgressBar ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      settings.showProgressBar ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>{t.showCityNames}</span>
                <button
                  onClick={() => toggleSetting('showCityNames')}
                  className={`w-11 h-6 rounded-full transition-colors ${
                    settings.showCityNames ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      settings.showCityNames ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>{t.showSettingsInSlideshow}</span>
                <button
                  onClick={() => toggleSetting('showSettingsInSlideshow')}
                  className={`w-11 h-6 rounded-full transition-colors ${
                    settings.showSettingsInSlideshow ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      settings.showSettingsInSlideshow ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-2">
                <span>{t.transitionDuration} ({t.seconds})</span>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={settings.transitionDuration / 1000}
                  onChange={(e) => updateTransitionDuration(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm">
                  {settings.transitionDuration / 1000}s
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
