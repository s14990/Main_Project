import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Container,Row,Col } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
//import Select from 'react-select';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Create_Zamowienia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artykuls: [], hurtowni:[], loading_data: true, loading_table: true,
            columnDefs: [],
            rowData: [],
            context: { componentParent: this },
            rowSelection: "multiple",
            init_data: [],
            searchList: [],
            selectedOption: '',
        };

        this.findHurtowniaName = this.findHurtowniaName.bind(this);
        this.findArtykul = this.findArtykul.bind(this);
        this.refresh = this.refresh.bind(this);
        this.setRowData = this.setRowData.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    async componentDidMount() {
        if (this.props.location.state.init_data) {
            this.setState({ init_data: this.props.location.state.init_data });
        }
        await fetch('api/Artykuls')
            .then(response => response.json())
            .then(data => {
                this.setState({ artykuls: data });
            });
        await fetch('api/Hurtownias')
            .then(response => response.json())
            .then(data => {
                this.setState({ hurtowni: data })
            });
        this.getTableData();

        var searchList = this.state.artykuls.map(
            art => {
                return {
                    value: art,
                    label: art.nazwa,
                }
            }
        );
        this.setState({ searchList });
    }

    refresh() {
        this.props.history.push("/artykuls");
    }

    findHurtowniaName(id) {
        var hurt = this.state.hurtowni;
        for (var i in hurt) {
            if (id === hurt[i].idHurtownia)
                return hurt[i].nazwa;
        };
        return "Hurtownia not Found";
    }

    findArtykul(id) {
        var art = this.state.artykuls;
        for (var i in art) {
            if (id === art[i].idArtykul)
                return art[i];
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var artykuls = this.state.artykuls;
        var art_rowData = [];
        let data = this.state.init_data
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var artykul = this.findArtykul(d.artykulId);
                var row = {
                    idArtykul: artykul.idArtykul,
                    nazwa: artykul.nazwa,
                    kod: artykul.kod,
                    illoscProduktow: artykul.illoscProduktow,
                    illoscPodstawowa: artykul.illoscPodstawowa,
                    cenaWZakupu: 0,
                    liczba: d.illosc,
                }
                art_rowData.push(row);
            }
        }
        return art_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "idArtykul", field: "idArtykul", hide: true
            },
            {
                headerName: "Nazwa", field: "nazwa", sortable: true, filter: true, editable: false,
            },
            {
                headerName: "Illość W Sprzedaży", field: "illoscProduktow", sortable: true, filter: true, editable: false,
            },
            {
                headerName: "Illość Podstawowa", field: "illoscPodstawowa", sortable: true, filter: true,editable: false,
            },
            {
                headerName: "Cena zakupu", field: "cenaWZakupu", sortable: true, editable: true,
            },
            {
                headerName: "Liczba w zamowieniu", field: "liczba", sortable: true, editable: true,
            },
            {
                headerName: "Suma", field: "suma",
                valueGetter: function (params) {
                    let c = params.data.cenaWZakupu;
                    let i = params.data.liczba;
                    let r = c * i;
                    return r;
                },
                editable: false,
                sortable: true
            },
        ]
        return cols;
    }

    getTableData() {
        let rows = this.setRowData();
        let cols = this.setColumns();
        this.setState({ columnDefs: cols, rowData: rows, loading_table: false });
    }

    handleCreate() {
        this.props.history.push('/artykul_edit/0');
    }

    onSelectionChanged() {

    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })   
    }

/*
    <div>
    <Select
        value={this.state.selectedOption}
        options={this.state.searchList}
        onChange={this.handleSelectionChange}
    />
    </div>
    */
    render() {
        return (
            <Container>
                <Row>
                </Row>
                <Row>
                <div style={{ height: '500px' }} className="ag-theme-balham">
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    context={this.state.context}
                    frameworkComponents={this.state.frameworkComponents}
                    onGridReady={this.onGridReady}
                    rowSelection={this.state.rowSelection}
                    onSelectionChanged={this.onSelectionChanged.bind(this)}
                />
                </div>
                </Row>
                <Row>
                <FormGroup>
                    <Button className="btn btn-primary" type="button" onClick={this.handleCreate}>Zlóz zamowienie</Button>
                </FormGroup>
                </Row>
            </Container>
        );
    }
}


export default connect()(Create_Zamowienia);