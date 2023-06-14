import React from 'react'
import DataGridRowDynamicRenderer from './DataGridRow.Renderer';

export default function DataGridRow(props) {

    const {columns, data} = props;

    const Renderer = new DataGridRowDynamicRenderer(null, {columns, data});

    return (
        <div className='h-full max-h-10 hover:bg-slate-200 flex justify-start'>
            {Renderer.Columns()}
        </div>
    )
}
