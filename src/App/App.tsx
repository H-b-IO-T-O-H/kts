import React from 'react';
import Timetable from "./pages/Timetable";
import "./App.scss"
//import Header from "@components/Header";
import Auth, {DefaultCheckLogin} from "./pages/authorization";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PrivateRoute} from "@utils/privateRoute"
import NotFoundPage from "./pages/notFound";
import {Urls} from "@config/urls"

const App = () => {
    return (
        <BrowserRouter>
            <div className="App h-100">
                <Switch>
                    <PrivateRoute exact path={Urls.root} authMethod={DefaultCheckLogin} component={() => (<div>HOME</div>)}/>
                    <PrivateRoute exact path={Urls.home} authMethod={DefaultCheckLogin} component={() => (<div>HOME</div>)}/>
                    <PrivateRoute exact path={Urls.timetableCreate} authMethod={DefaultCheckLogin} component={Timetable}/>
                    <Route exact path={Urls.auth} component={Auth}/>
                    <Route path={Urls.notFound} component={NotFoundPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;

//https://github.com/ktsstudio/kts-school-frontend