import React from 'react';

import {ReactComponent as Next } from './assets/next.svg';
import {ReactComponent as Prev } from './assets/prev.svg';

const Controls = ( props ) => {
    <div className='audio-controls'>
        <button
            type='button'
            className='prev'
        >
            <Prev />
        </button>
        <button
            type='button'
            className='next'
        >
            <Next />
        </button>
    </div>
}