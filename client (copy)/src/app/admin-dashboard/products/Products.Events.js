import ServerInterface from "@/ServerInterface/ServerInterface";

function ProductsEvents(getState) {
    this.Modals = {
        CreateOrEditProduct: {
            Open(event, initData, action, actionButtonLabel, disableCreateOrUpdateButton) {

                event.stopPropagation();

                const state = getState();
                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        createOrEditProduct: {
                            ...stateObject.createOrEditProduct,
                            visibleModal: true,
                            disableCreateOrUpdateButton,
                            initData,
                            action,
                            actionButtonLabel
                        }
                    }
                })
            },
            Close() {
                const state = getState();
                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        createOrEditProduct: {
                            ...stateObject.createOrEditProduct,
                            disableCreateOrUpdateButton: true,
                            visibleModal: false,
                            data: null,
                            initData: null,
                            action: null,
                            actionButtonLabel: {idle: null, uploading: null}
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