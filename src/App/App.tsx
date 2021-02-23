import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {PrivateRoute} from "@utils/privateRoute"
import Header from "@components/Header";
import {Urls} from "@config/urls"

import Timetable from "../pages/Timetable";
import Auth, {DefaultCheckLogin} from "../pages/Authorization";
import NotFoundPage from "../pages/NotFound";
import Home from "../pages/Home";
import "../styles/main.scss"


const App = () => {
    return (
        <BrowserRouter>
            <div className="App h-100">
                <Header/>
                <Switch>
                    <PrivateRoute exact path={Urls.root} authMethod={DefaultCheckLogin}
                                  component={Home}/>
                    <PrivateRoute exact path={Urls.timetable.slugRoot} authMethod={DefaultCheckLogin}
                                  component={Home}/>
                    <PrivateRoute exact path={Urls.timetable.slugEdit} authMethod={DefaultCheckLogin}
                                  component={Timetable}/>
                    <Route exact path={Urls.auth} component={Auth}/>
                    <Route path={Urls.notFound} component={NotFoundPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;

//https://github.com/ktsstudio/kts-school-frontend