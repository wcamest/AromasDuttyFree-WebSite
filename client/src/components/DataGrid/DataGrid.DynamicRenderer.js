import DataGridRow from "../DataGridRow/DataGridRow";
import DataGridTableHeader from "../DataGridTableHeader/DataGridTableHeader";
import DataGridTableHeaderDivider from "../DataGridTableHeaderDivider/DataGridTableHeaderDivider";
import CheckBox from "../controls/CheckBox/CheckBox";

function DataGridDynamicRenderer(getState, payload) {

    this.TableHeaders = () => {

        const Headers = [];

        Headers.push(<DataGridTableHeader key={0} data={{ width: 60 }}>
            <CheckBox value={payload.TableHeaders.CheckBox.Value} onChange={payload.TableHeaders.CheckBox.Change}/>
        </DataGridTableHeader>);

        Headers.push(<DataGridTableHeaderDivider key={`divider_0`} />);

        for (let it = 0; it < payload.columns.length; it++) {
            const columnData = payload.columns[it];

            Headers.push(<DataGridTableHeader key={it + 1} data={columnData}>
                {columnData.headerName}
            </DataGridTableHeader>);

            if (it < payload.columns.length - 1) {
                Headers.push(<DataGridTableHeaderDivider key={`divider_${it + 1}`} />);
            }
        }

        return Headers;
    }

    this.Rows = () => {
        return payload.data.map((object, key) => {
            return <DataGridRow key={key} data={object} columns={payload.columns} />
        })
    }
}

export default DataGridDynamicRenderer;