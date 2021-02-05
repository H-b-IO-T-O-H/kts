import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'

const App = () => {
    return (
        <div className="App h-100 d-flex align-items-center justify-content-center text-center">
            <div className="Auth">
                <FontAwesomeIcon icon={faCoffee}/>
            </div>
        </div>
    )
}

export default App;
