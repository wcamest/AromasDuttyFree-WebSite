import React from 'react'

export default function DataGridTableHeader(props) {

    const { data, children } = props;

    return (
        <div style={{minWidth: `${data.width}px`, maxWidth: `${data.width}px`}} className='px-4 grid place-items-center select-none cursor-pointer'>{children}</div>
    )
}
