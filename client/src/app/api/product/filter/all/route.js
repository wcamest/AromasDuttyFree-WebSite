import { generateId } from '@/utils/utils';
import { NextResponse } from 'next/server';
import { ProductFilter } from '@/sequelize';
import { createProductFilterTree } from '../ProductFilterTree';

export async function GET() {
    try {
        let rootProductFilter = await ProductFilter.findOne({ where: { filterName: "::root::" } });

        if (!rootProductFilter) {

            const rootProductFilterId = generateId();

            rootProductFilter = await ProductFilter.create({
                id: rootProductFilterId,
                filterName: "::root::"
            });
        }

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
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        );
    }
}