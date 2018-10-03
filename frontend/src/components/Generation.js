// importações em React.js são diferentes 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGeneration } from '../actions/generation';
import fetchStates from '../reducers/fetchStates';

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

    // metodo pata atualização periodica do componente via setTimeout
    // chama metodo de consulta do backend
    fecthNextGeneration = () => {
        // chama metodo de consulta do backend que atualiza state do componente
        this.props.fetchGeneration();

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

        // render tipo loading...
        // if (generation.status === fetchStates.fecthing) {
        //     return <div>...</div>
        // }

        if (generation.status === fetch.error){
            return <div>{generation.message}</div>;
        }

        return (
            // renderizaçao html
            <div>
                <h3>Generation {generation.generationId}. Expires on:</h3>
                <h4>{new Date(generation.expiration).toString()}</h4>
            </div>
        )
    }
}


// passa a informacao para redux store que esse componente quer acessar o state atual
const mapStateToProps = state => {
    const generation = state.generation;

    return { generation };
};

// metodo que permite ao componente acessar a redux store atravers de props
const componentConnector = connect(
    mapStateToProps, 
    { fetchGeneration }
    );

// export para o componente combinado com a redux store atraves do metodo connect
export default componentConnector(Generation);