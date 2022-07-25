import {useState} from "react";

function SongSubmitForm ({ trackList, setTrackList, formVisibility, handleFormOpenClose}) {

    const [songSubmitData, setSongSubmitData] = useState ({
        title: "",
        artist: "",
        file: null,
    })

    const handleChange = (e) => {
        if (e.target.id === "file"){
            setSongSubmitData({
                ...songSubmitData,
                [e.target.id] : e.target.files[0]
            })
        } else {
            setSongSubmitData({
                ...songSubmitData,
                [e.target.id] : e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(songSubmitData)){
            formData.append(`${key}`, value)
        }
        const configObj = {
            method: "POST",
            body: formData
        };
        fetch("/newtrack", configObj).then((resp) => {
            if (resp.ok){
                resp.json().then((resp)=> {
                    setTrackList([...trackList,resp])
                    handleFormOpenClose(e)
                    setSongSubmitData({
                        title: "",
                        artist: "",
                        file: null,
                    })
                });
            } else {
                resp.json().then((errors) => {
                    console.error(errors);
                });
            }
        });
    }
    return (
        <div className="song-submit-container" id={"song-submit-container-"+formVisibility} >
            <form className="song-submit-form" onSubmit={(e)=>handleSubmit(e)}>
            <input
                type="text"
                id="title"
                required="true"
                placeholder="Song Title"
                value={songSubmitData.title} 
                onChange={(e)=>handleChange(e)}
            />
            <input
                type="text"
                id="artist"
                required="true"
                placeholder="Song Artist"
                value={songSubmitData.artist} 
                onChange={(e)=>handleChange(e)}
            />
            <input
                type="file"
                id="file"
                required="true"
                accept=".mp3, .mp4, .m4a"
                onChange={(e)=>handleChange(e)}
            />
            <div class="submit-button-container">
                <button type='submit'>Submit</button>
                <button onClick={(e)=>handleFormOpenClose(e)}>Done</button>
            </div>
            </form>
        </div>
    )
}

export default SongSubmitForm