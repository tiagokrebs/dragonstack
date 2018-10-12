import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../actions/accountInfo';

class AccountInfo extends Component {
    componentDidMount() {
        this.props.fetchAccountInfo();
    }

    render() {
        return (
            <div>
                <h3>Account Info</h3>
                <div>Username: {this.props.accountInfo.username}</div>
                <div>Balance: {this.props.accountInfo.balance}</div>
            </div>
        )
    }
}

// disponibilização de dados ao componente no nível connect
export default connect(
    //map state to props. inline callback
    //o que eu quero da redux store => objeto de retorno 
    ({ accountInfo }) => ({ accountInfo }),
    //map dispatch to props
    //disponibiliza actions para componente
    { fetchAccountInfo }
)(AccountInfo); // funçao resultante de connect volta para a classe AccountInfo, componente 