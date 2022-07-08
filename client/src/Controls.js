import React from 'react';

import {ReactComponent as Next } from './assets/next.svg';
import {ReactComponent as Prev } from './assets/prev.svg';

const Controls = ( { onPrevClick, onNextClick } ) => {
    return(
        <div className='audio-controls'>
            <button
                type='button'
                className='prev'
                onClick={onPrevClick}
            >
                <Prev />
            </button>
            <button
                type='button'
                className='next'
                onClick={onNextClick}
            >
                <Next />
            </button>
        </div>
    )
}

export default Controls;