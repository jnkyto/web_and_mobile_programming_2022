/*

DTEK2040 PART 3
Joona Kytöniemi 523008
jnkyto@utu.fi

phonebook-cli
Implementation of Part 3.9

*/

require('dotenv').config() // using dotenv to store db user and pass
const mongoose = require('mongoose')

// console.log(`Env user ID test: ${process.env.USER_ID}\n`)
const url = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_KEY}@${process.env.DB_ADDR}`
mongoose.connect(url)

const args = process.argv.slice(2) // store start args in variable, cut off first two (node + path)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)

if(args.length !== 0)    {  // if args were given (name+number) save them to db
    console.log(`Adding person ${args[0]} with number ${args[1]} to the directory...`)
    const person = new Person({
        name: args[0],
        number: args[1],
    })

    person.save().then(res => {
        console.log('Person saved!')
        mongoose.connection.close()
    }).catch(error => console.log(error))
} else  {   // if no args were given, display all names and numbers stored
    console.log("Puhelinluettelo:")
    Person.find({}).then(res => {
        res.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    }).catch(error => console.log(error))
}