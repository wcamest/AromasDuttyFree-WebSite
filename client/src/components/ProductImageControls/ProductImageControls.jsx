import React, { useState } from 'react'
import SlateButton from '../controls/SlateButton/SlateButton'
import BookmarkIcon from '../Icons/BookmarkIcon'
import OutlineSlateButton from '../controls/OutlineSlateButton/OutlineSlateButton'
import Image from 'next/image';
import ProductImageControlsEvents from './ProductImageControls.Events';
import Modal from '../Modal/Modal';
import LabelledInput from '../controls/LabelledInput/LabelledInput';
import { ThreeDots } from 'react-loader-spinner';

export default function ProductImageControls(props) {

    const {data, updateImage, deleteImage } = props;
    const [state, setState] = useState({
        savingDescription: false,
        modals: {
            editDescription: {
                inputValue: "",
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

    const Events = new ProductImageControlsEvents(getState, {data, updateImage, deleteImage});

    return (
        <div className='w-full h-full flex flex-col items-center gap-2'>
            <div style={{width: "274px", height: "274px"}} className='relative aspect-square flex justify-center items-center'>
                <Image src={`${data.url}?box_size=274px`} fill={true} alt={data.description} />
            </div>
            <div className='h-max flex justify-center gap-2'>
                <SlateButton size="small" disabled={data.featuredImage} onClick={Events.FeaturedImageButton.Click}>
                    <BookmarkIcon />
                    <span>Destacado</span>
                </SlateButton>
                <OutlineSlateButton size="small" onClick={Events.Modals.EditDescription.Open}>
                    Descripcion
                </OutlineSlateButton>
                <OutlineSlateButton size="small" onClick={Events.DeleteImageButton.Click}>
                    Borrar
                </OutlineSlateButton>
            </div>
            <Modal
                className="w-96 h-36"
                visible={state.modals.editDescription.visible}
                onClose={Events.Modals.EditDescription.Close}
                canClose={!state.savingDescription}
                buttons={[
                    <OutlineSlateButton key={0} disabled={state.savingDescription} onClick={Events.Modals.EditDescription.Close}>Cancelar</OutlineSlateButton>,
                    <SlateButton key={1} disabled={state.savingDescription || state.modals.editDescription.inputValue.length === 0} onClick={Events.Modals.EditDescription.Button.Click}>
                        <span>{state.savingDescription ? "Guardando" : "Guardar"}</span>
                        {state.savingDescription ? <ThreeDots
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
                    <LabelledInput className="w-full" inputClassName="w-full" label="Editar descripción" name="description" id="description" placeholder="Descripción" value={state.modals.editDescription.inputValue} onChange={Events.Modals.EditDescription.Input.Change} />
                </div>
            </Modal>
        </div>
    )
}
