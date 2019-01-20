import React, {PureComponent} from 'react' 
import App from './App'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import { authStateReducer } from './src/components/HomePage';
import Expo from 'expo'

const reducers = combineReducers({
    authState: authStateReducer
})
store = createStore(reducers)


export default class entry extends PureComponent{

    render(){
        return(
            <Provider store= {store}>
            <React.Fragment>
                <App/>
            </React.Fragment>
            </Provider>
        )
    }
}

Expo.registerRootComponent(entry)