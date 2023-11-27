const Model = require('../model/Model')
const express = require('express')

const productRouter = express.Router()

productRouter.get('/', async (req,res)=>{
    try {
        let sortObj = {}
        let searchObj = {}
        let query = Model.find()

        let {sortByDate,searchByAuthor,filterByCategory} = req.query

        if(sortByDate=='asc'){
            sortObj.publicationDate = 1
        }
        else if(sortByDate=='desc'){
            sortObj.publicationDate =-1
        }

        if(searchByAuthor){
            searchObj.author = new RegExp(searchByAuthor,'i')
        }

        if(filterByCategory){
            searchObj.category = filterByCategory
        }

        const data = await query.collation({locale:'en'}).sort(sortObj).find(searchObj)

        res.status(200).json({
            message:"Ok",
            count:data.length,
            blogs:data
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

productRouter.post('/',async (req,res)=>{
    try {
        
        const data = await Model.create(req.body)
        
        res.status(201).json({
            message:`Created with id ${data._id}`
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

productRouter.patch('/:id',async (req,res)=>{
    try {
        
        let id = req.params.id

        const oldData = await Model.findById(id)

        if(!oldData){
            return res.status(404).json({
                message:"No data found for your id"
            })
        }

        req.body.updatedDate = new Date()

        const data = await Model.findByIdAndUpdate(id,req.body,{
            runValidators:true
        })

        res.status(200).json({
            message:"Data updated"
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

productRouter.delete('/:id',async (req,res)=>{
    try {
        
        let id = req.params.id

        const oldData = await Model.findById(id)

        if(!oldData){
            return res.status(404).json({
                message:"Oops no data found"
            })
        }

        await Model.findByIdAndDelete(id)

        res.status(200).json({
            message:"data deleted!!"
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

productRouter.get('/stats', async (req,res)=>{
    try {
        //category wise num of blogs
        //author wise count of blogs

        let group = {
            $group:{
                _id:'$author',
                count:{$sum :1}
            }
        }
        let project = {
            $project:{
                author:'$_id',
                count:1,
                _id:0
            }
        }

        let pipeline = [group,project]

        const data = await Model.aggregate(pipeline)

        res.status(200).json({
            data
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

module.exports = productRouter