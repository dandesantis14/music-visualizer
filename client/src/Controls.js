import React from 'react';

import {ReactComponent as Next } from './assets/next.svg';
import {ReactComponent as Prev } from './assets/prev.svg';

const Controls = ( { onPrevClick, onNextClick } ) => {
    return(
        <div className='navigate-tracks'>
            <button
                type='button'
                className='nav-button'
                id="prev-track"
                onClick={onPrevClick}
            >
                <Prev />
            </button>
            <button
                type='button'
                className='nav-button'
                id="next-track"
                onClick={onNextClick}
            >
                <Next />
            </button>
        </div>
    )
}

export default Controls;