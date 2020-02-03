import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import validator from 'validator';

class Edit_Wydzial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wydzialy: [], loading: false, err: '', disabled: true, mode: 'create', idWydzial: '',
            adres: '',
            kodPocztowy: '',
        };
        const hurt_id = this.props.match.params.id;
        if (hurt_id != 0) {
            fetch('api/Wydzials/' + hurt_id)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        idWydzial: data.idWydzial,
                        adres: data.adres,
                        kodPocztowy: data.kodPocztowy,
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
        fetch("api/Wydzials", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                adres: this.state.adres,
                kodPocztowy: this.state.kodPocztowy
            })
        }).then(setTimeout(this.refresh, 300));
    }


    handleUpdate() {
        fetch("api/Wydzials/" + this.state.idWydzial, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idWydzial: this.state.idWydzial,
                adres: this.state.adres,
                kodPocztowy: this.state.kodPocztowy
            })
        }).then(setTimeout(this.refresh, 300));
    }

    handleDelete() {
        let id = this.state.id;
        if (window.confirm("Czy na pewno chcesz usunąć Wydzial " + this.state.idWydzial) === true)
            fetch('api/Wydzials/' + this.state.idHurtownia, {
                method: 'DELETE'
            }).then(setTimeout(this.refresh, 300));
    }

    handleReturn() {
        setTimeout(this.refresh, 300);
    }



    refresh() {
        this.props.history.push("/wydzialy");
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({ err: "", disabled: false });
        switch (name) {
            case 'adres':
                if (value.length <= 1) {
                    this.setState({ err: "Za krótki adres", disabled: true, adres: value });
                } else {
                    this.setState({ adres: value });
                }
                break;
            case 'kodPocztowy':
                console.log(value);
                if (value.length < 3) {
                    this.setState({ err: "Nieprawidłowy index pocztowy", disabled: true, kodPocztowy: value });
                }
                else {
                    this.setState({ kodPocztowy: value });
                }
                break;
            default:
                console.log("Unknown");
                break;
        }

    }

    validateData() {

    }


    renderHurtowniaForm() {
        return (
            <Form>
                <Col sm={{ size: 6, order: 2, offset: 1 }}>>
                {this.state.mode === 'edit' ? <h3>Dodaj nowy Wydzial</h3> : <h3>Edytuj Wydzial</h3>}
                    <FormGroup>
                        <Label htmlFor="adres">Adres</Label>
                        <Input type="text" className="form-control" name="adres" value={this.state.adres} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="kodPocztowy">Kod Pocztowy</Label>
                        <Input type="text" className="form-control" name="kodPocztowy" pattern="[0-9]*-[0-9]*" value={this.state.kodPocztowy} onChange={this.handleInputChange} />
                    </FormGroup>
                    {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                    <FormGroup>
                        {this.state.mode === "edit" &&

                            <div>
                                <Button color="warning" type="button" onClick={this.handleUpdate} disabled={this.state.disabled}>Zatwierdż zmiany</Button>
                            </div>
                        }
                        {this.state.mode === "create" &&
                            <Button color="primary" type="button" onClick={this.handleCreate} disabled={this.state.disabled}>Dodaj Wydział</Button>
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


export default connect()(Edit_Wydzial);