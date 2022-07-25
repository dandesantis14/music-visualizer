import React, { useState, useRef, useEffect } from 'react';
import { AudioService } from './AudioService';
import './App.css';
import Controls from './Controls';
import Track from './Track';
import { DrawingService } from './DrawingService';
import SongSubmitForm from './SongSubmitForm';
import FirstSongForm from './FirstSongForm';


function Visualizer({ user, setUser, trackList, setTrackList, onLogoutClick }) {

    //Track song form presence
    const [formVisibility, setFormVisibility] = useState("hidden")
    //Function to handle adding new song form visibility
    const handleFormOpenClose = (e) => {
        e.preventDefault()
        if (formVisibility === "hidden") {
            setFormVisibility("visible")
        } else {
            setFormVisibility("hidden")
        }
    }
    //Track song location in array of songs
    const [trackIndex, setTrackIndex] = useState(0)

    //Track first interaction to address autoplay policies as they apply to creation of audio context
    //? Not needed due to sign-in???
    const [hasInteracted, setHasInteracted] = useState(false)

    //Track creation of audio source node to allow for track changes
    const [hasSource, setHasSource] = useState(false)
    
    //Reference to hold audioContext
    const audioContextRef = useRef()
    
    //Functions for track changing
    const onNextClick = () => {
        if (trackIndex < trackList.length - 1) {
            setTrackIndex(trackIndex + 1)
            setAudioSource()
        } else {
            setTrackIndex(0)
            setAudioSource()
        }
    }
    const onPrevClick = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(trackList.length - 1)
            setAudioSource()
        } else {
            setTrackIndex(trackIndex - 1)
            setAudioSource()
        }
    }
    
    // Initializes audio context and/or sets audio source node.
    const setAudioSource = () => {
        if (!hasInteracted) {
            audioContextRef.current = new AudioService();
            setHasInteracted(true);
        }
        if (!hasSource) {
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
        setTrackIndex(trackList.findIndex((track) => {
            return track.id === parseInt(event.target.id)
        }))
    }
    
    if (trackList.length<1) {
        return (
            <FirstSongForm setTrackList={setTrackList} onLogoutClick={onLogoutClick}/>
        )
        } else {
        //build tracklist to display
        const trackListDisplay = trackList.map(track => {
            return (
                <Track
                key={track.id}
                id={track.id}
                title={track.title}
                artist={track.artist}
                onTrackSelect={onTrackSelect}
                />
                )
            })
            //Destructure for track information
            const { id, title, artist } = trackList[trackIndex]
            return (
        <div className="visualizer-container">
            <div className='track-panel'>
                <div className='track-container'>
                    {trackListDisplay}
                </div>
                <div className='new-track'>
                    <button class='new-track-button' onClick={(e) => handleFormOpenClose(e)}>Add New Track</button>
                </div>
            </div>
            <div className='display-panel'>
                <div className="canvas-container">
                    <canvas
                        id='visualizer-canvas'
                        width='600'
                        height='300'
                    ></canvas>
                </div>
                <div className="control-panel">
                    <div class="control-container">
                        <div className='track-display'>
                            <div class="track-info" id="current-title-display">{title}</div>
                            <div class="track-info" id="current-artist-display">{artist}</div>
                        </div>
                        <div className='audio-player'>
                            <audio
                                controls
                                crossOrigin='use-credentials'
                                src={`http://localhost:3000/audio/${id}`}
                                className='audio-element'
                                onPlay={() => onPlayClick()}
                            ></audio>
                            <Controls onNextClick={onNextClick} onPrevClick={onPrevClick} />
                        </div>
                    </div>
                    <div class="logout">
                        <button onClick={onLogoutClick}>Logout</button>
                    </div>
                </div>
            </div>
            <SongSubmitForm trackList={trackList} setTrackList={setTrackList} formVisibility={formVisibility} handleFormOpenClose={handleFormOpenClose} />
        </div>
    );
}}

export default Visualizer;
