function ProductImageControlsEvents(getState, payload) {
    this.FeaturedImageButton = {
        Click() {
            payload.updateImage({
                ...payload.data,
                featuredImage: true
            }, "FEATURED_IMAGE")
        }
    }

    this.DeleteImageButton = {
        Click() {
            payload.deleteImage();
        }
    }

    this.Modals = {
        EditDescription: {
            Open() {
                const state = getState();

                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        modals: {
                            ...stateObject.modals,
                            editDescription: {
                                ...stateObject.modals.editDescription,
                                inputValue: payload.data.description,
                                visible: true
                            }
                        }
                    }
                });
            },
            Close() {
                const state = getState();

                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        modals: {
                            ...stateObject.modals,
                            editDescription: {
                                ...stateObject.modals.editDescription,
                                visible: false
                            }
                        }
                    }
                });
            },
            Input: {
                Change(event) {
                    const value = event.target.value;
                    const state = getState();

                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            modals: {
                                ...stateObject.modals,
                                editDescription: {
                                    ...stateObject.modals.editDescription,
                                    inputValue: value
                                }
                            }
                        }
                    });
                }
            },
            Button: {
                Click(){
                    const state = getState();
                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            modals: {
                                ...stateObject.modals,
                                editDescription: {
                                    ...stateObject.modals.editDescription,
                                    visible: false
                                }
                            }
                        }
                    });

                    payload.updateImage({
                        ...payload.data,
                        description: state.stateObject.modals.editDescription.inputValue
                    }, "DESCRIPTION")
                }
            }
        }
    }
}

export default ProductImageControlsEvents;