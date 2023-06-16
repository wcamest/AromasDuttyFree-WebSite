import { generateId } from '@/utils/utils';
import { NextResponse } from 'next/server';
import { Product, ProductImage } from '@/sequelize';
import axios from 'axios';

const image_server_url = {
    "development" : "http://localhost:3001",
    "production" : "https://images.aromasdutyfree.com"
}

const environment = process.env.NODE_ENV;

export async function POST(request) {
    try {
        const data = await request.formData();
        let id = data.get("id");
        let pendingToUpload = data.get("pendingToUpload");
        let pendingToDelete = data.get("pendingToDelete");
        let pendingToUpdate = data.get("pendingToUpdate");
        let action = data.get("action");

        pendingToUpload = JSON.parse(pendingToUpload);

        const imageServerFormData = new FormData();
        imageServerFormData.append("directory", "products");

        const imagesRawDataCollection = pendingToUpload.map(imageData => {
            const blobImage = data.get(imageData.image);
            
            const fileNameId = generateId();
            const fileExtension = getFileExtension(blobImage.name);

            const imageName = `${fileNameId}.${fileExtension}`;
            imageServerFormData.append("images", blobImage, imageName);

            return {
                featuredImage: imageData.featuredImage,
                description: imageData.description,
                url: `${image_server_url[environment]}/get/products/${imageName}`,
                name: imageName
            }
        });

        await axios.post(`${image_server_url[environment]}/upload`, imageServerFormData);

        let productData = null;

        if (action === "CREATE") {
            const productRawData = {
                name: data.get("name"),
                productReference: data.get("productReference"),
                description: data.get("description"),
                score: 0,
                filters: data.get("filters"),
                salePrice: data.get("salePrice")
            }

            productData = await Product.create(productRawData);
        } else if (action === "UPDATE") {
            pendingToDelete = JSON.parse(pendingToDelete);
            pendingToUpdate = JSON.parse(pendingToUpdate);

            productData = await Product.findByPk(id, {
                include: {
                    model: ProductImage,
                    as: 'images',
                    required: false
                }
            });

            await axios.put(`${image_server_url[environment]}/delete`, {directory: "products", toDelete: pendingToDelete.map((imageData) => {
                return imageData.name
            })});

            for (let it = 0; it < pendingToDelete.length; it++) {
                const toDelete = pendingToDelete[it];
                
                const productImage = productData.images.find(imageData => {
                    return imageData.id === toDelete.id;
                })

                await productImage.destroy();
            }

            for (let it = 0; it < pendingToUpdate.length; it++) {
                const toUpdate = pendingToUpdate[it];
                
                const productImage = productData.images.find(imageData => {
                    return imageData.id === toUpdate.DBData.id;
                })

                productImage.featuredImage = toUpdate.featuredImage;
                productImage.description = toUpdate.description;

                await productImage.save();
            }

            productData.name = data.get("name");
            productData.productReference = data.get("productReference");
            productData.description = data.get("description");
            productData.filters = data.get("filters");
            productData.salePrice = data.get("salePrice");

            await productData.save();
        }

        for (let it = 0; it < imagesRawDataCollection.length; it++) {
            const imageRawData = imagesRawDataCollection[it];
            await productData.createImage(imageRawData);
        }

        const offset = data.get("offset");
        const limit = 30;

        const products = await Product.findAll({
            offset,
            limit,
            include: {
                model: ProductImage,
                as: 'images',
                required: false
            }
        });

        return NextResponse.json(products);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        );
    }
}

const getFileExtension = (filename) => {
    const regex = /(?:\.([^.]+))?$/;
    const result = regex.exec(filename);
    return result && result[1];
};