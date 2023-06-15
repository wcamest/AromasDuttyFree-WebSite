'use client'

import DataGrid from '@/components/DataGrid/DataGrid'
import Modal from '@/components/Modal/Modal'
import SlateButton from '@/components/controls/SlateButton/SlateButton'
import React, { useState } from 'react'
import ProductsEvents from './Products.Events'
import OutlineSlateButton from '@/components/controls/OutlineSlateButton/OutlineSlateButton'
import ProductEditor from '@/components/ProductEditor/ProductEditor'
import ProductsFunctions from './Products.Functions'
import { ThreeDots } from 'react-loader-spinner'

export default function page() {

  const columns = [
    {
      field: 'id',
      headerName: "ID",
      width: 50
    },
    {
      field: 'name',
      headerName: "Nombre",
      width: 200
    },
    {
      field: 'productReferenceId',
      headerName: "Referencia",
      width: 200
    },
    {
      field: 'salePrice',
      headerName: "precio de venta",
      width: 150
    }
  ];

  const [state, setState] = useState({
    createProduct: {
      visibleModal: false,
      disableCreateButton: true,
      creatingProduct: false,
      data: null
    }
  })

  const getState = () => {
    return {
      stateObject: state,
      set: setState
    }
  }

  const Functions = new ProductsFunctions(getState);
  const Events = new ProductsEvents(getState);

  return (
    <div className='h-full min-h-screen flex flex-col'>
      <div className='h-full max-h-14 flex items-center'>
        <SlateButton onClick={Events.Modals.CreateProduct.Open}>Crear Producto</SlateButton>
      </div>
      <DataGrid columns={columns} />
      <Modal
        className="w-full h-full"
        visible={state.createProduct.visibleModal}
        onClose={Events.Modals.CreateProduct.Close}
        canClose={true}
        buttons={[
          <OutlineSlateButton key={0} onClick={Events.Modals.CreateProduct.Close} disabled={state.createProduct.creatingProduct }>Cancelar</OutlineSlateButton>,
          <SlateButton key={1} disabled={state.createProduct.disableCreateButton || state.createProduct.creatingProduct} onClick={() => { Functions.CreateProduct.UploadData() }}>
            <span>{state.createProduct.creatingProduct ? "Creando" : "Crear"}</span>
            {state.createProduct.creatingProduct ? <ThreeDots
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
        {state.createProduct.visibleModal && <ProductEditor setDisableUpdateButton={Functions.CreateProduct.DisableCreateButton.Set} updateFunction={Functions.CreateProduct.Update} />}
      </Modal>
    </div>
  )
}
