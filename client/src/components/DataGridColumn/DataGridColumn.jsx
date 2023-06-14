import React from 'react'

export default function DataGridColumn(props) {

    const { columns, data, children } = props;

    return (
        <div style={{minWidth: `${data.width}px`, maxWidth: `${data.width}px`}} className='px-4 flex justify-center items-center select-none cursor-pointer'>{children}</div>
    )
}