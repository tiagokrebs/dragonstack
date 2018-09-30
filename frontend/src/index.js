import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import Generation from './components/Generation';
import Dragon from './components/Dragon';
import { generationReducer } from './reducers';
import { generationActionCreator } from './actions/generation';
import './index.css';

// strore Redux com passarem do reducer
const store = createStore(
    generationReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* subscribe recebe um listener
o listener é uma funcao de callback que vao executar algum codigo
sempre que um state for alterado*/
store.subscribe(() => console.log('store state update', store.getState()));

/* action para a Redux store
quando uma action é enviada para um Redux store ela é enviada
para todos os reducers entao cada reducer decide responder 
aquela action
*/
/*store.dispatch({ type: 'foo' });
store.dispatch({
    type: GENERATION_ACTION_TYPE,
    generation: { generation: 'goo', expiration: 'bar' }
 });

console.log('stote.getState()', store.getState());
})

store.dispatch(zooAction);
*/

fetch('http://localhost:3000/generation')
 .then(response => response.json())
 .then(json => {
     store.dispatch(generationActionCreator(json.generation));
 });

render(
    <Provider store={store}>
        <div>
            <h2>Dragon Stack</h2>
            <Generation />
            <Dragon />
        </div>
    </Provider>,
    document.getElementById('root')
);