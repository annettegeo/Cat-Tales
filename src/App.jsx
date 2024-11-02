import { useState, useEffect } from 'react';
import './App.css';

// Import images
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

// Function to return timestamps for each word in the audio
const getWordTimestamps = () => {
  return [
    { start: 0.05, end: 0.2 },
    { start: 0.3, end: 0.65 },
    { start: 0.7, end: 1.0 },
    { start: 1.2, end: 1.35 },
    { start: 1.45, end: 1.6 },
    { start: 1.7, end: 1.75 },
    { start: 1.8, end: 2.1 },
    { start: 2.15, end: 2.9 },
    { start: 2.95, end: 3.95 },
    { start: 4.0, end: 4.1 },
    { start: 4.15, end: 4.3 },
    { start: 4.4, end: 4.5 },
    { start: 4.6, end: 5.0 },
    { start: 5.05, end: 5.3 },
    { start: 5.35, end: 5.4 },
    { start: 5.55, end: 5.8 },
    { start: 5.9, end: 6.05 },
    { start: 6.3, end: 6.9 },
    { start: 7.15, end: 7.35 },
    { start: 7.45, end: 7.8 },
    { start: 7.85, end: 8.45 },
    { start: 8.5, end: 8.7 },
    { start: 8.75, end: 9.2 },
    { start: 9.3, end: 9.65 },
    { start: 9.7, end: 9.85 },
    { start: 9.9, end: 10.0 },
    { start: 10.1, end: 10.8 },
    { start: 11.0, end: 11.05 },
    { start: 11.25, end: 11.55 },
    { start: 11.6, end: 11.75 },
    { start: 11.95, end: 13.05 },
    { start: 13.3, end: 13.6 },
    { start: 13.7, end: 13.75 },
    { start: 13.85, end: 13.9 },
    { start: 14.1, end: 14.6 },
    { start: 14.65, end: 14.85 },
    { start: 14.95, end: 15.2 },
    { start: 15.25, end: 15.35 },
    { start: 15.45, end: 15.65 },
    { start: 15.75, end: 16.6 },
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
      audio.currentTime = 0; // reset to start for next segment
    }, (end - start) * 1000);
  };

  const addMeow = () => {
    setText((prev) => prev + 'meow ');
    setCount((prev) => prev + 1);
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);

    if (timestampIndex < timestamps.length) {
      const { start, end } = timestamps[timestampIndex];
      playSegment(start, end);
      setTimestampIndex((prev) => prev + 1);
    }
  };

  const resetText = () => {
    setText('');
    setCount(0);
    setImageIndex(0);
    setTimestampIndex(0); // Reset timestamp index
  };

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
      audio.pause();
      audio.currentTime = 0;
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
