/*

DTEK2040 PART 3
Joona Kytöniemi 523008
jnkyto@utu.fi

phonebook-full
Implementation of Part 3.1 thru 3.12

*/

const mongoose = require("mongoose");

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// console.log(`Env user ID test: ${process.env.USER_ID}\n`)
const url = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_KEY}@${process.env.DB_ADDR}`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person