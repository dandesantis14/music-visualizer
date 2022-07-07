import React, { useState, useRef, useEffect } from 'react';
import { AudioService } from './AudioService';
import './App.css';
import tracks from './tracks';
import Controls from './Controls';

function App() {
  
  //Track song index
  const [trackIndex, setTrackIndex] = useState(0)
  //Track first play to address autoplay policies
  const [firstPlay, setFirstPlay] = useState(true)
  
  //Destructure for track information
  const { title, artist, audioSource } = tracks[trackIndex]

  //Reference for creating the audio element
  const audioRef = useRef(new Audio(audioSource))
  const audioEmbedded = () => <audio controls src={audioRef.current.src}></audio>
  
  return (
    <div className='player'>
      <div className='trackInfo'>
          <h3 className='trackTitle'>{title}</h3>
          <h4 className='trackArtist'>{artist}</h4>
      </div>
      <div>
        {audioEmbedded()}
      </div>
      <Controls />
    </div>
  );
}

export default App;
