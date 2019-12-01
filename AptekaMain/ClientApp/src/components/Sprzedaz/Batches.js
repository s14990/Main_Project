﻿import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Container, Row, Col } from 'reactstrap';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Batches extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lista: '', artykuls: [], batches: [], loading_data: true, loading_table: true,
            columnDefs: [],
            rowData: [],
            columnDefs2: [],
            rowData2: [],
            getRowNodeId: function (data) {
                return data.IdBatch;
            },
            rowSelection: "single",
            api: [],
            columnApi: [],
            api2: [],
            columnApi2: [],
            idWydzialu: '',
            redirect: false,
        };

        this.refresh = this.refresh.bind(this);
        this.setRowData = this.setRowData.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.findArtykulName = this.findArtykulName.bind(this);
        this.findArtykulCount = this.findArtykulCount.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.getAllRows = this.getAllRows.bind(this);
    }

    async componentDidMount() {
        const wydzial_id = this.props.match.params.id;
        this.setState({ idWydzialu: 1 });
        await fetch('api/Batches?$expand=idPartiaNavigation&$filter=wydzialAptekiIdWydzialu eq 1')
            .then(response => response.json())
            .then(data => {
                this.setState({ batches: data });
            });
        await fetch('api/Artykuls?$select=idArtykul, nazwa, illoscPodstawowa')
            .then(response => response.json())
            .then(data => {
                this.setState({ artykuls: data });
            });
        this.getTableData();
    }

    findArtykulName(id) {
        var arts = this.state.artykuls;
        for (var i in arts) {
            if (id === arts[i].IdArtykul)
                return arts[i].Nazwa;
        };
        return "Artykul not Found";
    }

    findArtykulCount(id) {
        var arts = this.state.artykuls;
        for (var i in arts) {
            if (id === arts[i].IdArtykul)
                return arts[i].IlloscPodstawowa;
        };
        return 0;
    }

    refresh() {
        this.props.history.push("/listy_brakow");
    }

    handleReturn() {
        setTimeout(this.refresh, 300);
    }

    onGridReady = params => {
        this.gridApi1 = params.api;
        this.gridColumnApi1 = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    onGridReady2 = params => {
        this.gridApi2 = params.api;
        this.gridColumnApi2 = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var batches = this.state.batches;
        var brak_rowData = [];
        for (var i = 0; i < batches.length; i++) {
            var batch = batches[i];
            var row = {
                IdBatch: batch.IdBatch,
                IdPartia: batch.IdPartia,
                WydzialAptekiIdWydzialu: this.state.idWydzialu,
                artykul: this.findArtykulName(batch.IdPartiaNavigation.ArtykulIdArtukulu),
                Kod: batch.Kod,
                Liczba: batch.Liczba,
                LiczbaWybrana: 1
            }
            brak_rowData.push(row);
        }
        return brak_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "IdBatch", field: "IdBraki", hide: true
            },
            {
                headerName: "IdPartia", field: "IdPartia", hide: true
            },
            {
                headerName: "WydzialAptekiIdWydzialu", field: "WydzialAptekiIdWydzialu", hide: true
            },
            {
                headerName: "Artykul", field: "artykul", sortable: true, filter: true, editable: false
            },
            {
                headerName: "Kod", field: "Kod", sortable: true, filter: true, editable: false
            },
            {
                headerName: "Liczba", field: "Liczba", sortable: true, filter: true, editable: false
            },
            {
                headerName: "LiczbaWybrana", field: "LiczbaWybrana", hide: true
            }
        ]
        return cols;
    }

    setColumns2() {
        let cols = [
            {
                headerName: "IdBatch", field: "IdBraki", hide: true
            },
            {
                headerName: "IdPartia", field: "IdPartia", hide: true
            },
            {
                headerName: "WydzialAptekiIdWydzialu", field: "WydzialAptekiIdWydzialu", hide: true
            },
            {
                headerName: "Artykul", field: "artykul", sortable: true, filter: true, editable: false
            },
            {
                headerName: "Kod", field: "Kod", sortable: true, filter: true, editable: false
            },
            {
                headerName: "LiczbaWSprzedazy", field: "LiczbaWSprzedazy", sortable: true, filter: true, editable: false
            },
            {
                headerName: "LiczbaWybrana", field: "LiczbaWybrana", editable: true
            }
        ]
        return cols;
    }

    getTableData() {
        let rows = this.setRowData();
        let cols = this.setColumns();
        let cols2 = this.setColumns2();
        let rows2 = [];
        this.setState({ columnDefs: cols, rowData: rows, columnDefs2: cols2, rowData2: rows2, loading_table: false });
        //new Date(parsed);
    }

    onSelectionChanged() {
        var selectedRows = this.gridApi1.getSelectedRows();
        var selectedRow = selectedRows[0];
        if (selectedRow) {
            this.gridApi2.updateRowData({ add: selectedRows })
            this.gridApi1.updateRowData({ remove: selectedRows });
        }
        console.log(this.gridApi2);
    }

    onSelectionChanged2() {
        var selectedRows = this.gridApi2.getSelectedRows();
        var selectedRow = selectedRows[0];
        if (selectedRow) {
            this.gridApi1.updateRowData({ add: selectedRows })
            //let rows = this.state.rowData2;
            //rows.push(selectedRow);
            //this.setState({ rowData2: rows });
            this.gridApi2.updateRowData({ remove: selectedRows });
        }
    }

    getAllRows() {
        let rowData = [];
        this.gridApi2.forEachNode(node => rowData.push(node.data));
        return rowData;
    }

    handleRedirect() {
        this.setState({ redirect: true });
    }

    render() {
        var date = new Date(this.state.lista.DataGen);
        return (
            <Container>
                <Row>
                    <Col>
                        <h4>Wydzial </h4>
                    </Col>
                    <Col>
                        <h4>Sprzedaz</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ height: '500px' }} className="ag-theme-balham">
                            {date && <p>Lista Braków dnia {this.state.lista.DataGen}</p>}
                            <AgGridReact
                                columnDefs={this.state.columnDefs}
                                rowData={this.state.rowData}
                                context={this.state.context}
                                onGridReady={this.onGridReady}
                                rowSelection={this.state.rowSelection}
                                onSelectionChanged={this.onSelectionChanged.bind(this)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div style={{ height: '500px' }} className="ag-theme-balham">
                            <AgGridReact
                                columnDefs={this.state.columnDefs2}
                                rowData={this.state.rowData2}
                                context={this.state.context}
                                onGridReady={this.onGridReady2}
                                rowSelection={this.state.rowSelection}
                                onSelectionChanged={this.onSelectionChanged2.bind(this)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Button className="btn btn-primary" type="button" onClick={this.handleRedirect}>Przejdź do Złozenia zamowienia</Button>
                        </FormGroup>
                    </Col>
                </Row>
                {this.state.redirect &&
                    <Redirect to={{
                        pathname: '/create_zamowienie',
                        state: { init_data: this.getAllRows() }
                    }}
                    />
                }
            </Container>
        );
    }
}


export default connect()(Batches);