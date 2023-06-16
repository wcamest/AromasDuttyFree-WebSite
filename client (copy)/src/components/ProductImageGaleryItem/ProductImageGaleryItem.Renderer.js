function ProductImageGaleryItemRenderer(getState, payload) {
    this.Classes = {
        Main() {
            if (payload.index === payload.selected) {
                return "relative p-2 border border-solid border-slate-800 bg-slate-600 aspect-square flex justify-center items-center cursor-pointer";
            }

            return "relative p-2 border border-solid border-slate-300 hover:bg-slate-200 active:bg-slate-300 aspect-square flex justify-center items-center cursor-pointer"

        }
    }
}

export default ProductImageGaleryItemRenderer;