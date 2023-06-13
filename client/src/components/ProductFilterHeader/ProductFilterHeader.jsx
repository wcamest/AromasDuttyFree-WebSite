import React, { useState } from 'react'
import CheckBox from '../controls/CheckBox/CheckBox'
import PlusSquareFillIcon from '../Icons/PlusSquareFillIcon';
import TrashFIllIcon from '../Icons/TrashFIllIcon';
import ProductFilterHeaderEvents from './ProductFilterHeader.Events';
import Modal from '../Modal/Modal';
import OutlineSlateButton from '../controls/OutlineSlateButton/OutlineSlateButton';
import SlateButton from '../controls/SlateButton/SlateButton';
import LabeledInput from '../controls/LabeledInput/LabeledInput';
import { ThreeDots } from 'react-loader-spinner';
import PenFIllIcon from '../Icons/PenFIllIcon';

export default function ProductFilterHeader(props) {

    const { id, name, value, update, canDelete, canRename, canCheck, onChange, children } = props;
    const [state, setState] = useState({
        creatingFilter: false,
        renamingFilter: false,
        deletingFilter: false,
        modals: {
            addFilter: {
                inputValue: "",
                visible: false
            },
            renameFilter: {
                inputValue: "",
                visible: false
            },
            deleteFilter: {
                visible: false
            }
        }
    });

    const getState = () => {
        return {
            stateObject: state,
            set: setState
        }
    }

    const Events = new ProductFilterHeaderEvents(getState, {id, name, update});

    return (
        <div className='flex gap-2 items-center'>
            {canCheck ? <CheckBox id={id} name={name} value={value} onChange={onChange}>
                {children}
            </CheckBox> : <span>{children}</span>}
            <button onClick={Events.Modals.AddFilter.Open}><PlusSquareFillIcon className="fill-slate-400 hover:fill-slate-500" /></button>
            {canRename && <button onClick={Events.Modals.RenameFilter.Open}><PenFIllIcon className="fill-slate-400 hover:fill-slate-500" /></button>}
            {canDelete && <button onClick={Events.Modals.DeleteFilter.Open}><TrashFIllIcon className="fill-slate-400 hover:fill-slate-500" /></button>}
            <Modal
                className="w-96 h-36"
                visible={state.modals.addFilter.visible}
                onClose={Events.Modals.AddFilter.Close}
                canClose={!state.creatingFilter}
                buttons={[
                    <OutlineSlateButton key={0} disabled={state.creatingFilter} onClick={Events.Modals.AddFilter.Close}>Cancelar</OutlineSlateButton>,
                    <SlateButton key={1} disabled={state.creatingFilter || state.modals.addFilter.inputValue.length === 0} onClick={Events.Modals.AddFilter.Button.Click}>
                        <span>{state.creatingFilter ? "Creando" : "Crear"}</span>
                        {state.creatingFilter ? <ThreeDots
                            height="25"
                            width="25"
                            radius="9"
                            color="#0f172a"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> : null}
                    </SlateButton>
                ]}
            >
                <div className='w-full h-full flex justify-center items-center'>
                    <LabeledInput className="w-full" inputClassName="w-full" label="Nuevo filtro" name="filterName" id="filterName" placeholder="Nombre" value={state.modals.addFilter.inputValue} onChange={Events.Modals.AddFilter.Input.Change} />
                </div>
            </Modal>
            <Modal
                className="w-96 h-36"
                visible={state.modals.renameFilter.visible}
                onClose={Events.Modals.RenameFilter.Close}
                canClose={!state.renamingFilter}
                buttons={[
                    <OutlineSlateButton key={0} disabled={state.renamingFilter} onClick={Events.Modals.RenameFilter.Close}>Cancelar</OutlineSlateButton>,
                    <SlateButton key={1} disabled={state.renamingFilter || state.modals.renameFilter.inputValue.length === 0} onClick={Events.Modals.RenameFilter.Button.Click}>
                        <span>{state.renamingFilter ? "Renombrando" : "Renombrar"}</span>
                        {state.renamingFilter ? <ThreeDots
                            height="25"
                            width="25"
                            radius="9"
                            color="#0f172a"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> : null}
                    </SlateButton>
                ]}
            >
                <div className='w-full h-full flex justify-center items-center'>
                    <LabeledInput className="w-full" inputClassName="w-full" label="Renombrar filtro" name="filterName" id="filterName" placeholder="Nombre" value={state.modals.renameFilter.inputValue} onChange={Events.Modals.RenameFilter.Input.Change} />
                </div>
            </Modal>
            <Modal
                className="w-96 h-36"
                visible={state.modals.deleteFilter.visible}
                onClose={Events.Modals.DeleteFilter.Close}
                canClose={!state.deletingFilter}
                buttons={[
                    <OutlineSlateButton key={0} disabled={state.deletingFilter} onClick={Events.Modals.DeleteFilter.Close}>Cancelar</OutlineSlateButton>,
                    <SlateButton key={1} disabled={state.deletingFilter} onClick={Events.Modals.DeleteFilter.Button.Click}>
                        <span>{state.deletingFilter ? "Eliminando" : "Eliminar"}</span>
                        {state.deletingFilter ? <ThreeDots
                            height="25"
                            width="25"
                            radius="9"
                            color="#0f172a"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> : null}
                    </SlateButton>
                ]}
            >
                <span>Este filtro se borrará para todos los productos asociados anteriormente</span>
            </Modal>
        </div>
    )
}
