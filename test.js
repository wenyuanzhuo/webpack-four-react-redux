const { Map } = require('immutable');

let data = Map({
    user: false,
})
let a = data.set('user', 'Aaron')

console.log(a.get('user'))

  