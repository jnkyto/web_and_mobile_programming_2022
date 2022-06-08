/*

DTEK2040 PART 3
Joona Kytöniemi 523008
jnkyto@utu.fi

phonebook-front
Implementation of 3.1 thru 3.12

*/

import React from "react";

const NewPersonForm = ({addPerson, handleNameInput, handleTelInput, newName, newTel}) =>  {
    return (
        <div>
            <form onSubmit={addPerson}>
                <table>
                    <tbody>
                        <tr>
                            <td>Nimi:</td>
                            <td><input value={newName} onChange={handleNameInput} /></td>
                        </tr>
                        <tr>
                            <td>Puhelin:</td>
                            <td><input value={newTel} onChange={handleTelInput}/></td>
                        </tr>
                        <tr>
                            <td><button type="submit">Lisää</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default NewPersonForm
