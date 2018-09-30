import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

/* defaul para inicializaçao do componente antes da busca
dos atributos no backend*/
const DEFAULT_DRAGON = {
    dragonId: '',
    generationId: '',
    nickname: '',
    birthdate: '',
    traits: []
};

// classe do componente Dragon
class Dragon extends Component {
    // state inicial com valores default
    state = { dragon: DEFAULT_DRAGON }

    /* metodo buildin chamado apos montagem do componente para 
    atualizacao das informaçoes por funçao fetchDragon*/
    componentDidMount() {
        this.fetchDragon();
    }

    /* funcao para obter dragon do backend
    propriedade da classe (fora da classe) Dragon setada como uma 
    função {}. Utiliza webApi fetch para a chamada no backend que
    retorna uma Promise com um objeto response que é utiilizado
    com o seu proprio callback com seu proprio metodo response.json.
    response.json() retorna o seu proprio Promisse json que é utilizadp
    para setar o state de Dragon.
    nos final erros sao obtidos em .catch e retornados pelo metodo
    defaul de erros
    */
    fetchDragon = () => {
        fetch('http://localhost:3000/dragon/new')
        .then(response => response.json())
        .then(json => this.setState({ dragon : json.dragon }))
        .catch(error => console.error('error', error));
    }

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
                <Button onClick={this.fetchDragon}>New Dragon</Button>
                <DragonAvatar dragon={this.state.dragon} />
            </div>
        );
    }
}

// exporta Dragon para disponibilizar utilizaçao
export default Dragon;