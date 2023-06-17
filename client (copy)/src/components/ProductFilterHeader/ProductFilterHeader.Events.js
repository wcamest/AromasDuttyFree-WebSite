import ServerInterface from "@/ServerInterface/ServerInterface";

function ProductFilterHeaderEvents(getState, payload) {
    this.Modals = {
        AddFilter: {
            Open() {
                const state = getState();

                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        modals: {
                            ...stateObject.modals,
                            addFilter: {
                                ...stateObject.modals.addFilter,
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
                            addFilter: {
                                ...stateObject.modals.addFilter,
                                visible: false
                            }
                        }
                    }
                });
            },
            Input: {
                Change(event){
                    const value = event.target.value;
                    const state = getState();

                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            modals: {
                                ...stateObject.modals,
                                addFilter: {
                                    ...stateObject.modals.addFilter,
                                    inputValue: value
                                }
                            }
                        }
                    });
                }
            },
            Button: {
                async Click(){
                    const state = getState();
                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            creatingFilter: true
                        }
                    });

                    const newProductFilterData = await ServerInterface.ProductFilter.Add({
                        parentId: payload.id,
                        filterName: state.stateObject.modals.addFilter.inputValue
                    });

                    payload.update(newProductFilterData);

                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            creatingFilter: false,
                            modals: {
                                ...stateObject.modals,
                                addFilter: {
                                    ...stateObject.modals.addFilter,
                                    inputValue: "",
                                    visible: false
                                }
                            }
                        }
                    });
                }
            }
        },
        RenameFilter: {
            Open() {
                const state = getState();

                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        modals: {
                            ...stateObject.modals,
                            renameFilter: {
                                ...stateObject.modals.renameFilter,
                                inputValue: payload.name,
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
                            renameFilter: {
                                ...stateObject.modals.renameFilter,
                                visible: false
                            }
                        }
                    }
                });
            },
            Input: {
                Change(event){
                    const value = event.target.value;
                    const state = getState();

                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            modals: {
                                ...stateObject.modals,
                                renameFilter: {
                                    ...stateObject.modals.renameFilter,
                                    inputValue: value
                                }
                            }
                        }
                    });
                }
            },
            Button: {
                async Click(){
                    const state = getState();
                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            renamingFilter: true
                        }
                    });

                    const newProductFilterData = await ServerInterface.ProductFilter.Rename({
                        id: payload.id,
                        filterName: state.stateObject.modals.renameFilter.inputValue
                    });

                    payload.update(newProductFilterData);

                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            renamingFilter: false,
                            modals: {
                                ...stateObject.modals,
                                renameFilter: {
                                    ...stateObject.modals.renameFilter,
                                    inputValue: "",
                                    visible: false
                                }
                            }
                        }
                    });
                }
            }
        },
        DeleteFilter: {
            Open() {
                const state = getState();

                state.set((stateObject) => {
                    return {
                        ...stateObject,
                        modals: {
                            ...stateObject.modals,
                            deleteFilter: {
                                ...stateObject.modals.deleteFilter,
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
                            deleteFilter: {
                                ...stateObject.modals.deleteFilter,
                                visible: false
                            }
                        }
                    }
                });
            },
            Button: {
                async Click(){
                    const state = getState();
                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            deletingFilter: true
                        }
                    });

                    const newProductFilterData = await ServerInterface.ProductFilter.Delete(payload.id);

                    payload.update(newProductFilterData);

                    state.set((stateObject) => {
                        return {
                            ...stateObject,
                            deletingFilter: false,
                            modals: {
                                ...stateObject.modals,
                                deleteFilter: {
                                    ...stateObject.modals.deleteFilter,
                                    visible: false
                                }
                            }
                        }
                    });
                }
            }
        }
    }
}

export default ProductFilterHeaderEvents;