import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WeatherScene as WeatherSceneType } from '../types';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

interface WeatherSceneProps {
  scene: WeatherSceneType;
  isVisible: boolean;
  darkMode: boolean;
  animationStyle: 'simple' | 'cool' | 'fantastic';
  imageSource: 'unsplash' | 'pexels';
}

const animationVariants = {
  simple: {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  },
  cool: {
    enter: { y: '100%', opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 }
  },
  fantastic: {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }
};

const contentVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  }),
};

export default function WeatherScene({ scene, isVisible, darkMode, animationStyle, imageSource }: WeatherSceneProps) {
  const getImageUrl = () => {
    const { season, condition } = scene.weather;
    const timeOfDay = new Date().getHours();
    const isNight = timeOfDay < 6 || timeOfDay > 18;

    const backgrounds = {
      unsplash: {
        winter: {
          clear: isNight ? 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d' : 'https://images.unsplash.com/photo-1491002052546-bf38f186af56',
          cloudy: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22',
          rain: 'https://images.unsplash.com/photo-1512856246663-1db5cf2b4578',
          snow: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a'
        },
        spring: {
          clear: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa',
          cloudy: 'https://images.unsplash.com/photo-1493314894560-5c412a56c17c',
          rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0'
        },
        summer: {
          clear: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
          cloudy: 'https://images.unsplash.com/photo-1532178910-7815d6919875',
          rain: 'https://images.unsplash.com/photo-1428592953211-077101b2021b'
        },
        autumn: {
          clear: 'https://images.unsplash.com/photo-1507371341959-20a86c161a67',
          cloudy: 'https://images.unsplash.com/photo-1510843572979-e4b9e790fdd7',
          rain: 'https://images.unsplash.com/photo-1509027572446-af8401acfdc3'
        }
      },
      pexels: {
        winter: {
          clear: isNight ? 'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg' : 'https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg',
          cloudy: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
          rain: 'https://images.pexels.com/photos/1755683/pexels-photo-1755683.jpeg',
          snow: 'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg'
        },
        spring: {
          clear: 'https://images.pexels.com/photos/1366913/pexels-photo-1366913.jpeg',
          cloudy: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg',
          rain: 'https://images.pexels.com/photos/1530423/pexels-photo-1530423.jpeg'
        },
        summer: {
          clear: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
          cloudy: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg',
          rain: 'https://images.pexels.com/photos/1530423/pexels-photo-1530423.jpeg'
        },
        autumn: {
          clear: 'https://images.pexels.com/photos/1649200/pexels-photo-1649200.jpeg',
          cloudy: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg',
          rain: 'https://images.pexels.com/photos/1530423/pexels-photo-1530423.jpeg'
        }
      }
    };

    return backgrounds[imageSource][season as keyof typeof backgrounds.unsplash][condition as keyof typeof backgrounds.unsplash.winter] + (imageSource === 'unsplash' ? '?auto=format&fit=crop&w=2000&q=80' : '');
  };

  const getWeatherIcon = () => {
    const iconProps = {
      className: "w-16 h-16",
      initial: { rotate: -30, opacity: 0 },
      animate: { rotate: 0, opacity: 1 },
      transition: { duration: 0.5, ease: "easeOut" }
    };

    switch (scene.weather.condition) {
      case 'clear':
        return <motion.div {...iconProps}><Sun className="text-yellow-400" /></motion.div>;
      case 'cloudy':
        return <motion.div {...iconProps}><Cloud className="text-gray-400" /></motion.div>;
      case 'rain':
        return <motion.div {...iconProps}><CloudRain className="text-blue-400" /></motion.div>;
      case 'snow':
        return <motion.div {...iconProps}><CloudSnow className="text-white" /></motion.div>;
      default:
        return <motion.div {...iconProps}><CloudLightning className="text-yellow-400" /></motion.div>;
    }
  };

  return (
    <AnimatePresence initial={false} custom={1}>
      {isVisible && (
        <motion.div
          variants={animationVariants[animationStyle]}
          initial="enter"
          animate="center"
          exit="exit"
          custom={1}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${getImageUrl()})` }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className={`absolute inset-0 ${
              darkMode ? 'bg-black/50' : 'bg-black/30'
            } backdrop-blur-sm`} />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <motion.div className="text-center space-y-4">
                <motion.h2
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  className="text-5xl font-bold"
                >
                  {scene.city.name}
                </motion.h2>

                <motion.p
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="text-xl"
                >
                  {scene.city.country}
                </motion.p>
                
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="flex items-center justify-center my-4"
                >
                  {getWeatherIcon()}
                </motion.div>
                
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <p className="text-6xl font-bold mb-2">
                    {Math.round(scene.weather.temp)}°C
                  </p>
                  <p className="text-xl capitalize">{scene.weather.description}</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}