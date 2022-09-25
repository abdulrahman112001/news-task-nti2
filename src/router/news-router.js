const express = require('express')
const router = express.Router()
const News = require('../models/news')
const auth = require('../middlware/auth')
const multer = require('multer')

router.post('/login/news',auth,async(req,res)=>{
    try{
        
        const task = new News({...req.body,reporter:req.reporter._id,name:req.reporter.name,email:req.reporter.email})
        await task.save()
        res.send(task).date
    }
    catch(e){
        res.send(e.message)

    }
})
router.patch('/login/news',auth,async(req,res)=>{
    try{
        const titles = req.body.title;
        const news = await News.findOneAndUpdate({titles, reporter:req.reporter._id}, req.body,  {
            new: true,
            runValidators: true
        });
        if(!news) return res.send('news not found');
        res.send(news)
    }
    catch(e){
        res.send(e.message)
    }
})

router.delete('/login/news', auth, async(req, res)=> {
    try{
        const titles = req.body.title;
        const news = await News.findOneAndDelete({titles, reporter:req.reporter._id});
        if(!news) return res.send('news is  not found');
        res.send('news is  deleted ....................')
    }
    catch(e){
        res.send(e.message)
    }
});

const upload = multer({
    fileFilter(req,file,cd){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
           return (new Error('please upload image'))
        }
        cd(null,true)
    }
})
router.post('/login/news/img',auth,upload.single('avatar'),async(req,res)=>{
    try{
        const _id = req.params.id;
        const news = await News.findOne({_id, reporter:req.reporter._id});        
        news.image = req.file.buffer;
        await news.save();
        if(!news) return res.send('errrrrrrror');
        res.send(news)
    } catch(e){
        res.send(e.message)
    }
})

module.exports = router