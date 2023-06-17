import { generateId } from '@/utils/utils';
import { NextResponse } from 'next/server';
import { ProductFilter } from '@/sequelize';
import { createProductFilterTree } from '../ProductFilterTree';

export async function POST(request) {
    try {
        const { filterName, parentId } = await request.json();

        let rootProductFilter = await ProductFilter.findOne({ where: { filterName: "::root::" } });

        console.log(`parent filter id: ${parentId}`)

        if (!rootProductFilter) {

            const rootProductFilterId = generateId();

            rootProductFilter = await ProductFilter.create({
                id: rootProductFilterId,
                filterName: "::root::"
            });
        }

        if (!parentId) {

            const productFilterId = generateId();

            await rootProductFilter.createSubFilter({
                id: productFilterId,
                filterName
            })
        } else {
            const parentFilter = await ProductFilter.findByPk(parentId);

            if (!parentFilter) {
                return NextResponse.json({
                    status: 404,
                    parentId,
                    code: 'PARENT_FILTER_NOT_FOUN',
                    message: 'FIltro padre no encontrado'
                }, {
                    status: 404
                })
            }

            const productFilterId = generateId();

            await parentFilter.createSubFilter({
                id: productFilterId,
                filterName
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