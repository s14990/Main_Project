import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { local_pl } from '../../components/grid_pl';

class Sprzedazy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sprzedazy: [], loading_data: true, loading_table: true,
            columnDefs: [],
            rowData: [],
            context: { componentParent: this },
            rowSelection: "single"
        };

        this.refresh = this.refresh.bind(this);
        this.setRowData = this.setRowData.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    async componentDidMount() {
        await fetch('/api/Sprzedaz?$expand=scanRecepty($select=IdScan;$top=1)&$filter=idSprzedaz ne 1')
            .then(response => response.json())
            .then(data => {
                this.setState({ sprzedazy: data, loading_data: false });
            });
        this.getTableData();
    }

    refresh() {
        this.props.history.push("/sprzedazy");
    }


    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var sprz = this.state.sprzedazy;
        var user_rowData = [];
        for (var i = 0; i < sprz.length; i++) {
            var spr = sprz[i];
            var row = {
                idSprzedaz: spr.IdSprzedaz,
                suma: spr.Suma,
                dataSprzedazy: spr.DataSprzedazy,
                typOplaty: spr.TypOplaty,
                wymaganaRecepta: spr.WymaganaRecepta,
                jestOK: (spr.WymaganaRecepta && spr.ScanRecepty.length === 0) ? false : true
            }

            user_rowData.push(row);
        }
        return user_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "Numer", field: "idSprzedaz", sortable: true, filter: true
            },
            {
                headerName: "Suma", field: "suma", sortable: true, filter: true
            },
            {
                headerName: "Data Sprzedaży", field: "dataSprzedazy", sortable: true, filter: true,
            },
            {
                headerName: "Typ Opłaty", field: "typOplaty", sortable: true, filter: true
            },
            {
                headerName: "Czy jest Wymagana Recepta?", field: "wymaganaRecepta", sortable: true, filter: true
            },
            {
                headerName: "jestOK", field: "jestOK", hide: true
            }
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
        this.props.history.push('/sprzedaz/' + cell);
    }

    onSelectionChanged() {
        let selectedRows = this.gridApi.getSelectedRows();
        let selectedRow = selectedRows.pop();
        this.props.history.push('/sprzedaz/' + selectedRow.idSprzedaz);

    }

    onBtnExport() {
        var params = { suppressQuotes: true };
        this.gridApi.exportDataAsCsv(params);
    }

    render() {
        return (
            <Container>
                <h3>Sprzedaży</h3>
            <div style={{ height: '500px',width:'91%' }} className="ag-theme-balham">
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
                        getRowStyle={function (params) {
                            if (params.data.jestOK === false) {
                                return {
                                    'background-color': '#ff6666'
                                };
                            } else if (params.data.wymaganaRecepta === true) {
                                return {
                                    'background-color': '#ffcc00',
                                };
                            }
                            else {
                                return {
                                    'background-color': '#39e600',
                                };
                            }
                        }}
                        pagination={true}
                        paginationAutoPageSize={true}
                        localeText={local_pl}
                    />
                </div>
            </Container>
        );
    }
}


export default connect()(Sprzedazy);