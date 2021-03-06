﻿import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import validator from 'validator';

class Edit_Hurtownia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wydzialy: [], loading: false, err: '', disabled: true, mode: 'create', idHurtownia: '',
            nazwa: '', dniNaOplate: '', dniNaDostawe: ''
        };
        const hurt_id = this.props.match.params.id;
        if (hurt_id != 0) {
            fetch('api/Hurtownias/' + hurt_id)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        idHurtownia: data.idHurtownia,
                        nazwa: data.nazwa,
                        dniNaOplate: data.dniNaOplate,
                        dniNaDostawe: data.dniNaDostawe,
                        mode: 'edit'
                    });
                });
        }
        this.refresh = this.refresh.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.validateData = this.validateData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleCreate() {
        fetch("api/Hurtownias/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nazwa: this.state.nazwa,
                dniNaOplate: this.state.dniNaOplate,
                dniNaDostawe: this.state.dniNaDostawe
            })
        }).then(setTimeout(this.refresh, 300));
    }


    handleUpdate() {
        fetch("api/Hurtownias/" + this.state.idHurtownia, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idHurtownia: this.state.idHurtownia,
                nazwa: this.state.nazwa,
                dniNaOplate: this.state.dniNaOplate,
                dniNaDostawe: this.state.dniNaDostawe
            })
        }).then(setTimeout(this.refresh, 300));
    }

    handleDelete() {
        let id = this.state.id;
        if (window.confirm("Czy na pewno chcesz usunąć hurtownie " + this.state.idHurtownia) === true)
            fetch('api/Hurtownias/' + this.state.idHurtownia, {
                method: 'DELETE'
            }).then(setTimeout(this.refresh, 300));
    }

    handleReturn() {
        setTimeout(this.refresh, 300);
    }



    refresh() {
        this.props.history.push("/hurtownie");
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({ err: "", disabled: false });
        switch (name) {
            case 'nazwa':
                if (value.length <= 1) {
                    this.setState({ err: "Za krótka nazwa", disabled: true, nazwa: value });
                } else {
                    this.setState({ nazwa: value });
                }
                break;
            case 'dniNaOplate':
                if (value < 1) {
                    this.setState({ err: "Dostawa nie może być natychmiastowa", disabled: true, dniNaOplate: value });
                }
                else {
                    this.setState({ dniNaOplate: value });
                }
                break;
            case 'dniNaDostawe':
                if (value < 1) {
                    this.setState({ err: "Opłata nie może być natychmiastowa", disabled: true, dniNaDostawe: value });
                }
                else {
                    this.setState({ dniNaDostawe: value });
                }
                break;
            default:
                console.log("Unknown");
                break;
        }

    }

    validateData() {
        this.setState({ err: "", disabled: false });
        if (this.state.nazwa.length <= 1)
            this.setState({ err: "Za krótka nazwa", disabled: true });
        if (this.state.dniNaDostawe < 1)
            this.setState({ err: "Dostawa nie może być natychmiastowa", disabled: true });
        if (this.state.dniNaOplate < 1)
            this.setState({ err: "Opłata nie może być natychmiastowa", disabled: true });

    }


    renderHurtowniaForm() {
        return (
            <Form>
                <Col sm={{ size: 6, order: 2, offset: 1 }}>>
                {this.state.mode==='edit'? <h3>Dodaj nową Hurtownie</h3> : <h3>Edytuj Hurtownie</h3>}
                <FormGroup>
                        <Label htmlFor="nazwa">Nazwa</Label>
                        <Input type="text" className="form-control" name="nazwa" value={this.state.nazwa} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="dniNaDostawe">Dni na Dostawe</Label>
                        <Input type="number" className="form-control" name="dniNaDostawe" pattern="[0-9]*" value={this.state.dniNaDostawe} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="dniNaOplate">Dni na dostawe</Label>
                        <Input type="number" className="form-control" name="dniNaOplate" pattern="[0-9]*" value={this.state.dniNaOplate} onChange={this.handleInputChange} />
                    </FormGroup>
                    {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                    <FormGroup>
                        {this.state.mode === "edit" &&

                            <div>
                                <Button color="warning" type="button" onClick={this.handleUpdate} disabled={this.state.disabled}>Zatwierdż zmiany</Button>
                            </div>
                        }
                        {this.state.mode === "create" &&
                            <Button color="primary" type="button" onClick={this.handleCreate} disabled={this.state.disabled}>Dodaj Hurtownie </Button>
                        }
                        <Button color="info" type="button" onClick={this.handleReturn}>Powrót</Button>
                    </FormGroup>
                </Col>
            </Form>
        );
    }

    //<Button color="danger" type="button" onClick={this.handleDelete}>Usunąć Hurtownie</Button>

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderHurtowniaForm();

        return (
            <div>
                {contents}
            </div>
        );
    }
}


export default connect()(Edit_Hurtownia);