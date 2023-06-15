'use client'

import React, { useState } from 'react'
import DataGridDynamicRenderer from './DataGrid.DynamicRenderer';

export default function DataGrid(props) {

    const {columns, data} = props;
    const [state, setState] = useState({});

    const getState = () => {
        return {
            stateObject: state,
            set: setState
        }
    }

    const dataGridDynamicRenderer = new DataGridDynamicRenderer(getState, {columns});

    return (
        <div className='h-full flex flex-col'>
            <div className='h-full max-h-10 bg-slate-200 flex justify-stretch'>
                {dataGridDynamicRenderer.Columns()}
            </div>
            <div></div>
        </div>
    )
}
