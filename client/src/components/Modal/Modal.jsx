'use client'

import React from 'react'
import ModalEvents from './Modal.Events';

export default function Modal(props) {

    const { className, canClose, visible, buttons, children, onClose } = props;

    const modalEvents = new ModalEvents({ onClose, canClose });

    return (
        visible ? <div className='fixed left-0 top-0 p-2 md:p-10 lg:p-24 w-screen h-screen flex justify-center items-center'>
            <div className='absolute w-full h-full bg-black opacity-60' onClick={modalEvents.Click}></div>
            <div className={`${className} relative p-2 bg-white flex flex-col justify-between gap-2`}>
                <div className='h-full overflow-auto'>{children}</div>
                <div className='flex justify-end gap-2'>{buttons}</div>
            </div>
        </div> : null
    )
}
