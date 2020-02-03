import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Container, h2 } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { local_pl } from '../../components/grid_pl';


class Wydzialy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wydzialy: [], loading_data: true, loading_table: true,
            columnDefs: [],
            rowData: [],
            context: { componentParent: this },
            rowSelection: "single"
        };

        this.refresh = this.refresh.bind(this);
        this.setRowData = this.setRowData.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    async componentDidMount() {
        await fetch('api/Wydzials')
            .then(response => response.json())
            .then(data => {
                this.setState({ wydzialy: data })
            });
        this.getTableData();
    }


    refresh() {
        this.props.history.push("/wydzialy");
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var wydzialy = this.state.wydzialy;
        var wydzialy_rowData = [];
        for (var i = 0; i < wydzialy.length; i++) {
            var wydz = wydzialy[i];
            var row = {
                idWydzial: wydz.idWydzial,
                adres: wydz.adres,
                kodPocztowy: wydz.kodPocztowy
            }

            wydzialy_rowData.push(row);
        }
        return wydzialy_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "idWydzial", field: "idWydzial", hide: true
            },
            {
                headerName: "Adres", field: "adres", sortable: true, filter: true
            },
            {
                headerName: "Kod Pocztowy", field: "kodPocztowy", sortable: true, filter: true,
            }
        ]
        return cols;
    }

    getTableData() {
        let rows = this.setRowData();
        let cols = this.setColumns();
        this.setState({ columnDefs: cols, rowData: rows, loading_table: false });
    }

    handleCreate() {
        this.props.history.push('/wydzial_edit/0');
    }


    onSelectionChanged() {
        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRow = selectedRows.pop();
        this.props.history.push('/wydzial_edit/' + selectedRow.idWydzial);
    }

    render() {
        return (
            <Container >
                <h2>Wydziały</h2>
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
                    <FormGroup>
                        <Button color="primary" type="button" onClick={this.handleCreate}>Dodaj Wydzial</Button>
                    </FormGroup>
                </div>
            </Container>
        );
    }
}


export default connect()(Wydzialy);