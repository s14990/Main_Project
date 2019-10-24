import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Listy_Brakow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lista: '',artykuls: [],braki: [], loading_data: true, loading_table: true,
            columnDefs: [],
            rowData: []
        };

        this.refresh = this.refresh.bind(this);
        this.setRowData = this.setRowData.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.findArtykulName = this.findArtykulName.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    }

    async componentDidMount() {
        const lista_id = this.props.match.params.id;
        await fetch('api/ListaBrakows/' + lista_id)
            .then(response => response.json())
            .then(data => {
                this.setState({ lista: data});
            });
        await fetch('api/Artykuls?$select=idArtykul, nazwa')
            .then(response => response.json())
            .then(data => {
                this.setState({ artykuls: data });
            });

        await fetch('/api/Brakis?$filter=listaBrakowIdListy eq ' + lista_id)
            .then(response => response.json())
            .then(data => {
                this.setState({ braki: data, loading: false});
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

    refresh() {
        this.props.history.push("/listy_brakow");
    }

    handleReturn() {
        setTimeout(this.refresh, 300);
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    setRowData() {
        var braki = this.state.braki;
        var brak_rowData = [];
        for (var i = 0; i < braki.length; i++) {
            var brak = braki[i];
            var row = {
                artykul: this.findArtykulName(brak.artykulIdArtukulu),
                illosc: brak.illosc
            }

            brak_rowData.push(row);
        }
        return brak_rowData;
    }

    setColumns() {
        let cols = [
            {
                headerName: "Artykul", field: "artykul", sortable: true, filter: true
            },
            {
                headerName: "Illość", field: "illosc", sortable: true, filter: true
            }
        ]
        return cols;
    }

    getTableData() {
        let rows = this.setRowData();
        let cols = this.setColumns();
        this.setState({ columnDefs: cols, rowData: rows, loading_table: false });
    }

    render() {
        return (
            <div style={{ height: '500px' }} className="ag-theme-balham">
                <p>Lista Braków dnia {this.state.lista.dataGen}</p>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    context={this.state.context}
                    onGridReady={this.onGridReady}
                />
                <Button className="btn btn-primary" type="button" onClick={this.handleReturn}>Return</Button>
            </div>
        );
    }
}


export default connect()(Listy_Brakow);