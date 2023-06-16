import Image from "next/image";
import ProductImageGaleryItem from "../ProductImageGaleryItem/ProductImageGaleryItem";
import TreeViewItem from "../TreeViewItem/TreeViewItem";
import TreeView from "../TreeView/TreeView";
import LabelledCheckBox from "../controls/LabelledCheckBox/LabelledCheckBox";
import ProductFilterHeader from "../ProductFilterHeader/ProductFilterHeader";
import ProductImageControls from "../ProductImageControls/ProductImageControls";

function ProductEditorRenderer(getState, payload) {
    this.ProductImageControls = () => {
        const state = getState();

        if (!state.stateObject.imageGalery.images.length)
            return <div className="w-full aspect-square"></div>;

        const images = state.stateObject.imageGalery.images;
        const selected = state.stateObject.imageGalery.selected;

        return <ProductImageControls data={images[selected]} updateImage={payload.ImageGalery.UpdateImage} deleteImage={payload.ImageGalery.DeleteImage}/>
    }
    this.ImageGalery = () => {
        const state = getState();

        return state.stateObject.imageGalery.images.map((imageData, key) => {
            return <ProductImageGaleryItem key={key} index={key} data={imageData} selected={state.stateObject.imageGalery.selected} selectImage={payload.ImageGalery.SelectImage} />
        });
    }
    this.ProductFilters = () => {
        const state = getState();

        if (!state.stateObject.productFilters?.tree)
            return null;

        const renderProductFiltersTree = (productFilter, key) => {

            const children = productFilter.subFilters.map((subFilterData, key) => {
                return renderProductFiltersTree(subFilterData, key);
            });

            const appliedFilter = state.stateObject.appliedFilters.some((productFilterData) => {
                return productFilterData.id === productFilter.id;
            })

            const header = productFilter.filterName === "::root::" ? <ProductFilterHeader name={"::root::"} id={productFilter.id} update={payload.ProductFilters.Update} canDelete={false} canEdit={false} canCheck={false}>Filtros</ProductFilterHeader> : <ProductFilterHeader id={productFilter.id} name={productFilter.filterName} value={appliedFilter} onChange={payload.ProductFilters.CheckBox.Change} update={payload.ProductFilters.Update}  canDelete={true} canEdit={true} canCheck={true}>{productFilter.filterName}</ProductFilterHeader>;

            return <TreeViewItem key={key} header={header}>
                {
                    children.length ? children : null
                }
            </TreeViewItem>
        }

        const rootTreeItem = renderProductFiltersTree(state.stateObject.productFilters.tree);

        if (!rootTreeItem)
            return null;

        return <TreeView>
            {rootTreeItem}
        </TreeView>
    }
}

export default ProductEditorRenderer;