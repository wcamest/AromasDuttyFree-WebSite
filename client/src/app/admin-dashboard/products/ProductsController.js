import ServerInterface from "@/ServerInterface/ServerInterface";

const ProductsController = {
    async Upload(state) {
        const stateObject = state.stateObject;
        const data = stateObject.createOrEditProduct.data;

        let pendingToUpload = data.imageGalery.images.filter(imageData => {
            return imageData.DBData === undefined;
        })

        const pendingToDelete = data.imageGalery.pendingToDelete.map(imageData => {
            return {
                id: imageData.DBData.id,
                name: imageData.DBData.name
            };
        })

        const pendingToUpdate = data.imageGalery.images.filter(imageData => {

            if(imageData.DBData){
                return (imageData.description !== imageData.DBData.description || imageData.featuredImage !== imageData.DBData.featuredImage)
            }

            return false;
        });

        const imageFiles = await convertBlobToFiles(pendingToUpload);
        pendingToUpload = pendingToUpload.map((imageData, index) => {
            return {
                description: imageData.description,
                featuredImage: imageData.featuredImage,
                image: `image${index}`
            }
        });
        const formData = new FormData();

        imageFiles.forEach((file, index) => {
            formData.append(`image${index}`, file);
        });

        const filters = data.appliedFilters.map(filterData => {
            return filterData.id
        }).join("|");

        formData.append("action", stateObject.createOrEditProduct.action);
        formData.append("offset", 0);
        formData.append("filters", filters);
        formData.append("id", data.id);
        formData.append("name", data.productForm.name);
        formData.append("productReference", data.productForm.productReference);
        formData.append("description", data.productForm.description);
        formData.append("salePrice", data.productForm.salePrice);
        formData.append("pendingToUpload", JSON.stringify(pendingToUpload));
        formData.append("pendingToDelete", JSON.stringify(pendingToDelete));
        formData.append("pendingToUpdate", JSON.stringify(pendingToUpdate));

        const result = await ServerInterface.Product.CreateOrUpdate(formData);
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