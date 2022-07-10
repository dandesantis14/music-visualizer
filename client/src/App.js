import React, { useState, useRef, useEffect } from 'react';
import { AudioService } from './AudioService';
import './App.css';
import tracks from './tracks';
import Controls from './Controls';
import Visualizer from './Visualizer';
import Track from './Track';
import { DrawingService } from './DrawingService';
import axios from 'axios'

function App() {
  
  //Track song index
  const [trackId, setTrackId] = useState(1)
  //Track first interaction to address autoplay policies as they apply to creation of audio context
  const [hasInteracted, setHasInteracted] = useState(false)
  //Track creation of audio source node to allow for track changes
  const [hasSource, setHasSource] = useState(false)


  //Destructure for track information
  const { title, artist, audioSource } = tracks[trackId-1]
  
  //Reference to check for track load
  //const isReady = useRef(false)

  //Reference to hold audioContext
  const audioContextRef = useRef()

  //Functions for track changing
  const onNextClick = () => {
    if (trackId < tracks.length){
      setTrackId(trackId+1)
      setAudioSource()
    } else {
      setTrackId(1)
      setAudioSource()
    }
  }
  const onPrevClick = () => {
    if (trackId - 1 == 0){
      setTrackId(tracks.length)
      setAudioSource()
    } else {
      setTrackId(trackId-1)
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

  //Function to handle direct track selection
  const onTrackSelect = (event) => {
    setTrackId(event.target.id)
  }

  //build tracklist to display
  const trackListDisplay = tracks.map(track => {
    return (
      <Track 
        key = {track.id}
        id = {track.id}
        title = {track.title}
        artist = {track.artist}
        onTrackSelect = {onTrackSelect}
      />
    )
  })
  
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
      <div className='trackList'>{trackListDisplay}</div>
      <canvas
        id='visualizer-canvas'
        width='600'
        height='300'
      ></canvas>
    </div>
  );
}

export default App;
