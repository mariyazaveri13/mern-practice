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

        req.body.type = req.body.type.split(',')

        req.body.updatedAt = new Date()

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
            message:"Data deleted"
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

/***
 * For users individual: create a new route entirely for on click of user that shows some kind of stats
 * 
 * For users leaderboard (main route only but sort by total duration of each users) 
 * : create an aggregator that kinda shows who did what and max
 * 
 * on delete of user, first delete all exercises related to that user and then delete the user himself
 * 
 */

router.get('/userAnalytics/:id', async (req,res)=>{
    try {
        
        let id = req.params.id

        const userData = await Users.findById(id)

        if(!userData){
            return res.status(404).json({
                message:'No user exists with your ID'
            })
        }
        
        /***
         * Total duration of his exercise 
         * Highest 3 durations of exercise
         * Most performed type of exercise
         */

        const data = await Exercises.aggregate([
            {
                $match:{
                    userName:userData.userName,
                    totalDuration:{
                        $sum:'$duration'
                    }
                },
                $project:{
                    totalDuration:1,
                    userName:1
                }
            },
        ])

        const top3Data = await Exercises.find({userName:userData.userName}).sort({duration:-1}).limit(3)

        const mostPerformedExercises = await Exercises.aggregate([
            {
                $unwind:'$type'
            },
            {
                $group:{ _id:'$type', totalCount : {count:{ $sum: 1}}}
            },
            {
                $sort:{ totalCount:-1 }
            }
        ])
        
        const finalObj = {
            totalDuration : data,
            top3Data,
            mostPerformedExercises
        }

        res.status(200).json({
            message:'Ok',
            finalObj
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

router.get('/users',async (req,res)=>{
    try {
        
        const data = await Exercises.aggregate([
            {
                $group:{
                    _id:'$userName',
                    totalDuration :{ $sum: '$duration' }
                },
            },{
                $sort:{
                    totalDuration : -1
                }
            }
        ])

        res.status(200).json({
            message:"Ok",
            count:data.length,
            data
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

router.post('/users', async (req,res)=>{
    try {
        
        const data = await Users.create(req.body)

        res.status(201).json({
            message:`User created with ID : ${data._id} and UserName : ${data.userName}`
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

router.patch('/users/:id',async (req,res)=>{
    try {

        let id = req.params.id

        const oldData = await Users.findById(id)

        if(!oldData){
            return res.status(404).json({
                message:'No data found with provided ID'
            })
        }

        req.body.updatedAt = new Date()

        const data = await Users.findByIdAndUpdate(id,req.body)

        res.status(200).json({
            message:"Data updated boiis"
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})


router.delete('/users/:id', async (req,res)=>{
    try {
        let id = req.params.id
        
        const oldData = await Users.findById(id)

        if(!oldData){
            return res.status(404).json({
                message:"No data found with given ID"
            })
        }

        await Exercises.deleteMany({userName:oldData.userName})

        await Users.findByIdAndDelete(id)

        res.status(200).json({
            message:"Data deleted from users table and exercise table"
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

module.exports = router
