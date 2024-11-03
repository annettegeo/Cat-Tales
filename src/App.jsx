import { useState, useEffect } from 'react';
import './App.css';

// Importing images from images in src
import img1 from './images/img1.jpeg';
import img2 from './images/img2.jpeg';
import img3 from './images/img3.jpeg';
import img4 from './images/img4.jpeg';
import img5 from './images/img5.jpeg';
import img6 from './images/img6.jpeg';
import img7 from './images/img7.jpeg';
import img8 from './images/img8.jpeg';
import img9 from './images/img9.jpeg';
import img10 from './images/img10.jpeg';
import img11 from './images/img11.jpeg';
import img12 from './images/img12.jpeg';
import img13 from './images/img13.jpeg';
import img14 from './images/img14.jpeg';
import img15 from './images/img15.jpeg';
import img16 from './images/img16.jpeg';
import img17 from './images/img17.jpeg';
import img18 from './images/img18.jpeg';
import img19 from './images/img19.jpeg';
import audioFile from './assets/meow.mp3';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19];

//Returns timestamp for each word in the audio when the button is clicked
const getWordTimestamps = () => {
  return [
    { start: 0.05, end: 1.55 },
    { start: 0.3, end: 1.8 },
    { start: 0.7, end: 2.2 },
    { start: 1.2, end: 2.7 },
    { start: 1.45, end: 2.95 },
    { start: 1.7, end: 3.2 },
    { start: 1.8, end: 3.3 },
    { start: 2.15, end: 3.65 },
    { start: 2.95, end: 4.45 },
    { start: 4.0, end: 5.5 },
    { start: 4.15, end: 5.65 },
    { start: 4.4, end: 5.9 },
    { start: 4.6, end: 6.1 },
    { start: 5.05, end: 6.55 },
    { start: 5.35, end: 6.85 },
    { start: 5.55, end: 7.05 },
    { start: 5.9, end: 7.4 },
    { start: 6.3, end: 7.8 },
    { start: 7.15, end: 8.65 },
    { start: 7.45, end: 8.95 },
    { start: 7.85, end: 9.35 },
    { start: 8.5, end: 10.0 },
    { start: 8.75, end: 10.25 },
    { start: 9.3, end: 10.8 },
    { start: 9.7, end: 11.2 },
    { start: 9.9, end: 11.4 },
    { start: 10.1, end: 11.6 },
    { start: 11.0, end: 12.5 },
    { start: 11.25, end: 12.75 },
    { start: 11.6, end: 13.1 },
    { start: 11.95, end: 13.45 },
    { start: 13.3, end: 14.8 },
    { start: 13.7, end: 15.2 },
    { start: 13.85, end: 15.35 },
    { start: 14.1, end: 15.6 },
    { start: 14.65, end: 16.15 },
    { start: 14.95, end: 16.45 },
    { start: 15.25, end: 16.75 },
    { start: 15.45, end: 16.95 },
    { start: 15.75, end: 17.25 },
    { start: 16.65, end: 18.15 },
    { start: 17.0, end: 18.5 },
    { start: 17.95, end: 19.45 },
    { start: 19.1, end: 20.6 },
    { start: 19.4, end: 20.9 },
    { start: 19.7, end: 21.2 },
    { start: 19.8, end: 21.3 },
    { start: 20.1, end: 21.6 },
    { start: 20.35, end: 21.85 },
    { start: 20.65, end: 22.15 },
    { start: 21.0, end: 22.5 },
    { start: 21.45, end: 22.95 },
    { start: 21.6, end: 23.1 },
    { start: 22.0, end: 23.5 },
    { start: 22.25, end: 23.75 },
    { start: 22.55, end: 24.05 },
    { start: 22.7, end: 24.2 },
    { start: 23.25, end: 24.75 },
    { start: 23.4, end: 24.9 },
    { start: 23.8, end: 25.3 },
    { start: 24.0, end: 25.5 },
    { start: 24.15, end: 25.65 },
    { start: 25.35, end: 26.85 },
    { start: 25.95, end: 27.45 },
    { start: 26.45, end: 27.95 },
    { start: 26.75, end: 28.25 },
    { start: 27.1, end: 28.6 },
    { start: 27.65, end: 29.15 },
    { start: 27.8, end: 29.3 },
    { start: 28.2, end: 29.7 },
    { start: 28.45, end: 29.95 },
    { start: 29.2, end: 30.7 },
    { start: 29.3, end: 30.8 },
    { start: 29.65, end: 31.15 },
    { start: 30.25, end: 31.75 },
    { start: 30.55, end: 32.05 },
    { start: 31.0, end: 32.5 },
    { start: 31.85, end: 33.35 },
    { start: 32.55, end: 34.05 },
    { start: 33.3, end: 34.8 },
    { start: 34.8, end: 36.3 },
    { start: 35.15, end: 36.65 },
    { start: 35.45, end: 36.95 },
    { start: 35.6, end: 37.1 },
    { start: 35.85, end: 37.35 },
    { start: 36.3, end: 37.8 },
    { start: 37.4, end: 38.9 },
    { start: 37.8, end: 39.3 },
    { start: 38.15, end: 39.65 },
    { start: 38.5, end: 40.0 },
    { start: 39.0, end: 40.5 },
    { start: 39.4, end: 40.9 },
    { start: 39.9, end: 41.4 },
    { start: 40.95, end: 42.45 },
    { start: 41.55, end: 43.05 },
    { start: 41.85, end: 43.35 },
    { start: 42.3, end: 43.8 },
    { start: 43.95, end: 45.45 },
    { start: 44.05, end: 45.55 },
    { start: 44.35, end: 45.85 },
  ];
};

function App() {
  const [text, setText] = useState('');
  const [audio] = useState(new Audio(audioFile));
  const [count, setCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [timestampIndex, setTimestampIndex] = useState(0);

  const timestamps = getWordTimestamps();

  // Function to play a segment of the audio based on start and end times
  const playSegment = (start, end) => {
    audio.currentTime = start;
    audio.play();

    // Stop the audio at the end time
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // resets to start for next segment
    }, (end - start) * 1000);
  };

  // Function to add "meow", increment counters, and play audio segments
  const addMeow = () => {
    setText((prev) => prev + 'meow ');
    setCount((prev) => prev + 1);
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);

    if (timestampIndex < timestamps.length) {
      const { start, end } = timestamps[timestampIndex];
      playSegment(start, end);
      setTimestampIndex((prev) => prev + 1);  // Move to the next timestamp
    }
  };

  const resetText = () => {
    setText('');
    setCount(0);
    setImageIndex(0);
    setTimestampIndex(0); // Reset timestamp index
  };

  // Function to remove the last "meow" if it exists and revert image/timestamp indexes
  const removeMeow = () => {
    if (text.endsWith('meow ')) {
      setText((prev) => prev.slice(0, -5));
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
      setImageIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : images.length - 1 
      );
      setTimestampIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  useEffect(() => {
    return () => {
      audio.pause();  // Stop the audio
      audio.currentTime = 0;  // Reset audio to start
    };
  }, [audio]);

  return (
    <div className="app">
      <div className="cat-container">
        <img src={images[imageIndex]} alt="Cat" className="cat-image" />
        <div className="text-display">{text}</div>
        <div className="counter">Meows: {count}</div>
        <div className="button-container">
          <button onClick={addMeow}>meow</button>
          <button onClick={resetText}>reset</button>
          <button onClick={removeMeow}>remove meow</button>
        </div>
      </div>
    </div>
  );
}

export default App;
