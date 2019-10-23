import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';

class ShowArtykul extends Component {
    displayName = ShowArtykul.name

    constructor(props) {
        super(props);
        this.state = {
            kategorias: [], producents: [], loading: true, err: '', disabled: true,
            id: '', nazwa: '', kod: '', illoscPodstawowa: 0, illoscProduktow: 0, wymaganaRecepta: false, kategoria: '', producent: ''
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



        this.handleReturn = this.handleReturn.bind(this);
        this.findKategoriaName = this.findKategoriaName.bind(this);
        this.findProducentName = this.findProducentName.bind(this);
    }



    handleReturn() {
        this.props.history.push("/artykuls");
    }

    findKategoriaName(id) {
        var kat = this.state.kategorias;
        for (var i in kat) {
            if (id === kat[i].idKategoria)
                return kat[i].nazwa;
        };
        return "Kategoria not Found";
    }
    findProducentName(id) {
        var prod = this.state.producents;
        for (var i in prod) {
            if (id === prod[i].idProducent)
                return prod[i].nazwa;
        };
        return "Producent not Found";
    }

    renderArtykulsForm() {
        return (
            <Form>
                <FormGroup>
                    <Label htmlFor="nazwa">Nazwa</Label>
                    <Input type="text" className="form-control" name="nazwa" value={this.state.nazwa}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="nazwa">Nazwa</Label>
                    <Input type="kod" className="form-control" name="kod" value={this.state.kod} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="illoscProduktow">Illosc Produktow</Label>
                    <Input type="number" className="form-control" name="illoscProduktow" value={this.state.illoscProduktow}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="illosc">Illosc Podstawowa</Label>
                    <Input type="number" className="form-control" name="illosc" value={this.state.illoscPodstawowa}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="kategoria">kategoria</Label>
                    <Input type="text" className="form-control" name="kategoria" value={this.findKategoriaName(this.state.kategoria)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="producent">Producent</Label>
                    <Input type="text" className="form-control" name="producent" value={this.findProducentName(this.state.producent)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="wymaganaRecepta">Czy jest Wymagana Recepta</Label>
                    <Input type="checkbox" className="form-control" name="wymaganaRecepta" value={this.state.wymaganaRecepta}/>
                </FormGroup>
                <FormGroup>
                    <Button className="btn btn-primary" type="button" onClick={this.handleReturn}>Return</Button>
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
                <h1>Artykul {this.state.nazwa}</h1>
                {contents}
            </div>
        );
    }
}


export default connect()(ShowArtykul);