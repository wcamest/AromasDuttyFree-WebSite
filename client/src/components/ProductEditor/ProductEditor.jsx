'use client'

import React, { useEffect, useRef, useState } from 'react'
import SlateButton from '../controls/SlateButton/SlateButton'
import ProductEditorEvents from './ProductEditor.Events';
import ProductEditorRenderer from './ProductEditor.Renderer';
import OutlineSlateButton from '../controls/OutlineSlateButton/OutlineSlateButton';
import Input from '../controls/Input/Input';
import LabelledInput from '../controls/LabelledInput/LabelledInput';
import LabelledTextArea from '../controls/LabelledTextArea/LabelledTextArea';
import TreeView from '../TreeView/TreeView';
import TreeViewItem from '../TreeViewItem/TreeViewItem';
import ServerInterface from '@/ServerInterface/ServerInterface';
import ProductEditorFunctions from './ProductEditor.Functions';

export default function ProductEditor(props) {

    const { setDisableUpdateButton, updateFunction } = props;

    const [state, setState] = useState({
        productForm: {
            name: '',
            productReference: '',
            description: '',
            salePrice: 0,
            disableUpdateButton: false
        },
        imageGalery: {
            images: [],
            pendingToUpload: [],
            selected: 0
        },
        productFilters: null,
        productFiltersStack: null,
        appliedFilters: []
    });
    const fileInputRef = useRef(null);

    const getState = () => {
        return {
            stateObject: state,
            set: setState
        }
    }

    const Functions = new ProductEditorFunctions(getState, { updateFunction });
    const Events = new ProductEditorEvents(getState, { fileInputRef, setDisableUpdateButton, updateFunction });
    const Renderer = new ProductEditorRenderer(getState, {
        ProductFilters: {
            CheckBox: {
                Change: Events.ProductFilters.CheckBox.Change
            },
            Update: Functions.ProductFilters.Update
        },
        ImageGalery: {
            UpdateImage: Functions.ImageGalery.UpdateImage,
            SelectImage: Functions.ImageGalery.SelectImage,
            DeleteImage: Functions.ImageGalery.DeleteImage
        }
    });

    useEffect(() => {

        (async () => {
            const filters = await ServerInterface.ProductFilter.All();
            Functions.ProductFilters.Update(filters);
        })();

    }, []);

    return (
        <div className='w-full h-full flex gap-2'>
            <div className='w-full max-w-xs flex flex-col gap-2'>
                <div className='w-full p-2 aspect-square bg-slate-300 flex justify-center items-center'>
                    {Renderer.ProductImageControls()}
                </div>
                <input className='hidden' ref={fileInputRef} type='file' accept="image/jpeg, image/png" onChange={Events.ImageGalery.FileInput.Change} />
                <div className='flex gap-2'>
                    <SlateButton className="w-full" onClick={Events.ImageGalery.AddImageButton.Click}><span className='text-xs'>Agregar imagen</span></SlateButton>
                    <OutlineSlateButton className="w-full" onClick={Events.ImageGalery.ClearImageGaleryButton.Click}><span className='text-xs'>Limpiar galería</span></OutlineSlateButton>
                </div>
                <div className='w-full pt-2 overflow-auto flex justify-center flex-wrap content-start gap-3'>
                    {Renderer.ImageGalery()}
                </div>
            </div>
            <div className='w-full flex gap-2'>
                <div className='w-6/12 flex flex-col gap-2'>
                    <LabelledInput inputClassName="w-full" label="Nombre del producto" type="text" id="name" name="name" placeholder="Nombre del producto" value={state.productForm.name} onChange={Events.Inputs.Change} />
                    <LabelledInput inputClassName="w-full" label="Referencia" type="text" id="productReference" name="productReference" placeholder="Referencia" value={state.productForm.productReference} onChange={Events.Inputs.Change} />
                    <LabelledInput inputClassName="w-full" label="Precio de venta" type="text" id="salePrice" name="salePrice" placeholder="Precio de venta" value={state.productForm.salePrice} onChange={Events.Inputs.Change} />
                    <span>{Functions.formattedSalePrice()}</span>
                </div>
                <div className='w-6/12 flex flex-col gap-2'>
                    <LabelledTextArea className="h-full max-h-48" id="description" name="description" placeholder="Descripción del producto" onChange={Events.Inputs.Change}>{state.productForm.description}</LabelledTextArea>
                    <div style={{ height: "calc(100% - 100px)" }} className='w-full h-full flex flex-col justify-end gap-2'>
                        <span>Filtros y clasificaciones</span>
                        <div className='w-full h-full border border-solid border-slate-400 overflow-auto'>
                            {Renderer.ProductFilters()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}