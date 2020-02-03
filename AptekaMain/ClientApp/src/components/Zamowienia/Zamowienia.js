import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Container } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { local_pl } from '../../components/grid_pl';


class Zamowienia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zamowienia: [], hurtowni: [], loading_data: true, loading_table: true,
            columnDefs: [],
            rowData: [],
            context: { componentParent: this },
            rowSelection: "single"
        };

        this.findHurtowniaName = this.findHurtowniaName.bind(this);
        this.refresh = this.refresh.bind(this);
        this.setRowData = this.setRowData.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.getShortDate = this.getShortDate.bind(this);
    }

    async componentDidMount() {
        await fetch('api/Hurtownias')
            .then(response => response.json())
            .then(data => {
                this.setState({ hurtowni: data })
            });
        await fetch('api/Zamowienies?$orderby=idZamowienia desc')
            .then(response => response.json())
            .then(data => {
                this.setState({ zamowienia: data, loading_data: false });
            });
        this.getTableData();
    }

    refresh() {
        this.props.history.push("/zamowienia");
    }

    findHurtowniaName(id) {
        let hurt = this.state.hurtowni;
        for (var i in hurt) {
            if (id === hurt[i].idHurtownia)
                return hurt[i].nazwa;
        };
        return "Hurtownia not Found";
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    getShortDate(json_date) {

        let full_date = new Date(json_date);
        return full_date.toLocaleDateString();
    }

    setRowData() {
        var zam = this.state.zamowienia;
        var art_rowData = [];
        for (var i = 0; i < zam.length; i++) {
            var zamow = zam[i];
            var row = {
                idZamowienia: zamow.idZamowienia,
                hurtownia: this.findHurtowniaName(zamow.hurtowniaIdHurtowni),
                dataZamowienia: this.getShortDate(zamow.dataZamowienia),
                dataOplaty: this.getShortDate(zamow.dataOplaty),
                dataDostawy: this.getShortDate(zamow.dataDostawy),
                oplacono: zamow.oplacono,
                status: zamow.status
            }

            art_rowData.push(row);
        }
        return art_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "idZamowienia", field: "idZamowienia", hide: true
            },
            {
                headerName: "Hurtownia", field: "hurtownia", sortable: true, filter: true, editable: false
            },
            {
                headerName: "dataZamowienia", field: "dataZamowienia", sortable: true, filter: false, editable: false,
            },
            {
                headerName: "Status", field: "status", sortable: true, filter: true, editable: false,
            },
            {
                headerName: "dataOplaty", field: "dataOplaty", sortable: true, filter: true, type: ['dateColumn', 'nonEditableColumn']
            },
            {
                headerName: "Opłacone", field: "oplacono", sortable: true, filter: true, editable: false,width: 100
            },
            {
                headerName: "dataDostawy", field: "dataDostawy", sortable: true, filter: true, type: ['dateColumn', 'nonEditableColumn']
            },

        ]
        return cols;
    }

    getTableData() {
        let rows = this.setRowData();
        let cols = this.setColumns();
        this.setState({ columnDefs: cols, rowData: rows, loading_table: false });
    }

    handleRedirect(cell) {

        //alert(cell);
        this.props.history.push('/artykul_edit/' + cell);
    }

    handleCreate() {
        this.props.history.push('/create_zamowienie');
    }

    onSelectionChanged() {
        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRow = selectedRows.pop();
        this.props.history.push('/show_zamowienie/' + selectedRow.idZamowienia);
    }

    onBtnExport() {
        var params = { suppressQuotes: true };
        this.gridApi.exportDataAsCsv(params);
    }

    render() {
        return (
            <Container >
                <h3>Zamowienia</h3>
                <div style={{ height: '500px' }} className="ag-theme-balham">
                    <div style={{ margin: "10px 0" }}>
                        <Button onClick={this.onBtnExport.bind(this)} color='info'>Eksportuj Dane</Button>
                    </div>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        context={this.state.context}
                        frameworkComponents={this.state.frameworkComponents}
                        onGridReady={this.onGridReady}
                        rowSelection={this.state.rowSelection}
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                        pagination={true}
                        paginationAutoPageSize={true}
                        localeText={local_pl}
                    />
                    <FormGroup>
                        <Button className="btn btn-primary" type="button" onClick={this.handleCreate}>Dodaj Zamowienie</Button>
                    </FormGroup>
                </div>
            </Container>
        );
    }
}


export default connect()(Zamowienia);