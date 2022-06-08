/*

DTEK2040 PART 3
Joona Kytöniemi 523008
jnkyto@utu.fi

phonebook-full
Implementation of Part 3.1 thru 3.12

*/

const express = require('express')
const bodyParser = require('body-parser')
const Person = require('./models/person')

const app = express()
app.use(bodyParser.json())
app.use(express.static('build'))

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(formatPerson))
    }).catch(error => {
        console.log(error)
        res.status(404).send({error: "Couldn't load persons"})
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(formatPerson(person))
    }).catch(error => {
        console.log(error)
        res.status(404).send({error: "Malformatted ID"})
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end()
    }).catch(error => {
        console.log(error)
        res.status(400).send({error: "Malformatted ID"})
    })
})

app.post('/api/persons', (req, res) => {
    if(req.body.name === undefined || req.body.name === "")   {
        return res.status(400).json({error: "Name of person is missing"})
    } else if(req.body.number === undefined || req.body.number === "")    {
        return res.status(400).json({error: "Number of person is missing"})
    }

    const person = new Person({
        name: req.body.name,
        number: req.body.number,
    })

    person.save().then(savedPerson => {
        res.json(formatPerson(savedPerson))
    }).catch(error => console.log(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})