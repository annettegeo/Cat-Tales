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
    { start: 0, end: 2 },
    { start: 2, end: 4 },
    { start: 4, end: 6 },
    { start: 6, end: 8 },
    { start: 8, end: 10 },
    { start: 10, end: 12 },
    { start: 12, end: 14 },
    { start: 14, end: 16 },
    { start: 16, end: 18 },
    { start: 18, end: 20 },
    { start: 20, end: 22 },
    { start: 22, end: 24 },
    { start: 24, end: 26 },
    { start: 26, end: 28 },
    { start: 28, end: 30 },
    { start: 30, end: 32 },
    { start: 32, end: 34 },
    { start: 34, end: 36 },
    { start: 36, end: 38 },
    { start: 38, end: 40 },
    { start: 40, end: 42 },
    { start: 42, end: 44 },
    { start: 44, end: 46 }
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
