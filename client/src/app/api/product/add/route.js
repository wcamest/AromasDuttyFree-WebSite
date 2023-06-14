import { generateId } from '@/utils/utils';
import { NextResponse } from 'next/server';
import { Product, ProductImage } from '@/sequelize';
import fs from "fs";


export async function POST(request) {
    try {
        const data = await request.formData();
        const allKeys = data.keys();
        let pendingToUpdate = data.get("pendingToUpdate");
        pendingToUpdate = JSON.parse(pendingToUpdate);

        const imagesRawDataCollection = pendingToUpdate.map((imageData) => {
            const blobImage = data.get(imageData.image);

            const fileNameId = generateId();
            const fileExtension = getFileExtension(blobImage.name);

            saveImage(blobImage, fileNameId, fileExtension);

            return {
                featuredImage: imageData.featuredImage,
                description: imageData.description,
                path: `/images/product-galery/${fileNameId}.${fileExtension}`
            }
        })

        const productRawData = {
            name: data.get("name"),
            productReference: data.get("productReference"),
            description: data.get("description"),
            score: 0,
            filters: data.get("filters"),
            salePrice: data.get("salePrice")
        }

        const productData = await Product.create(productRawData);

        for (let it = 0; it < imagesRawDataCollection.length; it++) {
            const imageRawData = imagesRawDataCollection[it];
            await productData.createImage(imageRawData);
        }

        return NextResponse.json({ message: "ok" });
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

const saveImage = async (image, fileNameId, fileExtension) => {
    if (image instanceof Blob) {
        // Convert file to stream
        const stream = image.stream();

        // Convert stream to buffer
        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        fs.writeFileSync(process.cwd() + `/public/images/product-galery/${fileNameId}.${fileExtension}`, buffer);
    }
}

const getFileExtension = (filename) => {
    const regex = /(?:\.([^.]+))?$/;
    const result = regex.exec(filename);
    return result && result[1];
};