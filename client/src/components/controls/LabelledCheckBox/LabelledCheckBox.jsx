import React, { useState } from 'react';
import LabelledCheckBoxEvents from './LabelledCheckBox.Events';

export default function LabelledCheckBox(props) {

    const {id, name, value, onChange, children} = props;

    const checkBoxEvents = new LabelledCheckBoxEvents({id, name, value, onChange});

    return (
        <div className='flex items-center gap-2'>
            <div style={{width: "16px", height: "16px"}} className='p-0.5 border border-slate-300 hover:border-slate-600 focus:border-slate-900 border-solid cursor-pointer' onClick={checkBoxEvents.OnClick}>
                <div className={`${value ? 'block' : 'hidden'} w-full h-full bg-slate-800`}></div>
            </div>
            <label className='select-none' htmlFor={name} onClick={checkBoxEvents.OnClick}>{children}</label>
        </div>
    )
}
