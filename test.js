let users = [
    {
        name: 'Ashraf',
        age: 19
    },
    {
        name: 'Bola',
        age: 17
    },
    {
        name: 'Shade',
        age: 32
    },
    {
        name: 'Daniel',
        age: 20
    }

]

const name = 'Daniel'

let index = users.findIndex(e=>e.name===name)

console.log(index)