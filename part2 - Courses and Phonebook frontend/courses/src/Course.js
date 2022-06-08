/*

DTEK2040 PART 2
Joona Kytöniemi 523008
jnkyto@utu.fi

courses-app
Implementation of Part 2.1 thru 2.3

*/

import React from "react";

const Header = ({course_name}) => {
    return  (
        <header>
            <h1>{course_name}</h1>
        </header>
    )
}

const Part = ({part}) => {
    return  (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Contents = ({parts}) => {
    const entries = () => parts.map(part =>
        <Part part={part} key={part.id} />
    )
    return  (
        <div>{entries()}</div>
    )
}

const Total = ({parts}) => {
    let count = 0
    parts.map(part => count += part.exercises)
    return  (
        <div>
            <p>Total: {count}</p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course_name={course.name} />
            <Contents parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
