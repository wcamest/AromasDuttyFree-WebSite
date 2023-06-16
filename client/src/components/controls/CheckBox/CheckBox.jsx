import React, { useState } from 'react';
import CheckBoxEvents from './CheckBox.Events';

export default function CheckBox(props) {

    const {id, name, value, onChange, children} = props;

    const checkBoxEvents = new CheckBoxEvents({id, name, value, onChange});

    return (
        <div className='flex justify-center items-center'>
            <div style={{width: "16px", height: "16px"}} className='p-0.5 bg-white border border-slate-300 hover:border-slate-600 focus:border-slate-900 border-solid cursor-pointer' onClick={checkBoxEvents.OnClick}>
                <div className={`${value ? 'block' : 'hidden'} w-full h-full bg-slate-800`}></div>
            </div>
            <label className='select-none' htmlFor={name} onClick={checkBoxEvents.OnClick}>{children}</label>
        </div>
    )
}
