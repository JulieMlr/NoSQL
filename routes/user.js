const express=require('express')
const router=express.Router()

const User=require('../models/Users')


router.post("/",(req,res)=>{
    const {name, surname, email, password, projectLiked, projectParticipated}=req.body
    const newUser=new User({
        name, surname, email, password, projectLiked, projectParticipated
    })
    newUser.save()
    .then(users=>res.send(users))
    .catch(err=>console.log(err))
})

router.post("/:_id",(req,res)=>{
    const {_id}=req.params
    const addInfoUser=req.body
    User.findOneAndUpdate({_id},{$push: addInfoUser})
    .then(users=>res.send("user Updated"))
    .catch(err=>console.log(err))
})


router.get("/",(req,res)=>{
    User.find().populate({path:"projectLiked", select: ['name', 'description']})
    .then(users=>res.send(users))
    .catch(err=>console.log(err))
})


router.get("/:_id",(req,res)=>{
    const {_id}=req.params
    User.findOne({_id})
      .then(users=>res.send(users))
    .catch(err=>console.log(err))
})


router.put("/:_id",(req,res)=>{
    const {_id}=req.params
    const modifyUser=req.body
    User.findOneAndUpdate({_id},{$set: modifyUser})
    .then(users=>res.send("user Updated"))
    .catch(err=>console.log(err))
})


router.delete("/:_id",(req,res)=>{
    const {_id}=req.params
    User.findOneAndDelete({_id:_id})
    .then(users=>res.send("success"))
    .catch(err=>console.log(err))
})


module.exports=router
