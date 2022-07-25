import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Visualizer from './Visualizer';
import LoggedOutLanding from './LoggedOutLanding';

function App() {

  //State to track user sign-in and authentication
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)
  //state to hold tracklist
  const [trackList, setTrackList] = useState([])


  //useEffect to set authentication and check for existing user
  useEffect(() => {
    fetch("/me", {
      credentials: "include"
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user)
          return fetch(`/songs/index/${user.id}`)
            .then(resp => resp.json())
            .then(data => {
              setTrackList(data)
              setAuthenticated(true)
            })
        })
      } else {
        setAuthenticated(true)
      }
    })
  }, [])

  const onLogoutClick = () => {
    setUser(null)
    fetch("/logout", { method: "DELETE" })
  }

  if (!authenticated) {
    return <div></div>
  }

  return (
    <div className="container">
      <Router>
        {user ? (
          <Visualizer user={user} setUser={setUser} trackList={trackList} setTrackList={setTrackList} onLogoutClick={onLogoutClick} />
        ) : (
          <LoggedOutLanding user={user} setUser={setUser} trackList={trackList} setTrackList={setTrackList} />
        )
        }
      </Router>
    </div>
  );
}

export default App;
