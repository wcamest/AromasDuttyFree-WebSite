import ServerInterface from "@/ServerInterface/ServerInterface";
import ProductsController from "./ProductsController";

function ProductsFunctions(getState, payload) {
    this.CreateOrEditProduct = {
        DisableCreateOrUpdateButton: {
            Set(value) {
                const state = getState();
                state.set(stateObject => {
                    return {
                        ...stateObject,
                        createOrEditProduct: {
                            ...stateObject.createOrEditProduct,
                            disableCreateOrUpdateButton: value
                        }
                    }
                })
            }
        },
        Update(data) {
            const state = getState();
            state.set(stateObject => {
                return {
                    ...stateObject,
                    createOrEditProduct: {
                        ...stateObject.createOrEditProduct,
                        data
                    }
                }
            })
        },
        async UploadData() {
            const state = getState();
            state.set((stateObject) => {
                return {
                    ...stateObject,
                    createOrEditProduct: {
                        ...stateObject.createOrEditProduct,
                        creatingOrUpdatingProduct: true
                    }
                }
            });

            const data = await ProductsController.Upload(state);

            state.set((stateObject) => {
                return {
                    ...stateObject,
                    createOrEditProduct: {
                        ...stateObject.createOrEditProduct,
                        disableCreateOrUpdateButton: true,
                        creatingOrUpdatingProduct: false,
                        visibleModal: false,
                        data: null,
                        initData: null,
                        action: null,
                        actionButtonLabel: { idle: null, uploading: null }
                    },
                    products: {
                        all: data,
                        selected: []
                    }
                }
            });
        }
    }

    this.Products = {
        Set(data) {
            const state = getState();

            state.set((stateObject) => {
                return {
                    ...stateObject,
                    products: {
                        ...stateObject.products,
                        all: data
                    }
                }
            })
        },
        SelectSingle(data) {
            const state = getState();

            state.set((stateObject) => {
                return {
                    ...stateObject,
                    products: {
                        ...stateObject.products,
                        selected: [
                            data
                        ]
                    }
                }
            })
        },
        Select(data) {
            const state = getState();

            state.set((stateObject) => {
                return {
                    ...stateObject,
                    products: {
                        ...stateObject.products,
                        selected: [
                            ...stateObject.products.selected,
                            data
                        ]
                    }
                }
            })
        },
        Deselect(data) {
            const state = getState();

            state.set((stateObject) => {
                return {
                    ...stateObject,
                    products: {
                        ...stateObject.products,
                        selected: stateObject.products.selected.filter(productData => {
                            return productData !== data
                        })
                    }
                }
            })
        }
    }

    this.Modals
}

export default ProductsFunctions;