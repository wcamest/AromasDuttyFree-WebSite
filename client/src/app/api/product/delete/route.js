import { NextResponse } from 'next/server';
import { Product, ProductImage } from '@/sequelize';
import axios from 'axios';

const image_server_url = {
    "development" : "http://localhost:3001",
    "production" : "https://images.aromasdutyfree.com"
}

const environment = process.env.NODE_ENV;

export async function PUT(request) {
    try {
        const { offset, toDelete } = await request.json();
        const limit = 30;

        for (let it = 0; it < toDelete.length; it++) {
            const element = toDelete[it];

            const productData = await Product.findByPk(element.id, {
                include: [
                    {
                        model: ProductImage,
                        as: 'images'
                    }
                ]
            });

            await axios.put(`${image_server_url[environment]}/delete`, {directory: "products", toDelete: productData.images.map(imageData => {
                return imageData.name;
            })});
            await productData.destroy();
        }

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