/*

DTEK2040 PART 2
Joona Kytöniemi 523008
jnkyto@utu.fi

phonebook-front
Implementation of Part 2.4 thru 2.10

*/

import React from 'react';
import axios from "axios";
import NewPersonForm from "./components/NewPersonForm";
import PersonTable from "./components/PersonTable";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newTel: ''
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/persons").then(response => {
            this.setState({persons: response.data})
            console.log("Promise fulfilled - Got data upon component mount!")
        })
    }

    addPerson = (event) => {
        event.preventDefault()
        const nameObj = {
            name: this.state.newName,
            number: this.state.newTel,
            id: this.state.persons.length + 1
        }

        let nameSet = [] /* get only the names of every person in persons */
        this.state.persons.map(person => nameSet.push(person.name))

        if(nameObj.name === '' || nameObj.number === '') {
            alert("Syötä henkilön nimi/puhelinnumero ennen lisäystä!")
        } else if(nameSet.includes(nameObj.name)) {
            alert(`Henkilö nimellä ${nameObj.name} on jo olemassa!`)
        } else {
            axios.post("http://localhost:3001/persons", nameObj).then(() => {
                const persons = this.state.persons.concat(nameObj);
                this.setState({
                    persons: persons,
                    newName: '',
                    newTel: ''
                })
            })
        }
    }

    handleNameInput = event => {
        this.setState({ newName: event.target.value })
    }

    handleTelInput = event => {
        this.setState({ newTel: event.target.value })
    }

    deletePerson = person => {
        if(window.confirm(`Haluatko varmasti poistaa henkilön ${person.name} puhelinluettelosta?`)) {
            axios.delete(`http://localhost:3001/persons/${person.id}`).then(() => {
                axios.get("http://localhost:3001/persons").then(response => {
                    this.setState({persons: response.data})
                    console.log("Promise fulfilled - Got new data upon entry removal!")
                })
            })
        }
    }

    render() {
        const check_persons_existence = () => {
            if(this.state.persons.length > 0)   {
                return (
                    <PersonTable
                        persons={this.state.persons}
                        deletePerson={this.deletePerson}
                    />
                )
            } else return (
                <p>Ei yhtäkään puhelinnumeroa tallennettu.</p>
            )
        }
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <NewPersonForm
                    addPerson = {this.addPerson}
                    handleNameInput = {this.handleNameInput}
                    handleTelInput = {this.handleTelInput}
                    newName = {this.state.newName}
                    newTel = {this.state.newTel}
                />
                <h2>Numerot</h2>
                {check_persons_existence()}
            </div>
        )
    }
}

export default App
