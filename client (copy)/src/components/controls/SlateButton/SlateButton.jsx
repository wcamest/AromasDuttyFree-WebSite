import React from 'react'

export default function SlateButton(props) {

    const { disabled, size, className, children, onClick } = props;
    const paddingClassNames = {
        "small" : "px-2.5 py"
    }
    const gapClassNames = {
        "small" : "gap-1.5"
    }

    const textSizeClassName = {
        "small" : "text-sm"
    }

    return (
        <button className={`${className ? className + " ": ""} h-max flex justify-center items-center ${size ? textSizeClassName[size] : "text-base"} ${size ? gapClassNames[size] : "gap-3.5"} ${size ? paddingClassNames[size] : "px-5 py-2.5"} border border-slate-500 border-solid bg-slate-500 hover:bg-slate-600 active:bg-slate-900 text-slate-100 disabled:bg-transparent disabled:border-slate-300 disabled:text-slate-300 disabled:cursor-not-allowed`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}
