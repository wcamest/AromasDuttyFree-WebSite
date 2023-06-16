'use client'

import React from 'react'

export default function TreeView(props) {

    const { children } = props;

    return (
        <div className='p-2'>{children}</div>
    )
}
