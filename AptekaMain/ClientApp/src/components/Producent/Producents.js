import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Container, h2 } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { local_pl } from '../../components/grid_pl';


class Producents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            producents: [], loading_data: true, loading_table: true,
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
        await fetch('api/Producents')
            .then(response => response.json())
            .then(data => {
                this.setState({ producents: data })
            });
        this.getTableData();
    }


    refresh() {
        this.props.history.push("/producents");
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var producents = this.state.producents;
        var producents_rowData = [];
        for (var i = 0; i < producents.length; i++) {
            var prod = producents[i];
            var row = {
                idProducent: prod.idProducent,
                nazwa: prod.nazwa,
                kraj: prod.kraj
            }

           producents_rowData.push(row);
        }
        return producents_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "idProducent", field: "idProducent", hide: true
            },
            {
                headerName: "Nazwa", field: "nazwa", sortable: true, filter: true
            },
            {
                headerName: "Kraj", field: "kraj", sortable: true, filter: true,
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
        this.props.history.push('/producent_edit/0');
    }


    onSelectionChanged() {
        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRow = selectedRows.pop();
        this.props.history.push('/producent_edit/' + selectedRow.idProducent);
    }

    onBtnExport() {
        var params = { suppressQuotes: true };
        this.gridApi.exportDataAsCsv(params);
    }

    render() {
        return (
            <Container >
                <h2>Producenci</h2>

                <div style={{ height: '500px', width:'40%' }} className="ag-theme-balham">
                    <div style={{ margin: "10px 0" }}>
                        <Button onClick={this.onBtnExport.bind(this)} color='info'>Eksportuj Dane</Button>
                    </div>
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
                        <Button color="primary" type="button" onClick={this.handleCreate}>Dodaj Producenta</Button>
                    </FormGroup>
                </div>
            </Container>
        );
    }
}


export default connect()(Producents);