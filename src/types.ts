export interface City {
  id: string;
  name: string;
  country: string;
}

export interface Weather {
  temp: number;
  condition: string;
  season: string;
  description: string;
  icon: string;
}

export interface WeatherScene {
  city: City;
  weather: Weather;
}

export interface Settings {
  showProgressBar: boolean;
  showCityNames: boolean;
  darkMode: boolean;
  transitionDuration: number;
  language: 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ru' ;
  animationStyle: 'simple' | 'cool' | 'fantastic';
  imageSource: 'unsplash' | 'pexels';
  showSettingsInSlideshow: boolean;
}

export interface Translations {
  [key: string]: {
    settings: string;
    theme: string;
    showProgressBar: string;
    showCityNames: string;
    transitionDuration: string;
    seconds: string;
    language: string;
    animationStyle: string;
    imageSource: string;
    showSettingsInSlideshow: string;
    simple: string;
    cool: string;
    fantastic: string;
    clear: string;
    cloudy: string;
    rain: string;
    snow: string;
  };
}
