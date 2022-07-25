
function Track ({title,artist,id,onTrackSelect}) {

    return (
        <div className="track-element" id={id} onClick={(e)=>onTrackSelect(e)}>
            {title} • {artist}
        </div>
    )
}

export default Track