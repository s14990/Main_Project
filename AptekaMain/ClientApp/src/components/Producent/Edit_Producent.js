import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import validator from 'validator';

class Edit_Producent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wydzialy: [], loading: false, err: '', disabled: true, mode: 'create', idProducent: '',
            nazwa: '',
            kraj: ''
        };
        const hurt_id = this.props.match.params.id;
        if (hurt_id != 0) {
            fetch('api/Producents/' + hurt_id)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        idProducent: data.idProducent,
                        nazwa: data.nazwa,
                        kraj: data.kraj,
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
        fetch("api/Producents", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nazwa: this.state.nazwa,
                kraj: this.state.kraj
            })
        }).then(setTimeout(this.refresh, 300));
    }


    handleUpdate() {
        fetch("api/Producents/" + this.state.idProducent, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idProducent: this.state.idProducent,
                nazwa: this.state.nazwa,
                kraj: this.state.kraj
            })
        }).then(setTimeout(this.refresh, 300));
    }

    handleDelete() {
        let id = this.state.id;
        if (window.confirm("Czy na pewno chcesz usunąć hurtownie " + this.state.idProducent) === true)
            fetch('api/Hurtownias/' + this.state.idProducent, {
                method: 'DELETE'
            }).then(setTimeout(this.refresh, 300));
    }

    handleReturn() {
        setTimeout(this.refresh, 300);
    }



    refresh() {
        this.props.history.push("/producents");
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
            case 'kraj':
                if (value.length <= 1) {
                    this.setState({ err: "Nieprawidłowa nazwa kraju", disabled: true, kraj: value });
                }
                else {
                    this.setState({ kraj: value });
                }
                break;
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
                {this.state.mode === 'edit' ? <h3>Dodaj nowego Producenta</h3> : <h3>Edytuj Producenta</h3>}
                    <FormGroup>
                        <Label htmlFor="nazwa">Nazwa</Label>
                        <Input type="text" className="form-control" name="nazwa" value={this.state.nazwa} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="kraj">Kraj</Label>
                        <Input type="text" className="form-control" name="kraj" value={this.state.kraj} onChange={this.handleInputChange} />
                    </FormGroup>
                    {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                    <FormGroup>
                        {this.state.mode === "edit" &&

                            <div>
                                <Button color="warning" type="button" onClick={this.handleUpdate} disabled={this.state.disabled}>Zatwierdż zmiany</Button>
                            </div>
                        }
                        {this.state.mode === "create" &&
                            <Button color="primary" type="button" onClick={this.handleCreate} disabled={this.state.disabled}>Dodaj Producenta</Button>
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


export default connect()(Edit_Producent);