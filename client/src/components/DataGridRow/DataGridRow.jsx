'use client'

import React, { useState } from 'react'
import DataGridRowDynamicRenderer from './DataGridRow.DynamicRenderer';
import DataGridRowEvents from './DataGridRow.Events';
import DataGridRowFunctions from './DataGridRow.Functions';

export default function DataGridRow(props) {

    const {columns, data, selectedProducts, selectSingleProduct, selectProduct, deselectProduct} = props;

    const Functions = new DataGridRowFunctions(null, {
        data,
        product: {
            selected: selectedProducts
        }
    })
    const Events = new DataGridRowEvents(null, {
        data,
        selected: Functions.Selected,
        product: {
            selected: selectedProducts,
            selectSingle: selectSingleProduct,
            select: selectProduct,
            deselect: deselectProduct
        }
    });
    const Renderer = new DataGridRowDynamicRenderer(null, {
        columns, 
        data, 
        selected: Functions.Selected,
        CheckBox: {
            Change: Events.CheckBox.Change
        }
    });

    return (
        <div className={`w-full h-full max-h-10 ${Functions.Selected() ? 'bg-slate-400' : 'hover:bg-slate-200 active:bg-slate-300'} ${Functions.Selected() ? 'text-slate-100' : 'text-slate-950'} flex justify-start`} onClick={Events.Click}>
            {Renderer.Columns()}
        </div>
    )
}
