function ModalEvents(payload){
    this.Click = (event) => {
        if(payload.canClose && payload.onClose)
            payload.onClose();
    }
}

export default ModalEvents;