'use client'

import React, { useState } from 'react'
import TreeViewItemEvent from './TreeViewItem.Events';
import DashCircleFillIcon from '../Icons/DashCircleFillIcon';
import PlusCircleFIllIcon from '../Icons/PlusCircleFIllIcon';

export default function TreeViewItem(props) {

    const { header, children } = props;
    const [state, setState] = useState({
        expanded: true
    });

    const getState = () => {
        return {
            stateObject: state,
            set: setState
        }
    }

    const Events = new TreeViewItemEvent(getState);

    return (
        <div className='max-w-max'>
            <div className='flex gap-2 items-center max-w-max'>
                {
                    <button className={children ? '' : 'opacity-0'} onClick={Events.ExpandCollapseButton.Click} disabled={!children}>{state.expanded ? <DashCircleFillIcon className='fill-slate-300 hover:fill-slate-400 active:fill-slate-500' /> : <PlusCircleFIllIcon className='fill-slate-300 hover:fill-slate-400 active:fill-slate-500' />}</button>
                }
                <div>{header}</div>
            </div>
            <div className={`${children && state.expanded ? '' : 'hidden '}pl-6 max-w-max`}>{children}</div>
        </div>
    )
}
