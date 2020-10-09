//
// Object Destructuring
//
const person = {
  // name: 'CJ',
  age: 29,
}

const { name = 'Anon', age } = person
// const name = person.name
// const age = person.age

console.log(`${name} is ${age}`)

const { city, temp: temperature } = person.location

if (city && temperature) {
  console.log(`It's ${temperature} in ${city}`)
}

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
}

const { name: publisherName = 'Self-Published' } = book.publisher

console.log(publisherName)

//
// Array Destructuring
// 

const address = ['123 MyStreet', 'SF', 'CA', '945111']
const [, city, state ] = address
console.log(`You are in ${city}, ${state}.`)

const item = ['Coffee (hot)', '2.00', '2.50', '2.75']
const [ itemName, , mediumPrice ] = item
console.log(`A medium ${itemName} costs ${mediumPrice}`)