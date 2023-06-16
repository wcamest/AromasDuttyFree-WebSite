function ProductEditorEvents(getState, payload) {

    this.Inputs = {
        Change(event) {
            const name = event.target.name;
            let value = event.target.value;
            const state = getState();
            const stateObject = state.stateObject;

            if (name === "salePrice") {
                const rawValue = `${value}`.replace(/[^0-9.]/g, '');
                value = rawValue.length ? parseInt(rawValue) : 0;
            }

            const updatedProductForm = {
                ...state.stateObject.productForm,
                [name]: value
            }

            const formFields = [
                "name",
                "productReference",
                "salePrice",
                "description",
            ];

            let emptyField = false;

            formFields.forEach((propertyName) => {
                if (!updatedProductForm[propertyName]) {
                    emptyField = true;
                } else if (propertyName === "salePrice" === updatedProductForm.salePrice === 0) {
                    emptyField = true;
                }
            });

            payload.setDisableUpdateButton(emptyField);

            const updatedStateObject = {
                ...stateObject,
                productForm: {
                    ...updatedProductForm
                }
            }

            payload.updateFunction(updatedStateObject);

            state.set((stateObject) => {

                return updatedStateObject;
            })
        }
    }

    this.ImageGalery = {
        AddImageButton: {
            Click() {
                payload.fileInputRef.current.click();
            }
        },
        ClearImageGaleryButton: {
            Click() {
                const state = getState();
                const stateObject = state.stateObject;

                const pendingToDelete = stateObject.imageGalery.images.filter(imageData => {
                    return imageData.DBData !== undefined;
                });

                const updatedStateObject = {
                    ...stateObject,
                    imageGalery: {
                        selected: 0,
                        images: [],
                        pendingToDelete: [
                            ...stateObject.imageGalery.pendingToDelete,
                            ...pendingToDelete
                        ]
                    }
                }

                payload.updateFunction(updatedStateObject);

                state.set(() => {

                    return updatedStateObject;
                });
            }
        },
        FileInput: {
            Change(event) {
                const file = event.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const state = getState();
                    const stateObject = state.stateObject;
                    const imageURL = URL.createObjectURL(file);

                    const newImageData = {
                        url: imageURL,
                        featuredImage: (stateObject.imageGalery.images.length ? false : true),
                        description: file.name
                    };

                    const updatedStateObject = {
                        ...stateObject,
                        imageGalery: {
                            ...stateObject.imageGalery,
                            images: [
                                ...stateObject.imageGalery.images,
                                newImageData
                            ]
                        }
                    }

                    payload.updateFunction(updatedStateObject);

                    state.set(() => {
                        return updatedStateObject;
                    });
                } else {
                    console.error('Selecciona un archivo de imagen válido.');
                }
            }
        }
    }

    this.ProductFilters = {
        CheckBox: {
            Change(event) {
                const { name, id, value } = event.target;
                const state = getState();
                const stateObject = state.stateObject;

                const filterStack = getFilterStack(stateObject.productFilters.all, id);

                const appliedFilters = value ? [
                    ...stateObject.appliedFilters,
                    ...filterStack
                ] :
                    stateObject.appliedFilters.filter((productFilter) => {
                        return productFilter.id !== id;
                    })

                const updatedStateObject = {
                    ...stateObject,
                    appliedFilters
                }

                payload.updateFunction(updatedStateObject);

                state.set((stateObject) => {

                    return updatedStateObject;
                })

            }
        }
    }
}

const getFilterStack = (filters, id) => {
    const filter = filters.find((productFilter) => {
        return productFilter.id === id;
    });

    let stack = [];

    if(filter.parentId){
        const parentStack = getFilterStack(filters, filter.parentId);

        stack = [
            ...parentStack
        ]
    }

    if(filter.filterName !== "::root::"){
        stack.push({id: filter.id});
    }

    return stack;
}

export default ProductEditorEvents;