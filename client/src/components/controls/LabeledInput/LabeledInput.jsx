import React from 'react'
import Input from '../Input/Input'

export default function LabeledInput(props) {

    const { className, inputClassName, label, display, icon, type, id, name, value, placeholder, onChange } = props;

    return (
        <div className={`${className} flex flex-col gap-1`}>
            <label htmlFor={name}>{label}</label>
            <Input className={inputClassName} display={display} icon={icon} type={type} id={id} name={name} value={value} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}
