import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import {Switch, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>
        </div>
    );
}

export default App;
