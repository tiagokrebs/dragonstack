// importações em React.js são diferentes 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generationActionCreator } from '../actions/generation';

// constantes de configuracao sao SCREAM CASE
//const DEFAULT_GENERATION = { generationId: '', expiration: '' };
const MININUM_DELAY = 3000;

// classe componente do objeto React
class Generation extends Component {
    // state para atributos do componente que podem ser modificados
    //state = { generation: DEFAULT_GENERATION } // removido por uso da redux store

    // atributos nao state para atributos modificacos mas nao utilizados no DOM
    timer = null;

    // metodo default React após montagem do componente
    // chama metodo de atualização periodica do componente
    componentDidMount() {
        this.fecthNextGeneration();
    }

    // metodo default React pós desmontagem do componente
    // limpa timeout periodico definido para atualizaçao do componente
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    // metodo para busca do valor do componente no backend
    fetchGeneration = () => {
        // endereço do backend é validado com cors
        fetch('http://localhost:3000/generation')
         // como é um Promisse .then e .catch
         .then(response => response.json())
         .then(json => { 
             //console.log('json', json)
             
             // atualiza state do componente com a informaçao do backen
             // sempre atualizar states com setState
             //this.setState({ generation: json.generation }); //removido por uso da redux store

             //
             console.log('json.generation', json.generation);
             this.props.dispatch(
                 generationActionCreator(json.generation)
             );
            })
         // em caso de erro na requisiçao
         .catch(error => console.error('error', error));
    };

    // metodo pata atualização periodica do componente via setTimeout
    // chama metodo de consulta do backend
    fecthNextGeneration = () => {
        // chama metodo de consulta do backend que atualiza state do componente
        this.fetchGeneration();

        // define delay para proxima atualizaçao de acordo com expiration atual - agora
        let delay = new Date(this.props.generation.expiration).getTime() - 
         new Date().getTime();
        // se delay atual muito pequeno usa minimum default
        if (delay < MININUM_DELAY) {
            delay = MININUM_DELAY;
        };
        
        // seta um atributo timer para poder ser parado posteriormente
        // faz chamada recursiva da propria funcao no tempo de delay definido
        this.timer = setTimeout(() => this.fecthNextGeneration(), delay);
    }

    // metodo renderizador do componente
    render() {
        console.log('this.props', this.props);

        // obtem objeto generation do state do componente
        // é um state porque states podem ser alterados
        //const { generation } = this.props; // nao funcionou
        const { generation } = this.props;


        return (
            // renderizaçao html
            <div>
                <h3>Generation {generation.generationId}. Expires on:</h3>
                <h4>{new Date(generation.expiration).toString()}</h4>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const generation = state.generation;

    return { generation };
};

const componentConnector = connect(mapStateToProps);

export default componentConnector(Generation);