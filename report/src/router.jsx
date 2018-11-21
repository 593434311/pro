import React from 'react';
import { Route, Switch }  from 'react-router-dom';
import Report from './pages/report/index';


class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/page/report/index" component={Report}/>
            </Switch>
        );
    }
}

export default Routes;