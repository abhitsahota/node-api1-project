require('dotenv').config()
const express = require('express')
const shortid = require('shortid')
const cors = require('cors')

const server = express()
const port = process.env.PORT || 3030

let users = [
    {
        id: shortid.generate(),
        name: 'bob',
        bio: 'im named bob'
    }
]

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.json({message: 'hello'})
})

server.post('/api/users/', (req, res) => {

    const user = req.body
    user.id = shortid.generate()
    console.log('post : api/users/:id/ : adding a user to the array', user)

    if (user.name && user.bio) {

        try {
            users.push(user)
            res.status(201).json(user)
        } catch {
            res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
        }

    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
})

server.get('/api/users/', (req, res) => {

    try {
        res.status(201).json(users)
    } catch {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }

})

server.get('/api/users/:id', (req, res) => {

    const { id } = req.params
    const user = users.find(u => u.id === id)

    if (user) {
        try {
            res.status(201).json(user)
        } catch {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        }
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    
})

server.delete('/api/users/:id', (req, res) => {

    const { id } = req.params
    const user = users.find(u => u.id === id)

    if (user) {
        try {
            users = users.filter(u => u.id !== id)
            res.status(201).json(user)
        } catch {
            res.status(500).json({ errorMessage: "The user could not be removed" })
        }
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    
})

server.put('/api/users/:id', (req, res) => {

    const { id } = req.params
    const newUser = req.body
    const existingUserIndex = users.findIndex(u => u.id === id)
    console.log(existingUserIndex)

    if (existingUserIndex) {

        if ( user.name && user.bio ) {
            try {
                newUser.id = id
                users[existingUserIndex] = newUser
                res.status(200).json(users)
            } catch {
                res.status(500).json({ errorMessage: "The user information could not be modified." })
            }
        } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    
})

server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})