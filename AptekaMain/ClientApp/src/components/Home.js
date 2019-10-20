import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div>
                <p>Hello</p>
                {!this.props.user.isAuthenticated && <p>Please Log In</p>}
                {this.props.user.isAuthenticated && <p>Level {this.props.user.user.access} User</p>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(Home);
