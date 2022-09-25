const jwt = require('jsonwebtoken')
// const reporter = require('../router/reporter-router')
const Reporter = require('../models/reporter')

// const auth = async (req,res,next)=>{
//     try{
//         const token = req.header('Authorization').replace('Bearer ',"")
//         console.log(token)
//         const decode = jwt.verify(token,'nodeAPI')   
//         const reporter = await Reporter.findById({_id:decode._id})
//         req.reporter = reporter
//         next()

//     }
//     catch{
//         res.send({error:'please auth'})

//     }
// }

const auth = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");

      const decode = jwt.verify(token, "nodeAPI");
      const reporter = await Reporter.findById({ _id: decode._id })
      req.reporter = reporter;
      next();
    } catch (e) {
      res.send({ Error: "please auth" });
    }
  };
  module.exports = auth;