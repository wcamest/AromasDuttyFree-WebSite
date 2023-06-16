'use client'

import React, { useState } from 'react'
import DataGridDynamicRenderer from './DataGrid.DynamicRenderer';
import DataGridEvents from './DataGrid.Events';

export default function DataGrid(props) {

    const { columns, data, selectedProducts, selectSingleProduct, selectProduct, deselectProduct } = props;
    const [state, setState] = useState({
        TableHeaders: {
            CheckBox: {
                Value: false
            }
        }
    });

    const getState = () => {
        return {
            stateObject: state,
            set: setState
        }
    }

    const Events = new DataGridEvents(getState);
    const Renderer = new DataGridDynamicRenderer(getState, {
        columns,
        data,
        TableHeaders: {
            CheckBox: {
                Value: state.TableHeaders.CheckBox.Value,
                Change: Events.TableHeaders.CheckBox.Change
            }
        },
        product: {
            selected: selectedProducts,
            selectSingle: selectSingleProduct,
            select: selectProduct,
            deselect: deselectProduct
        }
    });

    return (
        <div className='h-full flex flex-col overflow-hidden'>
            <div className='h-full overflow-x-auto overflow-y-hidden flex flex-col'>
                <div className='w-full min-w-fit h-10 bg-slate-800 text-slate-100 flex justify-stretch'>
                    {Renderer.TableHeaders()}
                </div>
                <div className='w-full min-w-fit h-full overflow-x-hidden overflow-y-auto flex flex-col'>
                    {Renderer.Rows()}
                </div>
            </div>
            <div className='h-20'>

            </div>
        </div>
    )
}
