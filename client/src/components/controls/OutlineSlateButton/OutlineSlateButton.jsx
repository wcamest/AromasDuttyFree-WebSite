import React from 'react'

export default function OutlineSlateButton(props) {

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
        <button className={`${className} h-max flex justify-center items-center ${size ? textSizeClassName[size] : "text-base"} ${size ? gapClassNames[size] : "gap-3.5"} ${size ? paddingClassNames[size] : "px-5 py-2.5"} bg-slate-100 hover:bg-slate-200 active:bg-slate-400 text-slate-900 active:text-slate-100 border border-solid border-slate-500 hover:border-slate-600 active:border-slate-900 text-slate-100 disabled:bg-transparent disabled:border-slate-300 disabled:text-slate-300 disabled:cursor-not-allowed`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}
