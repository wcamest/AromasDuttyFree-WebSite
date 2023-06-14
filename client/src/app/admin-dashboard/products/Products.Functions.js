import ServerInterface from "@/ServerInterface/ServerInterface";

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
            const stateObject = state.stateObject;
            const data = stateObject.createProduct.data;

            const imageFiles = await convertBlobToFiles(data.imageGalery.pendingToUpload);
            const pendingToUpdate = data.imageGalery.pendingToUpload.map((imageData, index) => {
                return {
                    description: imageData.description,
                    featuredImage: imageData.featuredImage,
                    image: `image${index}`
                }
            })

            const formData = new FormData();

            imageFiles.forEach((file, index) => {
                formData.append(`image${index}`, file);
            });

            const filters = data.appliedFilters.map(filterData => {
                return filterData.id
            }).join("|");

            formData.append("filters", filters);
            formData.append("name", data.productForm.name);
            formData.append("productReference", data.productForm.productReference);
            formData.append("description", data.productForm.description);
            formData.append("salePrice", data.productForm.salePrice);
            formData.append("pendingToUpdate", JSON.stringify(pendingToUpdate));

            state.set((stateObject) => {
                return {
                    ...stateObject,
                    createProduct: {
                        ...stateObject.createProduct,
                        creatingProduct: true
                    }
                }
            });

            const result = await ServerInterface.Product.Create(formData);

            state.set((stateObject) => {
                return {
                    ...stateObject,
                    createProduct: {
                        ...stateObject.createProduct,
                        creatingProduct: false,
                        visibleModal: false,
                        data: null
                    }
                }
            });
        }
    }

    this.Products = {
        Set(data){
            const state = getState();

            state.set((stateObject) => {
                return {
                    ...stateObject,
                    products: data
                }
            })
        }
    }
}

const convertBlobToFiles = async (images) => {
    const files = [];

    for (const imageData of images) {
        const response = await fetch(imageData.url);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });
        files.push(file);
    }

    return files;
};

export default ProductsFunctions;