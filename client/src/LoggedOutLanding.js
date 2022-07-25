import React from "react";
import { Routes, Route } from "react-router-dom";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

function LoggedOutLanding({ user, setUser, trackList, setTrackList }) {
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={<SignInPage user={user} setUser={setUser} trackList={trackList} setTrackList={setTrackList} />}
                />

                <Route
                    path="/signup"
                    element={<SignUpPage user={user} setUser={setUser} trackList={trackList} setTrackList={setTrackList} />}
                />
            </Routes>
        </div>
    );
}

export default LoggedOutLanding;