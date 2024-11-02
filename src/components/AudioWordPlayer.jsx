import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { getWordTimestamps } from '../utils/audioUtils';

const AudioWordPlayer = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageUrl, setImageUrl] = useState('/api/placeholder/400/300');
  
  const wordTimestamps = getWordTimestamps();
  const audioRef = useRef(null);

  const generateNewImage = () => {
    // This is where you would integrate with Gemini Pro
    // For now, we'll use a placeholder
    setImageUrl(`/api/placeholder/400/300?random=${Math.random()}`);
  };

  const playNextWord = () => {
    if (currentWordIndex < wordTimestamps.length) {
      const timestamp = wordTimestamps[currentWordIndex];
      setIsPlaying(true);
      
      if (audioRef.current) {
        audioRef.current.currentTime = timestamp.start;
        audioRef.current.play();
        
        // Stop after playing one word
        setTimeout(() => {
          audioRef.current.pause();
          setIsPlaying(false);
        }, (timestamp.end - timestamp.start) * 1000);
      }
      
      setCurrentWordIndex(prev => prev + 1);
      generateNewImage();
    }
  };

  const resetPlayer = () => {
    setCurrentWordIndex(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setImageUrl('/api/placeholder/400/300');
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 space-y-6">
        {/* Image Section */}
        <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <img 
            src={imageUrl}
            alt="Generated Cat Story"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Audio Player */}
        <audio
          ref={audioRef}
          src="/meow-audio.mp3"
          className="hidden"
        />

        {/* Controls */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Word {currentWordIndex} of {wordTimestamps.length}
            </p>
            <p className="text-sm text-gray-500">
              Click play to hear the next "meow"
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={resetPlayer}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <RotateCcw className="w-6 h-6 text-gray-700" />
            </button>
            
            <button
              onClick={playNextWord}
              disabled={currentWordIndex >= wordTimestamps.length}
              className={`p-4 rounded-full ${
                currentWordIndex >= wordTimestamps.length
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } transition-colors`}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioWordPlayer;
