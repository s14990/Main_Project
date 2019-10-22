import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import axios from "axios";

export default class Scans extends Component {

    constructor(props) {
        super(props);
        this.state = { artykuls: [], loading: true };

        fetch('api/ScanRecepties')
            .then(response => response.json())
            .then(data => {
                this.setState({ scans: data,loading: false});
            });

        this.renderTable = this.renderTable.bind(this);

        this.refresh = this.refresh.bind(this);
        this.get_image = this.get_image.bind(this);
    }

    refresh() {
        this.props.history.push("/");
        this.props.history.push("/scans");
    }

    get_image(url) {
        let file;
        fetch(url).then(res => res.blob())
            .then(blob => {
                file = new File([blob], "File name");
                return file;
            })
        console.log("Finished reading file");
        return file;
    }



    renderTable(scans) {
        return (
            <div>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Scan Id</th>
                            <th>Sprzedaz Id</th>
                            <th>ScanName</th>
                            <th>Scan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scans.map(scan =>
                            <tr key={scan.idScan}>
                                <td>{scan.idScan}</td>
                                <td>{scan.sprzedazIdSprzedazy}</td>
                                <td>{scan.scanName}</td>
                                <td><img src={scan.scan} height="100" width="100"/></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div >
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTable(this.state.scans);

        return (
            <div>
                <h1>Scany</h1>
                {contents}
            </div>
        );
    }
}