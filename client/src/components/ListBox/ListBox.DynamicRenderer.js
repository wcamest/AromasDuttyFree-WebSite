import React from "react";

function ListBoxDynamicRenderer(getState){
    this.Items = (children) => {
        if(!Array.isArray(children))
            return React.cloneElement(children, {key: 0, getState});

        return children.map((childComponent, key) => {
            return React.cloneElement(childComponent, {key, index: key, getState});
        });
    }
}

export default ListBoxDynamicRenderer;