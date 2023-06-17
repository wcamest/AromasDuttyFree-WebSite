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
        UpdateImage(data, action) {
            const state = getState();
            const stateObject = state.stateObject;
            const currentFeaturedImage = state.stateObject.imageGalery.images.find((imageData) => {
                return imageData.featuredImage === true;
            });

            const images = state.stateObject.imageGalery.images.map((imageData) => {
                return {
                    ...imageData,
                    featuredImage: false
                }
            });

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

            if (images.length && featuredImage)
                images[updatedSelected].featuredImage = true;

            const updatedStateObject = {
                ...stateObject,
                imageGalery: {
                    ...stateObject.imageGalery,
                    selected: updatedSelected,
                    images
                }
            }

            if(toDelete.DBData){
                updatedStateObject.imageGalery.pendingToDelete.push(toDelete);
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
        },
        InitDataImages(initData) {
            if (!initData)
                return null;

            const state = getState();
            state.set((stateObject) => {
                return {
                    ...stateObject,
                    imageGalery: {
                        ...stateObject.imageGalery,
                        images: initData.images.map(imageData => {
                            return {
                                featuredImage: imageData.featuredImage,
                                url: imageData.url,
                                description: imageData.description,
                                DBData: {
                                    ...imageData
                                }
                            }
                        })
                    },
                    appliedFilters:initData.filters.split("|").map(id => {
                        return {id}
                    })
                }
            })
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