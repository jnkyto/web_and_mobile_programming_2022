/*

DTEK2040 PART 3
Joona Kytöniemi 523008
jnkyto@utu.fi

phonebook-front
Implementation of Part 3.1 thru 3.12

*/

import React from "react";

const PersonTable = ({persons, deletePerson}) => {
    return (
        <div>
            <table>
                <tbody>
                {persons.map(person =>
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td><button onClick={() => deletePerson(person)}>Poista</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default PersonTable
