function ProductImageGaleryItemEvents(getState, payload){
    this.Click = (event) => {
        payload.selectImage(payload.index);
    }
}

export default ProductImageGaleryItemEvents;