const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('mongoose-type-email')

const projectSchema = new mongoose.Schema({
  name: String,
  owner: String,
  website: String,
  company_behind: String,
  history: String,
  team: String,
  patents: String,
  awards: String,
  type: String,
  industry: String,
  vertical: String,
  business_model: String,
  goals: String,
  expectedEnvironmentalImpact: String,
  conditionsForInvestment: String,

  numberOfInvestors_: Number,
  description: String,
  email:{
    type:mongoose.SchemaTypes.Email,
  },
  contactPerson: String,
  interestRate: Number,
  term: String,
  motto: String,
  contactNumber: String,
  minimalInvestmentRequired: {
    amount: Number,
    currency: String,
  },
  timeLeft: Number,
  // Ratios
  pre_money_valuation: {
    amount: Number,
    currency: String,
  },
  typeShareOffered: String,
  interestCoverageRatio: Number,
  debtToCapitalRatio: Number,
  debtToEquityRatio: Number,
  quickRatio: Number,
  currentRatio: Number,
  cashRatio: Number,
  yearReturn: Number,
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
  additionalInformation: String,
  quantitativeInformation: String,

}
,{ timestamps: true })

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

projectSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Project', projectSchema)

