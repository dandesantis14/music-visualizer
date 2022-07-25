import { useState } from "react";

function FirstSongForm({ setTrackList, onLogoutClick }) {

    const [songSubmitData, setSongSubmitData] = useState({
        title: "",
        artist: "",
        file: null,
    })

    const handleChange = (e) => {
        if (e.target.id === "file") {
            setSongSubmitData({
                ...songSubmitData,
                [e.target.id]: e.target.files[0]
            })
        } else {
            setSongSubmitData({
                ...songSubmitData,
                [e.target.id]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(songSubmitData)) {
            formData.append(`${key}`, value)
        }
        const configObj = {
            method: "POST",
            body: formData
        };
        fetch("/newtrack", configObj).then((resp) => {
            if (resp.ok) {
                resp.json().then((resp) => {
                    setTrackList([resp])
                });
            } else {
                resp.json().then((errors) => {
                    console.error(errors);
                });
            }
        });
    }
    return (
        <div className="first-song-container">
            <form className="first-song-form" onSubmit={(e) => handleSubmit(e)}>
                Please submit your first song to get started!
                <input
                    type="text"
                    id="title"
                    placeholder="Song Title"
                    value={songSubmitData.title}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type="text"
                    id="artist"
                    placeholder="Song Artist"
                    value={songSubmitData.artist}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type="file"
                    id="file"
                    accept=".mp3, .mp4, .m4a"
                    onChange={(e) => handleChange(e)}
                />
                <button type='submit'>Submit</button>
                <button onClick={onLogoutClick}>LogOut</button>
            </form>
        </div>
    )
}

export default FirstSongForm