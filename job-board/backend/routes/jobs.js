const express = require('express');
const Jobs = require('../model/Jobs');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let query = Jobs.find();

    let {
      searchByTitle,
      sortBySalary,
      sortByLocation,
      startSalary,
      endSalary,
    } = req.query;

    const searchObj = {};
    const sortObj = {};

    if (searchByTitle) {
      searchObj.jobTitle = new RegExp(['^', searchByTitle].join(''), 'i');
    }

    if (sortBySalary == 'asc') {
      sortObj.jobSalary = 1;
      query = query.sort(sortObj);
    } else if (sortBySalary == 'desc') {
      sortObj.jobSalary = -1;
      query = query.sort(sortObj);
    }

    if (sortByLocation == 'asc') {
      sortObj.jobLocation = 1;
      query = query.collation({ locale: 'en' }).sort(sortObj);
    } else if (sortByLocation == 'desc') {
      sortObj.jobLocation = -1;
      query = query.collation({ locale: 'en' }).sort(sortObj);
    }

    if (startSalary || endSalary) {
      const gtlt = {};
      if (startSalary) {
        gtlt.$gte = startSalary;
        searchObj.jobSalary = gtlt;
      }
      if (endSalary) {
        gtlt.$lte = endSalary;
        searchObj.jobSalary = gtlt;
      }
    }

    query = query.find(searchObj);

    const data = await query;

    return res.status(200).json({
      message: 'Ok',
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const skillsSet = req.body.skillsSet.split(',');
    req.body.skillsSet = skillsSet;
    const data = await Jobs.create(req.body);
    return res.status(201).json({
      message: `Created with ID ${data._id}`,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const oldData = await Jobs.findById(id);
    if (oldData) {
      req.body.updatedAt = new Date();
      const newData = await Jobs.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
      });
      return res.status(200).json({
        message: 'Data updated',
      });
    } else {
      return res.status(400).json({
        message: 'No data found for given id',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const oldData = await Jobs.findById(id);
    if (oldData) {
      const newData = await Jobs.findByIdAndDelete(id);
      return res.status(200).json({
        message: 'Data deleted',
      });
    } else {
      return res.status(400).json({
        message: 'No data found for given id',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
