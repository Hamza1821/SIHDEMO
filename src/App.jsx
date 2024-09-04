import  { useEffect, useState } from 'react';
import './App.css';

// Import images
import lowImage from './assets/low.webp';
import moderateImage from './assets/moderate.jpg';
import highImage from './assets/hig2.jpg';
import highestImage from './assets/highest.jpg';
import ambImage from './assets/amb.jpg';

// List of images with their vehicle data
const images = [
  { src: lowImage, vehicles: 1 },
  { src: moderateImage, vehicles: 3 },
  { src: highImage, vehicles: 7 },
  { src: highestImage, vehicles: 5 },
  { src: lowImage, vehicles: 2 },
  { src: moderateImage, vehicles: 4 },
  { src: highImage, vehicles: 8 },
  { src: highestImage, vehicles: 6 },
  
  { src: ambImage, vehicles: 9 },
];

function App() {
  const [laneImages, setLaneImages] = useState([]);

  // Function to shuffle images randomly among lanes
  const shuffleImages = () => {
    const shuffledImages = images.sort(() => 0.5 - Math.random()).slice(0, 4);
    setLaneImages(shuffledImages);
  };

  // Function to find the lane with the highest vehicle data
  const getMaxVehicleLane = () => {
    const maxVehicle = Math.max(...laneImages.map((img) => img.vehicles));
    return laneImages.findIndex((img) => img.vehicles === maxVehicle);
  };

  // Shuffle images on mount and every 4 seconds
  useEffect(() => {
    shuffleImages(); // Initial shuffle
    const intervalId = setInterval(shuffleImages, 4000); // Shuffle every 4 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const maxVehicleLane = getMaxVehicleLane();

  return (
    <>
     <h1>AI Traffic System</h1>
    <div className="lane-container">
     
      {laneImages.map((img, index) => (
        <div key={index} className="lane ">
          <p>Lane {index+1}</p>
          <img src={img.src} alt="Traffic" />
          <div className={`traffic-light ${index === maxVehicleLane ? 'green' : 'red'}`}></div>
        </div>
      ))}
    </div>
    </>
  );
}

export default App;
