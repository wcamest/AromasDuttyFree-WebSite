'use client'

import DataGrid from '@/components/DataGrid/DataGrid'
import Modal from '@/components/Modal/Modal'
import SlateButton from '@/components/controls/SlateButton/SlateButton'
import React, { useEffect, useState } from 'react'
import ProductsEvents from './Products.Events'
import OutlineSlateButton from '@/components/controls/OutlineSlateButton/OutlineSlateButton'
import ProductEditor from '@/components/ProductEditor/ProductEditor'
import ProductsFunctions from './Products.Functions'
import { ThreeDots } from 'react-loader-spinner'
import ServerInterface from '@/ServerInterface/ServerInterface'
import Image from 'next/image'
import PenFIllIcon from '@/components/Icons/PenFIllIcon'

export default function Page() {

  const [state, setState] = useState({
    createOrEditProduct: {
      visibleModal: false,
      disableCreateOrUpdateButton: true,
      creatingOrUpdatingProduct: false,
      data: null,
      initData: null,
      action: null,
      actionButtonLabel: {
        idle: null,
        uploading: null
      }
    },
    deleteProducts: {
      visibleModal: false,
      deletingProducts: false
    },
    products: {
      all: [],
      selected: []
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


  const columns = [
    {
      field: 'featuredImage',
      headerName: "Imagen",
      width: 100,
      query: (data) => {
        if (!data.images.length)
          return null;

        const image = data.images.find((imageData => {
          return imageData.featuredImage === true
        }));

        if (!image)
          return null;

        return image.url;
      },
      render: (url) => {
        if (!url)
          return null;

        return <div style={{width: "30px", height: "30px"}} className='relative'>
          <Image src={`${url}?box_size=30`} fill={true} alt="preview" />
        </div>
      }
    },
    {
      field: 'name',
      headerName: "Nombre",
      width: 200
    },
    {
      field: 'productReference',
      headerName: "Referencia",
      width: 200
    },
    {
      field: 'salePrice',
      headerName: "Precio de venta",
      width: 150
    },
    {
      field: null,
      headerName: "Editar",
      query: (data) => {
        return data;
      },
      render: (data, selected) => {
        return <button
          className={`p-2 ${selected ? "hover:bg-slate-500" : "hover:bg-slate-300"} ${selected ? "active:bg-slate-600" : "active:bg-slate-400"} rounded-full`}
          onClick={(event) => { Events.Modals.CreateOrEditProduct.Open(event, data, "UPDATE", { idle: "Guardar", uploading: "Guardando" }, false) }}
        ><PenFIllIcon /></button>
      }
    }
  ];

  useEffect(() => {
    (async () => {
      const products = await ServerInterface.Product.All(0);
      Functions.Products.Set(products);
    })();
  }, []);

  return (
    <div className='h-full flex flex-col overflow-hidden'>
      <div className='py-2 h-full max-h-14 flex items-center gap-2'>
        <SlateButton onClick={(event) => { Events.Modals.CreateOrEditProduct.Open(event, null, "CREATE", { idle: "Crear", uploading: "Creando" }, true) }}>Crear producto</SlateButton>
        {state.products.selected.length ? <OutlineSlateButton onClick={Events.Modals.DeleteProducts.Open}>Eliminar producto(s)</OutlineSlateButton> : null}
      </div>
      <DataGrid columns={columns} data={state.products.all} selectedProducts={state.products.selected} selectSingleProduct={Functions.Products.SelectSingle} selectProduct={Functions.Products.Select} deselectProduct={Functions.Products.Deselect} />
      <Modal
        className="w-full h-full"
        visible={state.createOrEditProduct.visibleModal}
        onClose={Events.Modals.CreateOrEditProduct.Close}
        canClose={true}
        buttons={[
          <OutlineSlateButton key={0} onClick={Events.Modals.CreateOrEditProduct.Close} disabled={state.createOrEditProduct.creatingOrUpdatingProduct}>Cancelar</OutlineSlateButton>,
          <SlateButton key={1} disabled={state.createOrEditProduct.disableCreateOrUpdateButton || state.createOrEditProduct.creatingOrUpdatingProduct} onClick={() => { Functions.CreateOrEditProduct.UploadData() }}>
            <span>{
              state.createOrEditProduct.creatingOrUpdatingProduct ?
                state.createOrEditProduct.actionButtonLabel.uploading :
                state.createOrEditProduct.actionButtonLabel.idle
            }</span>
            {state.createOrEditProduct.creatingOrUpdatingProduct ? <ThreeDots
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
        {state.createOrEditProduct.visibleModal && <ProductEditor initData={state.createOrEditProduct.initData} setDisableUpdateButton={Functions.CreateOrEditProduct.DisableCreateOrUpdateButton.Set} updateFunction={Functions.CreateOrEditProduct.Update} />}
      </Modal>
      <Modal
        className="w-96 h-36"
        visible={state.deleteProducts.visibleModal}
        onClose={Events.Modals.DeleteProducts.Close}
        canClose={!state.deleteProducts.deletingProducts}
        buttons={[
          <OutlineSlateButton key={0} disabled={state.deleteProducts.deletingProducts} onClick={Events.Modals.DeleteProducts.Close}>Cancelar</OutlineSlateButton>,
          <SlateButton key={1} disabled={state.deleteProducts.deletingProducts} onClick={Events.Modals.DeleteProducts.Button.Click}>
            <span>{state.deleteProducts.deletingProducts ? "Eliminando" : "Eliminar"}</span>
            {state.deleteProducts.deletingProducts ? <ThreeDots
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
        <span>Los productos seleccionados se borrarán permanentemente</span>
      </Modal>
    </div>
  )
}
