import DataGridTableHeader from "../DataGridTableHeader/DataGridTableHeader";
import DataGridTableHeaderDivider from "../DataGridTableHeaderDivider/DataGridTableHeaderDivider";

function DataGridDynamicRenderer(getState, payload) {

    this.Columns = () => {

        const Headers = [];

        for (let it = 0; it < payload.columns.length; it++) {
            const columnData = payload.columns[it];

            Headers.push(<DataGridTableHeader key={it} data={columnData}>
                {columnData.headerName}
            </DataGridTableHeader>);

            if(it < payload.columns.length - 1){
                Headers.push(<DataGridTableHeaderDivider key={`divider_${it}`} />);
            }
        }

        return Headers;
    }
}

export default DataGridDynamicRenderer;