import React, {Component} from 'react';
import {Timetable} from "./timetable";


export class App extends Component {

    render() {
        return (
            <div className="App h-100 ">
                <Timetable/>
            </div>
        )
    }
}

export default App;
