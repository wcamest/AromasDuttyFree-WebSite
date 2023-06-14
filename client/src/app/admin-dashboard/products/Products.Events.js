import ServerInterface from "@/ServerInterface/ServerInterface";

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
        },
        DeleteProducts: {
            Open() {
                const state = getState();
                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        deleteProducts: {
                            ...stateObject.deleteProducts,
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
                        deleteProducts: {
                            ...stateObject.deleteProducts,
                            visibleModal: false
                        }
                    }
                })
            },
            Button: {
                async Click(){
                    const state = getState();
                    const toDelete = state.stateObject.products.selected;
                    const offset = 0;

                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            deleteProducts: {
                                ...stateObject.deleteProducts,
                                deletingProducts: true
                            }
                        }
                    });

                    const result = await ServerInterface.Product.Delete({toDelete, offset});

                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            deleteProducts: {
                                ...stateObject.deleteProducts,
                                deletingProducts: false,
                                visibleModal: false
                            },
                            products: {
                                all: result,
                                selected: []
                            }
                        }
                    });
                }
            }
        }
    }
}

export default ProductsEvents;