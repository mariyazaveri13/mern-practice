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

        const { searchByDescription , sortByDuration ,searchByType } = req.query

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

module.exports = router
