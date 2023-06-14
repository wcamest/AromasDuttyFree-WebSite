import ListBox from '@/components/ListBox/ListBox';
import ListItem from '@/components/ListItem/ListItem';
import React from 'react'

export const metadata = {
    title: 'Aromas Duty Free - Panel de control',
};

export default function layout(props) {

    const { children } = props;

    return (
        <div className='w-full h-full min-h-screen flex justify-center'>
            <div className='w-full min-h-screen flex gap-5'>
                <div className='h-max flex flex-col gap-5 sticky top-0 min-w-xs'>
                    <ListBox>
                        <ListItem href="/admin-dashboard/products">Productos</ListItem>
                        <ListItem href="/admin-dashboard/promotions">Promociones</ListItem>
                    </ListBox>
                </div>
                <div className='h-full py-5'>
                    <div className='h-full border-l border-l-solid border-l-slate-300'></div>
                </div>
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}
