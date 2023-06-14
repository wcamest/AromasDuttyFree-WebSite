const createProductFilterTree = (allProductFilters, productFilterId) => {
    const productFilter = allProductFilters.find((productFilterData) => {
        return productFilterData.id === productFilterId;
    });

    const subFilters = productFilter.subFilters.map((productFilterData) => {
        return createProductFilterTree(allProductFilters, productFilterData.id);
    });

    return {
        id: productFilter.id,
        filterName: productFilter.filterName,
        parentId: productFilter.parentFilter,
        subFilters
    }
}

export default createProductFilterTree;