import {Redirect, Route} from "react-router-dom";
import {Urls} from "@config/urls"
import React from "react";

type Props = {
    component: any;
    path: string;
    exact?: boolean;
    authMethod:() => boolean;
}

export const PrivateRoute: React.FC<Props> = ({component: Component, authMethod, ...rest}) => {
    const authed = authMethod()

    return (
        <Route {...rest}
               render={props => authed ?
                   props.location.pathname === "/" ?
                       <Redirect to={{
                           pathname: Urls.home,
                           state: {from: props.location}
                       }}
                       /> :
                       (<Component {...props} />) :
                   <Redirect to={{
                       pathname: Urls.auth,
                       state: {from: props.location}
                   }}
                   />
               }/>
    )
}