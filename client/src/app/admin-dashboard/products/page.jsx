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

export default function page() {

  const columns = [
    {
      field: 'featuredImage',
      headerName: "Imagen",
      width: 100,
      query: (data) => {
        if (!data.images.length)
          return null;

        return data.images[0].path;
      },
      render: (url) => {
        if(!url)
          return null;

        return <Image src={url} width={30} height={30} alt="preview" />
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

  useEffect(() => {
    (async () => {
      const products = await ServerInterface.Product.All(0);
      Functions.Products.Set(products);
    })();
  }, []);

  return (
    <div className='h-full max-h-screen min-h-screen flex flex-col'>
      <div className='py-2 h-full max-h-14 flex items-center gap-2'>
        <SlateButton onClick={Events.Modals.CreateProduct.Open}>Crear producto</SlateButton>
        {state.products.selected.length ? <OutlineSlateButton onClick={Events.Modals.DeleteProducts.Open}>Eliminar producto(s)</OutlineSlateButton> : null}
      </div>
      <DataGrid columns={columns} data={state.products.all} selectedProducts={state.products.selected} selectSingleProduct={Functions.Products.SelectSingle} selectProduct={Functions.Products.Select} deselectProduct={Functions.Products.Deselect} />
      <Modal
        className="w-full h-full"
        visible={state.createProduct.visibleModal}
        onClose={Events.Modals.CreateProduct.Close}
        canClose={true}
        buttons={[
          <OutlineSlateButton key={0} onClick={Events.Modals.CreateProduct.Close} disabled={state.createProduct.creatingProduct}>Cancelar</OutlineSlateButton>,
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
