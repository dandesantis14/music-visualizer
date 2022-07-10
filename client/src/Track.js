
function Track ({title,artist,id,onTrackSelect}) {

    return (
        <div className="track" id={id} onClick={(e)=>onTrackSelect(e)}>
            {title} • {artist}
        </div>
    )
}

export default Track