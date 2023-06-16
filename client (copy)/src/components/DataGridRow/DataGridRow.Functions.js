function DataGridRowFunctions(getState, payload){
    this.Selected = () => {
        return payload.product.selected.includes(payload.data);
    }
}

export default DataGridRowFunctions;