/*

DTEK2040 PART 2
Joona Kytöniemi 523008
jnkyto@utu.fi

courses-app
Implementation of Part 2.1 thru 2.3

*/

import React from 'react';
import ReactDOM from 'react-dom';
import Course from "./Course";
import "./index.css"

const course = {
    name: 'Superadvanced web and mobile programming',
    parts: [
        {
            name: 'Basics of React',
            exercises: 8,
            id: 1
        },
        {
            name: 'Using props',
            exercises: 10,
            id: 2
        },
        {
            name: 'Component states',
            exercises: 12,
            id: 3
        }
    ]
}

const App = () => {
    return  (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
