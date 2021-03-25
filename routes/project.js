const express=require('express')
const router=express.Router()

const Project=require('../models/Projects')

// Route pour ajouter un nouveau projet
router.post("/",(req,res)=>{
    const {name, goal, dateStart, dateEnd, categories, autors, description, pictures, videos}=req.body
    const newProject=new Project({
        name, goal, dateStart, dateEnd, categories, autors, description, pictures, videos
    })
    newProject.save()
    .then(projects=>res.send(projects))
    .catch(err=>console.log(err))
})

// Route pour afficher les projets
router.get("/",(req,res)=>{
    Project.find().populate({path:"autors", select: ['name', 'surname']}) //permet d'afficher seulement le nom et prenom de l'auteur
    .then(projects=>res.send(projects))
    .catch(err=>console.log(err))
})

// Route pour afficher 1 projet selon son id 
router.get("/:_id",(req,res)=>{
    const {_id}=req.params
    Project.findOne({_id}).populate({path:"autors" , select: ['name', 'surname']}) //permet d'afficher seulement le nom et prenom de l'auteur
      .then(projects=>res.send(projects))
    .catch(err=>console.log(err))
})

// Route pour modifier 1 projet
router.put("/:_id",(req,res)=>{
    const {_id}=req.params
    const modifyProject=req.body 
    Project.findOneAndUpdate({_id},{$set: modifyProject}) // On modifie seulement les champs renseignés dans le JSON
    .then(projects=>res.send("project Updated"))
    .catch(err=>console.log(err))
})

// Route pour supprimer 1 projet
router.delete("/:_id",(req,res)=>{
    const {_id}=req.params
    Project.findOneAndDelete({_id:_id})
    .then(projects=>res.send("success"))
    .catch(err=>console.log(err))
})


module.exports=router
