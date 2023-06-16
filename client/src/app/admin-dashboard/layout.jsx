'use client'

import ListIcon from '@/components/Icons/ListIcon';
import ListBox from '@/components/ListBox/ListBox';
import ListItem from '@/components/ListItem/ListItem';
import React, { useState } from 'react'
import AdminDashboardLayoutEvents from './AdminDashboardLayout.Events';

export default function Layout(props) {

    const { children } = props;
    const [state, setState] = useState({
        mobileMenu: {
            expanded: false
        }
    });

    const getState = () => {
        return {
            stateObject: state,
            set: setState
        }
    }

    const Events = new AdminDashboardLayoutEvents(getState);

    return (
        <div className='w-full h-full min-h-screen flex justify-center'>
            <div className='px-2 lg:p-0 w-full min-h-screen flex flex-col lg:flex-row lg:gap-5'>
                <div className='block lg:hidden w-full h-10'></div>
                <div className='hidden h-max lg:flex flex-col gap-5 sticky top-0 min-w-xs'>
                    <ListBox>
                        <ListItem href="/admin-dashboard/products">Productos</ListItem>
                        <ListItem href="/admin-dashboard/promotions">Promociones</ListItem>
                    </ListBox>
                </div>
                <div className='hidden lg:block h-full py-5'>
                    <div className='h-full border-l border-l-solid border-l-slate-300'></div>
                </div>
                <div className='w-full h-full overflow-hidden'>
                    {children}
                </div>
                <div className={`block lg:hidden fixed p-1 w-screen ${state.mobileMenu.expanded ? "h-screen" : "h-10"} left-0 flex flex-col bg-white gap-2`}>
                    <div className='w-full h-8 flex justify-end items-center'>
                        <button
                            style={{ width: "32px", height: "32px" }}
                            className='hover:bg-slate-200 active:bg-slate-300 flex justify-center items-center'
                            onClick={Events.MobileMenu.ToggleShowHide}
                        >
                            <ListIcon className="scale-200 fill-slate-500" /></button>
                    </div>
                    {state.mobileMenu.expanded && <div className='h-full overflow-auto'>
                        <ListBox>
                            <ListItem href="/admin-dashboard/products" onClick={Events.MobileMenu.ToggleShowHide}>Productos</ListItem>
                            <ListItem href="/admin-dashboard/promotions" onClick={Events.MobileMenu.ToggleShowHide}>Promociones</ListItem>
                        </ListBox>
                    </div>}
                </div>
            </div>
        </div>
    )
}
