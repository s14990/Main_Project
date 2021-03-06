﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table ,Container, h2} from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { local_pl } from '../../components/grid_pl';


class Hurtownie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hurtownie: [], loading_data: true, loading_table: true,
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
        await fetch('api/Hurtownias')
            .then(response => response.json())
            .then(data => {
                this.setState({ hurtownie: data })
            });
        this.getTableData();
    }


    refresh() {
        this.props.history.push("/hurtownie");
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var hurtownie = this.state.hurtownie;
        var hurtownie_rowData = [];
        for (var i = 0; i < hurtownie.length; i++) {
            var hurt = hurtownie[i];
            var row = {
                idHurtownia: hurt.idHurtownia,
                nazwa: hurt.nazwa,
                dniNaOplate: hurt.dniNaOplate,
                dniNaDostawe: hurt.dniNaDostawe
            }

            hurtownie_rowData.push(row);
        }
        return hurtownie_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "idHurtownia", field: "idHurtownia", hide: true
            },
            {
                headerName: "Nazwa", field: "nazwa", sortable: true, filter: true
            },
            {
                headerName: "Dni dla oplaty zamowienia", field: "dniNaOplate", sortable: true, filter: true,
            },
            {
                headerName: "Dni na dostawe zamowienia", field: "dniNaDostawe", sortable: true, filter: true
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
        this.props.history.push('/hurtownia_edit/0');
    }


    onSelectionChanged() {
        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRow = selectedRows.pop();
        this.props.history.push('/hurtownia_edit/' + selectedRow.idHurtownia);
    }

    onBtnExport() {
        var params = { suppressQuotes: true };
        this.gridApi.exportDataAsCsv(params);
    }

    render() {
        return (
            <Container >
                <h2>Hurtownie</h2>
                <div style={{ height: '500px',width: '60%' }} className="ag-theme-balham">
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
                        <Button color="primary" type="button" onClick={this.handleCreate}>Dodaj Hurtowniu</Button>
                    </FormGroup>
                </div>
            </Container>
        );
    }
}


export default connect()(Hurtownie);