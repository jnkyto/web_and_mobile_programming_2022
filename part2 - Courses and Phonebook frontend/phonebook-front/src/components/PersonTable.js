/*

DTEK2040 PART 2
Joona Kytöniemi 523008
jnkyto@utu.fi

phonebook-front
Implementation of Part 2.4 thru 2.10

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
