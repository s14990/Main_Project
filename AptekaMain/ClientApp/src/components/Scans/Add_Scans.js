import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import axios from "axios";

export default class Add_Scans extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedFile: null,file_state: "empty"};

        this.refresh = this.refresh.bind(this);
    }

    fileChangedHandler = event => {
        this.setState({ file_state: "loading" });
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                selectedFile: file,
                base64: reader.result,
                file_state: "ready"
            });
        };
    }

    uploadHandler = () => {
        let reader = new FileReader();
        const formData = new FormData();
        formData.append('ScanPath', 'testpath');
        formData.append('SprzedazIdSprzedazy', 1);
        formData.append('ScanName', this.state.selectedFile.name);
        formData.append('Scan', this.state.base64);
        axios.post('api/ScanRecepties', formData);
        setTimeout(this.refresh, 1000);
    }

    refresh() {
        this.props.history.push("/scans");
    }


    render() {
        return (
            <div>
                <h1>Scans {this.state.file_state}</h1>
                <p>
                    <input type="file" onChange={this.fileChangedHandler}/>
                    <button onClick={this.uploadHandler}>Upload!</button>
                </p>
            </div>
        );
    }
}