function TreeViewItemEvent(getState, payload){
    this.ExpandCollapseButton = {
        Click(event){
            const state = getState();
            state.set((stateObject) => {
                return {
                    expanded: !stateObject.expanded
                }
            });
        }
    }
}

export default TreeViewItemEvent;