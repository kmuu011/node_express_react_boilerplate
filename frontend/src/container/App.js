import React from 'react';
import { BrowserRouter as Router,
    Route, Switch } from "react-router-dom";

import Main from "./Main/Main";
import SignUp from "./SignUp/SignUp";

import MyPage from "./Member/MyPage/MyPage";

import NotFound from "components/NotFound/NotFound";

const location = {
    home : "/",
    sign_up : "/sign_up",

    my_page: "/my_page",

    not_found : "/*",
};

function router() {
    return (
        <div className="App-page">
            <Router>
                <Switch>
                    <Route exact path={location.home} component={Main}/>
                    <Route exact path={location.sign_up} component={SignUp}/>
                    <Route exact path={location.my_page} component={MyPage}/>

                    <Route exact path={location.not_found} component={NotFound}/>
                </Switch>
            </Router>
        </div>
    );
}


export default router;
