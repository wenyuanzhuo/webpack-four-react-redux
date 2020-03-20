const Mongoose = require('mongoose')

const db = Mongoose.connect('mongodb://127.0.0.1/node-login')

// const Cat = Mongoose.model('Cat', { name: String })

// const kitty = new Cat({
//   name: 'aaron'
// })

// kitty.save(function(err) {
//   if (err) {
//     console.error('save error:', err)
//   }
//   console.log('save success')
// })