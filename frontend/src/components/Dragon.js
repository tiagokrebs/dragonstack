import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { fetchDragon } from '../actions/dragon';

// classe do componente Dragon
class Dragon extends Component {
    // metodo de renderizaçao
    render() {
        /* retorno da renderizaçao do componente DragonAvatar
         componente filho recebe props (propriedades)
         o pai Dragon tem a habilidade de passar props para o filho DragonAvatar
         props sao passadas como chaves do componente
         exemplo abaixo envia objeto dragon para o filho
        */
        return (
            <div>
                <Button onClick={this.props.fetchDragon}>New Dragon</Button>
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        );
    }
}

// exporta Dragon para disponibilizar utilizaçao
export default connect(
    // o que eu quero pegar da redux store => o que eu quero retornar a props
    // um objeto de dragon => um objeto de dragon
    ({ dragon }) => ({ dragon }),
    // objeto com action creators
    { fetchDragon }
)(Dragon);