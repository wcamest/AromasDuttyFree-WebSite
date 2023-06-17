function ListItemDynamicRenderer(getState, payload){
    this.SelectedItem = () => {
        const state = getState();
        const stateObject = state.stateObject;

        if(stateObject.selectedIndex === payload.index){
            return "p-2 text-slate-100 bg-slate-800"
        }

        return "p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
    }
}

export default ListItemDynamicRenderer;