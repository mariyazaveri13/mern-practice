const express = require('express')

const Exercises = require('../model/Exercise')
const Users = require('../model/Users')

const router = express.Router()

router.get('/exe/:userName', async (req,res)=>{
    try {

        const userName = req.params.userName

        const user = await Users.findOne({userName:userName})

        if(!user){
            return res.status(404).json({
                message:"No user found with this user name"
            })
        }

        const sortObj = {}
        const searchObj={}

        const { searchByDescription , sortByDuration ,searchByType, gtDuration, ltDuration } = req.query

        if(searchByDescription){
            searchObj.description = new RegExp(searchByDescription,'i')
        }

        if(sortByDuration == 'asc'){
            searchObj.duration = 1
        }
        else if(sortByDuration == 'desc'){
            searchObj.duration = -1
        }

        if(searchByType){
            let type = searchByType.split(',')
            searchObj.type = {
                $in:type
            }
        }

        if(gtDuration || ltDuration){
            const gtlt={}
            if(gtDuration)
            {
                gtlt.$gt = gtDuration
            }
            if(ltDuration){
                gtlt.$lt = ltDuration
            }
            searchObj.duration = gtlt
        }
        

        const exercises = await Exercises.collation({locale:'en'}).sort(sortObj).find(searchObj)

        res.status(200).json({
            message:"Ok",
            count:exercises.length,
            exercises
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

router.post('/exe/:userName', async (req,res)=>{
    try {
        
        let userName = req.params.userName
        
        const data = await Users.findOne({userName:userName})

        if(!data){
            return res.status(404).json({
                message:"User does not exist"
            })
        }

        req.body.type = req.body.type.split(',')

        const newData = await Exercises.create(req.body)

        res.status(201).json({
            message:"Exercise created"
        })

    } catch (error) {
     res.status(400).json({
        message:error.message
     })   
    }
})

router.patch('/exe/:id',async (req,res)=>{
    try {
        let id = req.params.id
        const oldData = await Exercises.findById(id)

        if(!oldData){
            return res.status(404).json({
                message:"Data not found for provided ID"
            })
        }

        const data = await Exercises.findByIdAndUpdate(id,req.body,{runValidators:true})

        res.status(200).json({
            message:"Data updated"
        })


    } catch (error) {
     res.status(400).json({
        message:error.message
     })   
    }
})

router.delete('/exe/:id', async (req,res)=>{
    try {
        let id = req.params.id
        const oldData = await Exercises.findById(id)

        if(!oldData){
            return res.status(404).json({
                message:"No data found"
            })
        }

        await Exercises.findByIdAndDelete(id)

        res.status(200).json({
            message:"Data deleter"
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

module.exports = router
