function CheckBoxEvents(data){
    this.OnClick = (event) => {
        const value = !data.value;

        data.onChange && data.onChange({
            nativeEvent: event,
            target: {
                id: data.id,
                name: data.name,
                value
            }
        });
    }
}

export default CheckBoxEvents;