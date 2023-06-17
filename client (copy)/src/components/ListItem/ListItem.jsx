'use client'

import React from 'react'
import ListItemEvents from './ListItem.Events';
import { useRouter } from 'next/navigation';
import ListItemDynamicRenderer from './ListItem.DynamicRenderer';

export default function ListItem(props) {

    const { getState, index, href, children, onClick } = props;
    const router = useRouter();

    const Events = new ListItemEvents(getState, { href, index, router, onClick });
    const Renderer = new ListItemDynamicRenderer(getState, { index });

    return (
        <div className={`${Renderer.SelectedItem()} select-none cursor-pointer`} onClick={Events.OnClick}>{children}</div>
    )
}
