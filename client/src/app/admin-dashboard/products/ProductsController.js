import ServerInterface from "@/ServerInterface/ServerInterface";

const ProductsController = {
    async Upload(state) {
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

        formData.append("offset", 0);
        formData.append("filters", filters);
        formData.append("name", data.productForm.name);
        formData.append("productReference", data.productForm.productReference);
        formData.append("description", data.productForm.description);
        formData.append("salePrice", data.productForm.salePrice);
        formData.append("pendingToUpdate", JSON.stringify(pendingToUpdate));

        const result = await ServerInterface.Product.Create(formData);
        return result;
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

export default ProductsController;