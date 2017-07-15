import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import App from './App'
import appReducer from './reducers/appReducer'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'

const store = createStore(appReducer,{token : ""},
    applyMiddleware(thunkMiddleware)
)

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Route path="/:id" component={App} />
                        <Route exact path="/" render={() => (
                            <Redirect to="/current-favs"/>
                        )}/>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default Root;