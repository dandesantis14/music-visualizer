import React, { useState, useRef, useEffect } from 'react';
import { AudioService } from './AudioService';
import './App.css';
import tracks from './tracks';
import Controls from './Controls';
import Visualizer from './Visualizer';
import { DrawingService } from './DrawingService';


function App() {
  
  //Track song index
  const [trackIndex, setTrackIndex] = useState(0)
  //Track first interaction to address autoplay policies as they apply to creation of audio context
  const [hasInteracted, setHasInteracted] = useState(false)
  //Track creation of audio source node to allow for track changes
  const [hasSource, setHasSource] = useState(false)


  //Destructure for track information
  const { title, artist, audioSource } = tracks[trackIndex]
  
  //Reference to check for track load
  //const isReady = useRef(false)

  //Reference to hold audioContext
  const audioContextRef = useRef()

  //Functions for track changing
  const onNextClick = () => {
    if (trackIndex < tracks.length - 1){
      setTrackIndex(trackIndex+1)
      setAudioSource()
    } else {
      setTrackIndex(0)
      setAudioSource()
    }
  }
  const onPrevClick = () => {
    if (trackIndex - 1 < 0){
      setTrackIndex(tracks.length - 1)
      setAudioSource()
    } else {
      setTrackIndex(trackIndex+1)
      setAudioSource()
    }
  }

  // Initializes audio context and/or sets audio source node.
  const setAudioSource = () => {
    if(!hasInteracted){
      audioContextRef.current = new AudioService();
      setHasInteracted(true);
    }
    if(!hasSource){
      audioContextRef.current.createSource(document.querySelector(".audio-element"));
      setHasSource(true)
    }
  }

  // Initialize drawing
  const startDraw = () => {
    const drawService = new DrawingService();
    drawService.clearCanvas()
    drawService.draw(audioContextRef.current)
  }

  //Retrieves track information
  const getTrackData = () => {
    return audioContextRef.current.getTrackData()
  }

  //Set source, retrieve and pass track information into drawing class
  const onPlayClick = () => {
    setAudioSource()
    startDraw(getTrackData())

  }
  
  return (
    <div className='player'>
      <div className='trackInfo'>
          <h3 className='trackTitle'>{title}</h3>
          <h4 className='trackArtist'>{artist}</h4>
      </div>
      <div>
        <audio
          controls
          src={audioSource}
          className='audio-element'
          onPlay={()=>onPlayClick()}
        ></audio>
      </div>
      <Controls 
        onNextClick = {onNextClick}
        onPrevClick = {onPrevClick}
      />
      <canvas
        id='visualizer-canvas'
        width='600'
        height='300'
      ></canvas>
    </div>
  );
}

export default App;
