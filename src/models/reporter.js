const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { isValidPassword } = require('mongoose-custom-validators')

const ReporterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true 
    },
    age:{
        type:Number,
        default:21,
        trim:true,
        validate(value){
            if(value < 0){
                throw new Error('age must be larger 0')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new  Error('email not invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        validate: {
            validator: isValidPassword,
            message: 'Password must have at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
          }
    },
    Phone:{
        type:Number,
        trim:true,
        // required:true,
        minlength:12,
        validate: {
            validator: function (v) {
              return /^(010|011|012)$/.test(v);
            },
            message: "must be phone number  egypt",
          },
    },
    image:{
        type:Buffer
    }
})

ReporterSchema.pre('save',async function(){
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password,8)   }
})

ReporterSchema.statics.findByCredentials =async(email,password)=>{
    const reporter = await Reporter.findOne({email})
    console.log(reporter)
    if(!reporter){
        throw new Error ('no reporter is found')
    }
    const isMatch = await bcryptjs.compare(password,reporter.password)
    if(!isMatch){
        throw new Error ('password error')
    }
    return reporter
}
ReporterSchema.methods.generateToken = function(){
    const token = jwt.sign({_id: this._id.toString()}, 'nodeAPI')
    return token
}

const Reporter = mongoose.model('Reporter',ReporterSchema)

module.exports = Reporter