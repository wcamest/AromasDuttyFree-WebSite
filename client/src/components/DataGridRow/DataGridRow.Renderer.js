import DataGridColumn from "../DataGridColumn/DataGridColumn";
import DataGridTableHeaderDivider from "../DataGridTableHeaderDivider/DataGridTableHeaderDivider";
import CheckBox from "../controls/CheckBox/CheckBox";

function DataGridRowDynamicRenderer(getState, payload) {
    this.Columns = () => {

        const Columns = [];

        Columns.push(<DataGridColumn key={0} data={{ width: 60 }}>
            <CheckBox />
        </DataGridColumn>);

        Columns.push(<DataGridTableHeaderDivider key={`divider_0`} />);

        for (let it = 0; it < payload.columns.length; it++) {
            const columnData = payload.columns[it];

            let value = columnData.query ? columnData.query(payload.data) : payload.data[columnData.field];
            let component = columnData.render ? columnData.render(value) : <span>{value}</span>;

            Columns.push(<DataGridColumn key={it + 1} data={columnData}>
                {component}
            </DataGridColumn>);

            if (it < payload.columns.length - 1) {
                Columns.push(<DataGridTableHeaderDivider key={`divider_${it + 1}`} />);
            }
        }

        return Columns;
    }
}

export default DataGridRowDynamicRenderer;