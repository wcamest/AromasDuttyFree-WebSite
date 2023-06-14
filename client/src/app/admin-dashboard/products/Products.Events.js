function ProductsEvents(getState) {
    this.Modals = {
        CreateProduct: {
            Open() {
                const state = getState();
                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        createProduct: {
                            ...stateObject.createProduct,
                            visibleModal: true
                        }
                    }
                })
            },
            Close() {
                const state = getState();
                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        createProduct: {
                            ...stateObject.createProduct,
                            visibleModal: false
                        }
                    }
                })
            }
        }
    }
}

export default ProductsEvents;