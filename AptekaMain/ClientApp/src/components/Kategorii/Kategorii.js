import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Container, h2 } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { local_pl } from '../../components/grid_pl';


class Kategorii extends Component {

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
        await fetch('api/Kategorias')
            .then(response => response.json())
            .then(data => {
                this.setState({ kategorii: data })
            });
        this.getTableData();
    }


    refresh() {
        this.props.history.push("/kategorii");
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var kategorii = this.state.kategorii;
        var kategorii_rowData = [];
        for (var i = 0; i < kategorii.length; i++) {
            var kat = kategorii[i];
            var row = {
                idKategoria: kat.idKategoria,
                nazwa: kat.nazwa
            }

            kategorii_rowData.push(row);
        }
        return kategorii_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "idKategoria", field: "idKategoria", hide: true
            },
            {
                headerName: "Nazwa", field: "nazwa", sortable: true, filter: true
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
        this.props.history.push('/kategoria_edit/0');
    }


    onSelectionChanged() {
        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRow = selectedRows.pop();
        this.props.history.push('/kategoria_edit/' + selectedRow.idKategoria);
    }

    onBtnExport() {
        var params = { suppressQuotes: true };
        this.gridApi.exportDataAsCsv(params);
    }

    render() {
        return (
            <Container >
                <h2>Kategorii</h2>
                <div style={{ height: '500px', width: '40%' }} className="ag-theme-balham">
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
                        <Button color="primary" type="button" onClick={this.handleCreate}>Dodaj Kategorie</Button>
                    </FormGroup>
                </div>
            </Container>
        );
    }
}


export default connect()(Kategorii);