import ServerInterface from "@/ServerInterface/ServerInterface";
import ProductsController from "./ProductsController";

function ProductsFunctions(getState, payload) {
    this.CreateProduct = {
        DisableCreateButton: {
            Set(value) {
                const state = getState();
                state.set(stateObject => {
                    return {
                        ...stateObject,
                        createProduct: {
                            ...stateObject.createProduct,
                            disableCreateButton: value
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
                    createProduct: {
                        ...stateObject.createProduct,
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
                    createProduct: {
                        ...stateObject.createProduct,
                        creatingProduct: true
                    }
                }
            });

            const data = await ProductsController.Upload(state);

            state.set((stateObject) => {
                return {
                    ...stateObject,
                    createProduct: {
                        ...stateObject.createProduct,
                        creatingProduct: false,
                        visibleModal: false,
                        data: null
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
}

export default ProductsFunctions;