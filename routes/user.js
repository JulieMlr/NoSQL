const express=require('express')
const router=express.Router()

const User=require('../models/Users')

// Route pour créer un nouvel user
router.post("/",(req,res)=>{
    const {name, surname, email, password, projectLiked, projectParticipated}=req.body
    const newUser=new User({
        name, surname, email, password, projectLiked, projectParticipated
    })
    newUser.save()
    .then(users=>res.send(users))
    .catch(err=>console.log(err))
})

// Route pour ajouter un projet a la fin d'un tableau (projectLiked et/ou projectParticipated)
router.post("/:_id",(req,res)=>{
    const {_id}=req.params
    const addInfoUser=req.body
    User.findOneAndUpdate({_id},{$push: addInfoUser})
    .then(users=>res.send("user Updated"))
    .catch(err=>console.log(err))
})


// Route pour afficher les users
router.get("/",(req,res)=>{
    User.find().populate({path:"projectLiked", select: ['name', 'description']}) //permet d'afficher seulement le nom et la description du projet
    .then(users=>res.send(users))
    .catch(err=>console.log(err))
})


// Route pour afficher 1 user
router.get("/:_id",(req,res)=>{
    const {_id}=req.params
    User.findOne({_id}).populate({path:"projectLiked", select: ['name', 'description']}) //permet d'afficher seulement le nom et la description du projet
      .then(users=>res.send(users))
    .catch(err=>console.log(err))
})


// Route pour modifier 1 user
router.put("/:_id",(req,res)=>{
    const {_id}=req.params
    const modifyUser=req.body
    User.findOneAndUpdate({_id},{$set: modifyUser})
    .then(users=>res.send("user Updated"))
    .catch(err=>console.log(err))
})


// Route pour supprimer 1 user
router.delete("/:_id",(req,res)=>{
    const {_id}=req.params
    User.findOneAndDelete({_id:_id})
    .then(users=>res.send("success"))
    .catch(err=>console.log(err))
})


module.exports=router
