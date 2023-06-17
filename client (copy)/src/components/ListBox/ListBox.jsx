'use client'

import { useState } from 'react'
import ListBoxDynamicRenderer from './ListBox.DynamicRenderer';

export default function ListBox(props) {

    const {children} = props;
    const [state, setState] = useState({
        selectedIndex: 0
    });

    const getState = () => {
        return {
            stateObject: state,
            set: setState
        }
    }

    const dynamicRenderer = new ListBoxDynamicRenderer(getState);

    return (
        <div>
            {dynamicRenderer.Items(children)}
        </div>
    )
}
