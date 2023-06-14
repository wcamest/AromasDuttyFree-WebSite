import React from 'react'

export default function LabelledTextArea(props) {

    const { className, id, name, placeholder, children, onChange } = props;

    return (
        <div className={`${className} flex flex-col justify-between gap-1`}>
            <label htmlFor={name}>Descripción</label>
            <textarea id={id} name={name} placeholder={placeholder} className="w-full h-full border border-solid border-slate-400 hover:border-slate-600 p-1.5 outline-none resize-none" value={children} onChange={onChange}>
                
            </textarea>
        </div>
    )
}
