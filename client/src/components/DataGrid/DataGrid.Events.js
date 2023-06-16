function DataGridEvents(getState, payload){
    this.TableHeaders = {
        CheckBox: {
            Change(event){
                const state = getState();
                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        TableHeaders: {
                            ...stateObject.TableHeaders,
                            CheckBox: {
                                Value : !stateObject.TableHeaders.CheckBox.Value
                            }
                        }
                    }
                })
            }
        }
    }
}

export default DataGridEvents;