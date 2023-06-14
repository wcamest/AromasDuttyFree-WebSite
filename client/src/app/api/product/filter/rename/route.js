import { generateId } from '@/utils/utils';
import { NextResponse } from 'next/server';
import { ProductFilter } from '@/sequelize';
import { createProductFilterTree } from '../ProductFilterTree';

export async function PUT(request) {
    try {
        const { id, filterName } = await request.json();

        let rootProductFilter = await ProductFilter.findOne({ where: { filterName: "::root::" } });
        const productFilter = await ProductFilter.findByPk(id);

        if (!rootProductFilter) {

            const rootProductFilterId = generateId();

            rootProductFilter = await ProductFilter.create({
                id: rootProductFilterId,
                filterName: "::root::"
            });
        }

        if (!productFilter) {
            return NextResponse.json(
                {
                    message: "filtro no encontrado"
                },
                { status: 404 }
            );
        }

        productFilter.filterName = filterName;
        await productFilter.save();

        const allProductFilters = await ProductFilter.findAll({
            include: [
                {
                    model: ProductFilter,
                    as: "subFilters"

                }
            ]
        })

        const productFilterTree = createProductFilterTree(allProductFilters, rootProductFilter.id);

        return NextResponse.json(productFilterTree);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        );
    }
}