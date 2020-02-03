import React from 'react';
import { connect } from 'react-redux';
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import { Link } from 'react-router-dom';
import './NavMenu.css';

class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            wydzialy: [],
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    async componentDidMount() {
        await fetch('api/Wydzials')
            .then(response => response.json())
            .then(data => {
                this.setState({ wydzialy: data });
            });
    }
    render() {
        let spr_links = ''
        if (this.props.auth.isAuthenticated && this.props.auth.user.access === 1) {
            spr_links = <DropdownItem>
                <NavLink tag={Link} className="text-dark" to={"/batches/" + this.props.auth.user.pracownikIdPracownikaNavigation.wydzialAptekiIdWydzialu}>Nowy sprzedaż</NavLink>
            </DropdownItem>
        }
        if (this.props.auth.isAuthenticated && this.props.auth.user.access > 1) {
            spr_links = this.state.wydzialy.map(wydzial =>
                <DropdownItem key={wydzial.idWydzial}>
                    <NavLink tag={Link} className="text-dark" to={"/batches/" + wydzial.idWydzial}>Nowy sprzedaż w wydziale {wydzial.idWydzial}</NavLink>
                </DropdownItem>
            )
        }

        let towar_links = '';
        let towar_links2 = '';
        if (this.props.auth.isAuthenticated && this.props.auth.user.access > 1) {
            towar_links = <DropdownItem>
                <NavLink tag={Link} className="text-dark" to="/producents">Producenci</NavLink>
            </DropdownItem>
            towar_links2 = <DropdownItem>
                <NavLink tag={Link} className="text-dark" to="/kategorii">Kategorii</NavLink>
            </DropdownItem>
        }
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow navbar-dark bg-dark" dark>
                    <Container fluid>
                        <NavbarBrand tag={Link} to="/">Apteka</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                {this.props.auth.isAuthenticated &&
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Towar
                                    </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <NavLink tag={Link} className="text-dark" to="/artykuls">Artykuły</NavLink>
                                            </DropdownItem>
                                            {towar_links}
                                            {towar_links2}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                }
                                {(this.props.auth.isAuthenticated && this.props.auth.user.access > 1) &&
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Zamowienia
                                    </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <NavLink tag={Link} className="text-dark" to="/lista_brakow_show">Listy Braków</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink tag={Link} className="text-dark" to="/create_zamowienie">Nowe Zamowienie</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink tag={Link} className="text-dark" to="/zamowienia">Zamowienia</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink tag={Link} className="text-dark" to="/hurtownie">Hurtownie</NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                }
                                {this.props.auth.isAuthenticated &&
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Sprzedaż
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {spr_links}
                                            <DropdownItem>
                                                <NavLink tag={Link} className="text-dark" to="/sprzedazy">Sprzedaży</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink tag={Link} className="text-dark" to="/rabats">Rabaty</NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                }
                                {(this.props.auth.isAuthenticated && this.props.auth.user.access === 3) &&
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Administrowanie
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <NavLink tag={Link} className="text-dark" to="/users">Uzytkownicy</NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                }
                                {(this.props.auth.isAuthenticated && this.props.auth.user.access > 1) &&
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Statystyki
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <NavLink tag={Link} className="text-dark" to="/sales_charts">Statystyki Sprzedaży</NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                }
                                {!this.props.auth.isAuthenticated &&
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/login">Logowanie</NavLink>
                                    </NavItem>
                                }
                                {this.props.auth.isAuthenticated &&
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to={"/user_edit/" + this.props.auth.user.pracownikIdPracownika}>Twój Profil</NavLink>
                                    </NavItem>
                                }
                                {this.props.auth.isAuthenticated &&
                                    <NavItem>
                                        <NavLink tag={Link} to="/logout">Wyłoguj się</NavLink>
                                    </NavItem>
                                }
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(NavMenu);
