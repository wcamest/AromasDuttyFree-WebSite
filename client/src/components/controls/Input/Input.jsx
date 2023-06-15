import React from 'react'

export default function Input(props) {

    const { className, display, icon, type, id, name, value, placeholder, onChange } = props;

    const renderIcon = () => {
        const IconComponent = icon;

        if(!IconComponent)
            return null;

        return <IconComponent className='absolute ml-2' width='16' height='16' />
    }

    return (
        <div className={`${display} bg-white items-center gap-3`}>
            {renderIcon()}
            <input className={`${className} border border-solid border-slate-400 hover:border-slate-600 p-1.5 outline-none`} type={type}  id={id} name={name} value={value} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}
