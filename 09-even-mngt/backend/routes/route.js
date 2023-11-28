const EventSchema = require('../model/Model')
const express = require('express')

const eventRouter = express.Router()

//write a router to get events
eventRouter.get('/', async (req,res)=>{
    try {
        let query = EventSchema.find()
        let sortObj = {}
        let searchObj ={}
        let {sortByLocation,searchByLocation,filterByDate} = req.query

        if(sortByLocation == 'asc')
        {
            sortObj.location = 1   
        }
        else if(sortByLocation == "desc"){
            sortObj.location = -1
        }

        if(searchByLocation){
            searchObj.location = new RegExp(searchByLocation,'i')
        }

        if(filterByDate){
            searchObj.date = {
                $eq : new Date(filterByDate)
            }
        }

        const data = await query.collation({locale:'en'}).sort(sortObj).find(searchObj)

        res.status(200).json({
            count:data.length,
            message:'Ok',
            eventData:data
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})


//write a router to save details of an event with initial list of attendies
eventRouter.post('/', async (req,res)=>{
    try {
        
        const data = await EventSchema.create(req.body)

        res.status(201).json({
            message: `data created with id ${data._id}`
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

//router to edit an event - this router shall add and edit the sub schema
eventRouter.patch('/:id',async (req,res)=>{
    try {
        let id = req.params.id

        const data = await EventSchema.findByIdAndUpdate(id,req.body,
            {
                new:true,runValidators:true
            })

        if(!data){
            return res.status(404).json({
                message:'data not found'
            })
        }

        res.status(200).json({
            message:'Updated',
            data
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

//router to delete the schema
eventRouter.delete('/:id', async (req,res)=>{
    try {
        let id = req.params.id

        await EventSchema.findByIdAndDelete(id)

        res.status(200).json({
            message:"deleted"
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

module.exports = eventRouter