function DataGridRowEvents(getState, payload){
    this.Click = () => {
        payload.product.selectSingle(payload.data);
    }

    this.CheckBox = {
        Change(event){
            event.nativeEvent.stopPropagation();
            const selected = payload.selected();
            selected ? payload.product.deselect(payload.data) : payload.product.select(payload.data);
        }
    }
}

export default DataGridRowEvents;