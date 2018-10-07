import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Generation from './Generation';
import Dragon from './Dragon';
import { logout } from '../actions/account'

class Home extends Component {
    render () {
        return (
            <div>
                <Button onClick={this.props.logout} className='logout-button'>Log Out</Button>
                <h2>Dragon Stack</h2>
                <Generation />
                <Dragon />
            </div>
        )
    };
}

fetch('http://localhost:3000/account/dragons', {
    credentials: 'include'
}).then(response => response.json())
  .then(json => console.log('account dragons', json));

export default connect(null, { logout })(Home);