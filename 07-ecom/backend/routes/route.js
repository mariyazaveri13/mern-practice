const { model } = require('mongoose')
const Model = require('../model/Model')
const express = require('express')

const productRouter = express.Router()

productRouter.get('/',async (req,res)=>{
    try {
        
        let query = Model.find()
        let searchObj={}
        let sortObj = {}

        let { sortByProduct,searchByCat,searhByName } = req.query

        if(sortByProduct == 'asc'){
            sortObj.productName = 1
        }else if(sortByProduct == 'desc'){
            sortObj.productName = -1
        }

        if(searchByCat){
            searchObj.category = new RegExp(searchByCat,'i')
        }

        if(searhByName){
            searchObj.productName = new RegExp(searhByName,'i')
        }

        const data = await query.collation({locale:'en'}).sort(sortObj).find(searchObj)

        return res.status(200).json({
            message:'Ok',
            count:data.length,
            productDetails:data
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

productRouter.post('/', async (req,res)=>{
    try {
        
        let data = await Model.create(req.body)

        res.status(201).json({
            message:`Created with id ${data._id}`
        })

    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

productRouter.patch('/:id',async (req,res)=>{
    try {
        let id = req.params.id

        req.body.updatedAt = new Date()

        const oldData = await Model.findById(id)

        if(!oldData){
            return res.status(401).json({
                message:'No data found'
            })
        }

        const data = await Model.findByIdAndUpdate(id,req.body,{
            runValidators:true,
            new:true
        })

        res.status(200).json({
            message:"Updated"
        })

    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

productRouter.delete('/:id', async (req,res)=>{
    try {

        let id = req.params.id

        const oldData = await Model.findById(id)

        if(!oldData){
            return res.status(401).json({
                message:'No data found'
            })
        }

        await Model.findByIdAndDelete(id)

        res.status(200).json({
            message:"Deleted"
        })

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

productRouter.get('/stats', async (req,res)=>{
    try {
        console.log('inside')
        //total number of products, average product price, and the category with the most products.

        let group = {
            $group:{
                _id:null,
                totalNumOfProducts:{$sum:1},
                avgProdPrice:{$avg:'$price'},
                // cat:{$push:'$category'}
            }
        }

        // let unwind = {
        //     $unwind:'$cat'
        // }

        // let sortByCat = {
        //     $sortByCount:'$cat'
        // }

        // let limit = {
        //     $limit : 3
        // }

        let project = {
            $project:{
                totalNumOfProducts:1,
                avgProdPrice:1,
                // mostProdCat:1
            }
        }

        let pipeline = [group,project]

        const data = await Model.aggregate(pipeline)

        res.status(200).json(data)

    } catch (error) {
        res.json({message:error.message})
    }
})

module.exports = productRouter