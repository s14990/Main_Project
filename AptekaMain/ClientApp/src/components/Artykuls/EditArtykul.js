import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table} from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';

class EditArtykul extends Component {
    displayName = EditArtykul.name

    constructor(props) {
        super(props);
        this.state = {
            kategorias: [], producents: [], loading: true, err:'', disabled: true,
            id: '', nazwa: '', kod: '', illoscPodstawowa: 0, illoscProduktow: 0, wymaganaRecepta:false, kategoria: '', producent: ''
        };
        const art_id = this.props.match.params.id;

        fetch('api/Artykuls/' + art_id)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    id: data.idArtykul, nazwa: data.nazwa, kod: data.kod, illoscProduktow: data.illoscProduktow,
                    illoscPodstawowa: data.illoscPodstawowa, kategoria: data.kategoriaIdKategoria, producent: data.producentIdProducent,
                    wymaganaRecepta: data.wymaganaRecepta
                });
            });
        fetch('api/Producents')
            .then(response => response.json())
            .then(data => {
                this.setState({ producents: data });
            });
        fetch('api/Kategorias')
            .then(response => response.json())
            .then(data => {
                this.setState({ kategorias: data, loading: false });
            });

        this.refresh = this.refresh.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.validateData = this.validateData.bind(this);
    }


   handleUpdate() {

       fetch("api/Artykuls/" + this.state.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idArtykul: this.state.id,
                nazwa: this.state.nazwa,
                kod: this.state.kod,
                illoscProduktow: this.state.illoscProduktow,
                illoscPodstawowa: this.state.illoscPodstawowa,
                kategoriaIdKategoria: this.state.kategoria,
                producentIdProducent: this.state.producent,
                wymaganaRecepta: this.state.wymaganaRecepta
            })
       }).then(setTimeout(this.refresh, 300));
    }


    refresh() {
        this.props.history.push("/artykuls");
    }

    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'kategoria':
                this.setState({ kategoria: value });
                break;
            case 'producent':
                this.setState({ producent: value });
                break;
            case 'nazwa':
                this.setState({ nazwa: value })
                break;
            case 'kod':
                this.setState({ kod: value })
                break;
            case 'illosc':
                this.setState({ illoscPodstawowa: value })
                break;
            case 'wymaganaRecepta':
                this.setState({ wymaganaRecepta: event.target.checked })
                break;
            default:
                console.log("Unknown");
                break;
        }
        this.validateData();
    }

    validateData() {
        this.setState({ err: "", disabled: false });
        if (this.state.nazwa.length <= 3)
            this.setState({ err: "Nazwa nie moż być krótrsza od 3 znaków", disabled: true });
        if (this.state.kod.length <= 3)
            this.setState({ err: "kod nie moż być krótrsza od 3 znaków", disabled: true });
        if (this.state.illosc < 0)
            this.setState({ err: "Illosc nie moze byc ujemna", disabled: true });
        if (this.state.kategoria == null)
            this.setState({ err: "Wybierz Kategorije", disabled: true });
        if (this.state.kategoria == null)
            this.setState({ err: "Wybierz Producenta", disabled: true });

    }


    renderArtykulsForm() {
        return (
            <Form>
                <FormGroup>
                    <Label htmlFor="nazwa">Nazwa</Label>
                    <Input type="text" className="form-control" name="nazwa" value={this.state.nazwa} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="nazwa">Nazwa</Label>
                    <Input type="kod" className="form-control" name="kod" value={this.state.kod} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="nazwa">Illosc Podstawowa</Label>
                    <Input type="number" className="form-control" name="illosc" value={this.state.illoscPodstawowa} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="kategoria">Producent</Label>
                    <select className="form-control" name="kategoria" value={this.state.kategoria} onChange={this.handleInputChange}>
                        <option value="" disabled></option>
                        {this.state.kategorias.map(kat =>
                            <option key={kat.idKategoria} value={kat.idKategoria} >{kat.nazwa}</option>
                        )}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="producent">Producent</Label>
                    <select className="form-control" name="producent" value={this.state.producent} onChange={this.handleInputChange}>
                        <option value="" disabled></option>
                        {this.state.producents.map(prod =>
                            <option key={prod.idProducent} value={prod.idProducent} >{prod.nazwa}</option>
                        )}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="wymaganaRecepta">Czy jest Wymagana Recepta</Label>
                    <Input type="checkbox" className="form-control" name="wymaganaRecepta" value={this.state.wymaganaRecepta} onChange={this.handleInputChange} />
                </FormGroup>
                {this.state.err.length > 0 && <p className="Error">{this.state.err}</p>}
                <FormGroup>
                <Button className="btn btn-primary" type="button" onClick={this.handleUpdate} disabled={this.state.disabled}>Save kategoria</Button>
                </FormGroup>
            </Form>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderArtykulsForm();

        return (
            <div>
                <h1>Edit Artykul</h1>
                {contents}
            </div>
        );
    }
}


export default connect()(EditArtykul);