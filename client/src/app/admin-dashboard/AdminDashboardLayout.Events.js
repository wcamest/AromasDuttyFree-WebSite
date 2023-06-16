function AdminDashboardLayoutEvents(getState) {
    this.MobileMenu = {
        ToggleShowHide: () => {
            const state = getState();
            
            state.set(stateObject => {
                return {
                    mobileMenu: {
                        expanded: !stateObject.mobileMenu.expanded
                    }
                }
            })
        }
    }
}

export default AdminDashboardLayoutEvents;