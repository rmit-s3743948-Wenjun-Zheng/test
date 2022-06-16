import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import login from './view/login'
import selectRoom from './view/selectRoom';
import bookingConfirm from './view/bookingConfirm';
import 'antd/dist/antd.css';
import bookTime from './view/bookTime';
import index from './view/index'
// import Header from './component/header'


class App extends React.Component {

    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={index} />
                        <Route path="/selectRoom" component={selectRoom} />
                        <Route path="/bookTime" component={bookTime} />
                        <Route path="/login" component={login} />
                        <Route path="/bookingConfirm" component={bookingConfirm} />
                        <Route />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default App;

