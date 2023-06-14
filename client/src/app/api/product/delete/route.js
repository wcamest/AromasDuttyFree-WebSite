import { NextResponse } from 'next/server';
import { Product, ProductImage } from '@/sequelize';
import fs from "fs";


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

            for (let it2 = 0; it2 < productData.images.length; it2++) {
                const productImageData = productData.images[it2];
                const path = `${process.cwd()}/public${productImageData.path}`;

                fs.unlinkSync(path);
            }

            await productData.destroy();
        }

        const products = await Product.findAll({
            offset,
            limit,
            include: {
                model: ProductImage,
                as: 'images',
                where: {
                    featuredImage: true
                },
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