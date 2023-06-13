function ProductEditorFunctions(getState, payload) {
    this.ProductFilters = {
        Update(data) {
            const state = getState();
            state.set((stateObject) => {
                return {
                    ...stateObject,
                    productFilters: data
                }
            });
        }
    }

    this.ImageGalery = {
        UpdateImage(data) {
            const state = getState();
            const stateObject = state.stateObject;
            const images = state.stateObject.imageGalery.images.map((imageData) => {
                return {
                    ...imageData,
                    featuredImage: false
                }
            });

            const oldImageData = images[state.stateObject.imageGalery.selected];
            const isPendingToUpload = state.stateObject.imageGalery.pendingToUpload.includes(oldImageData);

            images[state.stateObject.imageGalery.selected] = data;

            const updatedStateObject = {
                ...stateObject,
                imageGalery: {
                    ...stateObject.imageGalery,
                    images
                }
            }

            payload.updateFunction(updatedStateObject);

            state.set((stateObject) => {

                return updatedStateObject;
            })
        },
        DeleteImage() {
            const state = getState();
            const stateObject = state.stateObject;
            let images = state.stateObject.imageGalery.images;
            let pendingToUpload = state.stateObject.imageGalery.pendingToUpload;
            const selected = state.stateObject.imageGalery.selected;
            const toDelete = images[selected];

            let updatedSelected = selected;
            let featuredImage = images[selected].featuredImage;

            if (images.length > 1 && selected === images.length - 1) {
                updatedSelected = images.length - 2;
            }

            images = images.filter((imageData) => {
                return imageData !== toDelete;
            });

            pendingToUpload = images.filter((imageData) => {
                return imageData !== toDelete;
            });

            if (images.length && featuredImage)
                images[updatedSelected].featuredImage = true;

            const updatedStateObject = {
                ...stateObject,
                imageGalery: {
                    ...stateObject.imageGalery,
                    selected: updatedSelected,
                    images,
                    pendingToUpload
                }
            }

            payload.updateFunction(updatedStateObject);

            state.set(() => {
                return updatedStateObject;
            });
        },
        SelectImage(index) {
            const state = getState();
            const stateObject = state.stateObject;

            const updatedStateObject = {
                ...stateObject,
                imageGalery: {
                    ...stateObject.imageGalery,
                    selected: index
                }
            }

            payload.updateFunction(updatedStateObject);

            state.set((stateObject) => {

                return updatedStateObject;
            });
        }
    }

    this.formattedSalePrice = () => {
        const state = getState();

        var value = `${state.stateObject.productForm.salePrice}`.replace(/[^0-9.]/g, '');
        const formattedValue = parseFloat(value).toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
        return formattedValue.replace(",00", "");
    }
}

export default ProductEditorFunctions;