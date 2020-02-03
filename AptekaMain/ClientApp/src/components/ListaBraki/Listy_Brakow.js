import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { local_pl } from '../../components/grid_pl';


class Listy_Brakow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listy: [], loading_data: true, loading_table: true,
            columnDefs: [],
            rowData: [],
            rowSelection: "single"
        };

        this.refresh = this.refresh.bind(this);
        this.setRowData = this.setRowData.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    async componentDidMount() {
        await fetch('api/ListaBrakows')
            .then(response => response.json())
            .then(data => {
                this.setState({ listy: data, loading: false });
            });
        this.getTableData();
    }

    refresh() {
        this.props.history.push("/listy_brakow");
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var listy = this.state.listy;
        var list_rowData = [];
        for (var i = 0; i < listy.length; i++) {
            var list = listy[i];
            var row = {
                id: list.idLista,
                data: list.dataGen.split("T")[0]
            }

            list_rowData.push(row);
        }
        return list_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "Numer", field: "id", sortable: true, filter: true
            },
            {
                headerName: "Data Generowania", field: "data", sortable: true, filter: true
            }
        ]
        return cols;
    }

    getTableData() {
        let rows = this.setRowData();
        let cols = this.setColumns();
        this.setState({ columnDefs: cols, rowData: rows, loading_table: false });
    }

    onSelectionChanged() {
        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRow = selectedRows.pop();
        this.props.history.push('/lista_brakow_show/' + selectedRow.id);

    }

    render() {
        return (
            <div style={{ height: '500px' }} className="ag-theme-balham">
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    context={this.state.context}
                    onGridReady={this.onGridReady}
                    rowSelection={this.state.rowSelection}
                    onSelectionChanged={this.onSelectionChanged.bind(this)}
                    pagination={true}
                    paginationAutoPageSize={true}
                    localeText={local_pl}
                />
            </div>
        );
    }
}


export default connect()(Listy_Brakow);