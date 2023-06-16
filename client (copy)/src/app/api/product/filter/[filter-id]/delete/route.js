import { generateId } from '@/utils/utils';
import { NextResponse } from 'next/server';
import { ProductFilter } from '@/sequelize';
import {createProductFilterTree} from '../../ProductFilterTree';

export async function DELETE(request, {params}) {
    try {
        const { searchParams } = new URL(request.url)
        const id = params["filter-id"];

        let rootProductFilter = await ProductFilter.findOne({ where: { filterName: "::root::" } });
        let productFilter = await ProductFilter.findByPk(id);

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

        await productFilter.destroy();

        const allProductFilters = await ProductFilter.findAll({
            include: [
                {
                    model: ProductFilter,
                    as: "subFilters"

                }
            ]
        })

        const productFilterTree = createProductFilterTree(allProductFilters, rootProductFilter.id);
        return NextResponse.json({
            tree: productFilterTree,
            all: allProductFilters
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        );
    }
}