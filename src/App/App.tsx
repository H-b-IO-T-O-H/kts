import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {PrivateRoute} from "@utils/privateRoute"
import Header from "@components/Header";
import {Urls} from "@config/urls"
import Timetable from "../pages/Timetable";
import Auth from "../pages/Authorization";
import NotFoundPage from "../pages/NotFound";
import Home from "../pages/Home";
import UsersControl from "../pages/UsersControl";
import "../styles/main.scss"
import "../styles/fontawesome-free-5.15.3-web/css/all.min.css"


// const App = () => {
//     return (
//         <BrowserRouter>
//             <div className="App h-100">
//                 <Header/>
//                 <Switch>
//                     <PrivateRoute exact path={Urls.root}
//                                   component={Home}/>
//                     <PrivateRoute exact path={Urls.timetable.slugRoot}
//                                   component={Home}/>
//                     <PrivateRoute exact path={Urls.timetable.slugEdit}
//                                   component={Timetable}/>
//                     <PrivateRoute exact path={Urls.panel.slugRoot}
//                                   component={UsersControl}/>
//                     <Route exact path={Urls.auth} component={Auth}/>
//                     <Route path={Urls.notFound} component={NotFoundPage}/>
//                 </Switch>
//             </div>
//         </BrowserRouter>
//     )
// }

const App = () => {
    return (
        <BrowserRouter>
            <div className="App h-100">
                <Header/>


                <Route exact path={Urls.panel.slugRoot}
                              component={UsersControl}/>

            </div>
        </BrowserRouter>
    )
}

// const App = () => {
//     return (
//         <BrowserRouter>
//             <div className="App h-100">
//                 <Header/>
//                 <UsersControl/>
//             </div>
//         </BrowserRouter>
//     )
// }

export default App;

//https://github.com/ktsstudio/kts-school-frontend