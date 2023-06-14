import { NextResponse } from 'next/server';
import { Product, ProductImage } from '@/sequelize';

export async function GET(request) {
    try {
        const offset = new URL(request.url).searchParams.get("offset");
        const limit = 30;

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
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        );
    }
}