import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wydzial_Powiadomienia from './Powiadomienia/Wydzial_Powiadomienia';
import { Col,Row } from 'reactstrap';
class Home extends Component {
    render() {


        let msg = "Załoguj się do systemu";
        if (this.props.auth.isAuthenticated) {
            msg = <div>Załogowany jako: {" "+this.props.auth.user.pracownikIdPracownikaNavigation.imie+" "}
                {this.props.auth.user.pracownikIdPracownikaNavigation.nazwisko}
                <br></br>
                Poziom dostępu: {this.props.auth.user.access === 3 ? "Administrator" : this.props.auth.user.access === 2 ? "Menedżer" : "Farmaceuta"}
                </div>
        }
        return (
            <div>
                <Row>
                    <Col>                       
                        {msg}
                    </Col>
                    {this.props.auth.login_error && 
                        <h4>Bład przy logowaniu
                        </h4>
                    }
                    <Col>
                        {this.props.auth.isAuthenticated && <Wydzial_Powiadomienia />}
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Home);
