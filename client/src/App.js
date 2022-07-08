import React, { useState, useRef, useEffect } from 'react';
import { AudioService } from './AudioService';
import './App.css';
import tracks from './tracks';
import Controls from './Controls';

function App() {
  
  //Track song index
  const [trackIndex, setTrackIndex] = useState(0)
  //Track first play to address autoplay policies
  const [hasInteracted, setHasInteracted] = useState(false)
  
  //Destructure for track information
  const { title, artist, audioSource } = tracks[trackIndex]
  
  //Reference to check for track load
  const isReady = useRef(false)

  //Functions for track changing
  const onNextClick = () => {
    if (trackIndex < tracks.length - 1){
      setTrackIndex(trackIndex+1)
    } else {
      setTrackIndex(0)
    }
  }
  const onPrevClick = () => {
    if (trackIndex - 1 < 0){
      setTrackIndex(tracks.length - 1)
    } else {
      setTrackIndex(trackIndex+1)
    }
  }

  //? Need to listen for play and pause!
  //? ^^ to create audioContext necessary to analyze
  const initializeAudioContext = () => {
    const audioService = new AudioService();
    audioService.createSource(document.querySelector(".audio-element"));
    setHasInteracted(true);
  }

  return (
    <div className='player'>
      <div className='trackInfo'>
          <h3 className='trackTitle'>{title}</h3>
          <h4 className='trackArtist'>{artist}</h4>
      </div>
      <div>
        {hasInteracted ? <></> : <button type='button' onClick={()=>initializeAudioContext()}> ARE YOU SURE?!?!</button>}
        <audio controls src={audioSource} className='audio-element' hidden={!hasInteracted}></audio>
      </div>
      <Controls 
        onNextClick = {onNextClick}
        onPrevClick = {onPrevClick}
      />
    </div>
  );
}

export default App;
