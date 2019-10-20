import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';

export default class Artykuls extends Component {
    displayName = Artykuls.name


    constructor(props) {
        super(props);
        this.state = { artykuls: [], filtered: [], word: '', kategorias: [], producents: [], loading: true };

        fetch('api/Artykuls')
            .then(response => response.json())
            .then(data => {
                this.setState({ artykuls: data, filtered: data });
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

        this.renderArtykulsTable = this.renderArtykulsTable.bind(this);
        this.findKategoriaName = this.findKategoriaName.bind(this);
        this.findProducentName = this.findProducentName.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.refresh = this.refresh.bind(this);
        this.compareBy = this.compareBy.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleDelete(id) {
        if (window.confirm("Do you want to delete Artykul" + id) === true)
            fetch('api/Artykuls/' + id, {
                method: 'DELETE'
            }).then(setTimeout(this.refresh, 300));
    }


    refresh() {
        this.props.history.push("/");
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


    handleInputChange(event) {
        const target = event.target;
        let name = target.name;
        let value = target.value;
        switch (name) {
            case 'word':
                if (value != '') {
                    var arts = this.state.artykuls;
                    var new_art = new Array();
                    for (var i = 0; i < arts.length; i++) {
                        if (arts[i].nazwa.includes(value))
                            new_art.push(arts[i]);
                    }
                    this.setState({ filtered: new_art, word: value });
                }
                else {
                    var arts = this.state.artykuls;
                    this.setState({ filtered: arts, word: '' });
                }

                break;
            default:
                console.log("Unknown");
                break;
        }
    }


    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {
        let arrayCopy = [...this.state.filtered];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ filtered: arrayCopy });
    }

    renderArtykulsTable(artykuls) {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label htmlFor="word">Wyszukiwanie po nazwie</Label>
                        <Input type="text" className="form-control" name="word" value={this.state.word} onChange={this.handleInputChange} />
                    </FormGroup>
                </Form>
                <Table bordered>
                    <thead>
                        <tr>
                            <th onClick={() => this.sortBy('nazwa')} >Nazwa</th>
                            <th onClick={() => this.sortBy('kod')}>Kod</th>
                            <th onClick={() => this.sortBy('illoscProduktow')}>Illosc Produktów</th>
                            <th onClick={() => this.sortBy('illoscPodstawowa')}>Illosc Podstawowa</th>
                            <th onClick={() => this.sortBy('wymaganaRecepta')}>WymaganaRecepta</th>
                            <th onClick={() => this.sortBy('kategoriaIdKategoria')}>Kategoria</th>
                            <th onClick={() => this.sortBy('producentIdProducent')}>Producent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artykuls.map(artykul =>
                            <tr key={artykul.idArtykul}>
                                <td>{artykul.nazwa}</td>
                                <td>{artykul.kod}</td>
                                <td>{artykul.illoscProduktow}</td>
                                <td>{artykul.illoscPodstawowa}</td>
                                <td>{artykul.wymaganaRecepta==="1"? "Tak" : "Nie" }</td>
                                <td>{this.findKategoriaName(artykul.kategoriaIdKategoria)}</td>
                                <td>{this.findProducentName(artykul.producentIdProducent)}</td>
                                <td><a className="action" onClick={(id) => this.handleDelete(artykul.idArtykul)}>Delete</a></td>
                                <td><Link className="links" to={'artykul_edit/' + artykul.idArtykul}>Edit</Link></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderArtykulsTable(this.state.filtered);

        return (
            <div>
                <h1>Artykuly</h1>
                {contents}
                <p>
                    <Link to="/artykul_new">Create New</Link>
                </p>
            </div>
        );
    }
}