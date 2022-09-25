const express = require('express')
const router = express.Router()
const Reporter = require('../models/reporter') 
const multer = require('multer')
const auth = require('../middlware/auth')

// ////////
router.post('/signUp',async(req,res)=>{
    try{
        const reporter = new Reporter(req.body)
        await reporter.save()
        const token = reporter.generateToken()
        res.send({reporter,token})
    }
    catch(e){
        res.send(e.message)

    }

})
router.post('/login',auth,async(req,res)=>{
    try {
        const reporter = await Reporter.findByCredentials(req.body.email, req.body.password)
        const token = reporter.generateToken();
        res.send({reporter,token})
        // console.log(reporter)

    }
    catch(e){
        res.send(e.message)

    }
})
router.patch('/login',auth,async(req,res)=>{
    try{
        const _id = req.reporter._id
        const reporter = await Reporter.findByIdAndUpdate(_id,req.body,{
            new:true,
            runValidators:true
        });
        if(!reporter) {
            return res.send('reporter not found')
        }
        res.send(reporter)
    }
    catch(e){
        res.send(e.message)

    }

})
router.delete('/login', auth, async(req, res)=> {
    try{
        const _id = req.reporter._id; 
        const reporter = await Reporter.findByIdAndDelete(_id);
        if(!reporter) return res.send('reporter not found');
        res.send(" deleted......................")
    }
    catch(e){
        res.send(e.message)
    }
});
const upload = multer({
    fileFilter(req,file,cd){
        if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
           return (new Error('please upload image'))
        }
        cd(null,true)
    }
})
router.post('/login/imgUser',auth,upload.single('avatar'),async(req,res)=>{
    try{
        req.reporter.image = req.file.buffer
        await req.reporter.save()
        res.send()
    }
    catch(e){
        res.send(e.message)
    }
})

module.exports = router