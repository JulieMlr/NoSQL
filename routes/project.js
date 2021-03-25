const express=require('express')
const router=express.Router()

const Project=require('../models/Projects')


router.post("/",(req,res)=>{
    const {name, goal, dateStart, dateEnd, categories, autors, description, pictures, videos}=req.body
    const newProject=new Project({
        name, goal, dateStart, dateEnd, categories, autors, description, pictures, videos
    })
    newProject.save()
    .then(projects=>res.send(projects))
    .catch(err=>console.log(err))
})


router.get("/",(req,res)=>{
    Project.find().populate({path:"autors", select: ['name', 'surname']})
    .then(projects=>res.send(projects))
    .catch(err=>console.log(err))
})


router.get("/:_id",(req,res)=>{
    const {_id}=req.params
    Project.findOne({_id}).populate({path:"autors" , select: ['name', 'surname']})
      .then(projects=>res.send(projects))
    .catch(err=>console.log(err))
})


router.put("/:_id",(req,res)=>{
    const {_id}=req.params
    const modifyProject=req.body
    Project.findOneAndUpdate({_id},{$set: modifyProject})
    .then(projects=>res.send("project Updated"))
    .catch(err=>console.log(err))
})


router.delete("/:_id",(req,res)=>{
    const {_id}=req.params
    Project.findOneAndDelete({_id:_id})
    .then(projects=>res.send("success"))
    .catch(err=>console.log(err))
})


module.exports=router
