const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('mongoose-type-email')

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  email:{
    type:mongoose.SchemaTypes.Email,
  },
  contactPerson: String,
  interestRate: Number,
  term: String,
  motto: String,
  contactNumber: String,
  raisedMoney: {
    amount: Number,
    currency: String,
  },
  preCommittedMoney: {
    amount: Number,
    currency: String,
  },
  targetAmountOfMoney: {
    amount: Number,
    currency: String,
  },
  valuation: {
    amount: Number,
    currency: String,
  },
  sharePrice: {
    amount: Number,
    currency: String,
  },
  tags: [String],
  location: String,
  img: String,

})

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

projectSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Project', projectSchema)

