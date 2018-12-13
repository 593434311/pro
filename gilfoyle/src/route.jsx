import React from 'react';
import { Route, Switch }  from 'react-router-dom';
import Main from './pages/main/index';
import Login from './pages/login/index';

export default class Router extends React.Component{
    render() {
        return (
            <Switch>
                <Route path="/page/index/main" component={Main}/>
                <Route path="/page/index/login" component={Login}/>
            </Switch>
        );
    }
}