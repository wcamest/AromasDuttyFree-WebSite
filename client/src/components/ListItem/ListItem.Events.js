function ListItemEvents(getState, payload){
    this.OnClick = (event) => {
        const state = getState();
        
        state.set((stateObject) => {
            return {
                selectedIndex: payload.index
            }
        });

        payload.router.push(payload.href);
    }
}

export default ListItemEvents;