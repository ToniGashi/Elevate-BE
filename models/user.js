const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('mongoose-type-email')

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email:{
    type:mongoose.SchemaTypes.Email,
    unique:true
  },
  passwordHash: String,
}
,{ timestamps: true })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)

