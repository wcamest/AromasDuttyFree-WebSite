function LabelledCheckBoxEvents(data){
    this.OnClick = (event) => {
        const value = !data.value;

        data.onChange && data.onChange({
            target: {
                id: data.id,
                name: data.name,
                value
            }
        });
    }
}

export default LabelledCheckBoxEvents;