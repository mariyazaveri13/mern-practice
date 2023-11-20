const Student = require('../model/Student');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let query = Student.find();

    const sortObj = {};
    const searchObj = {};

    const {
      sortByName,
      sortByMarks,
      sortByDate,
      searchByName,
      searchByEmail,
      filterByGender,
      gtDate,
      ltDate,
      gtMarks,
      ltMarks,
    } = req.query;

    if (sortByName == 'asc') {
      sortObj.name = 1;
    }
    if (sortByName == 'desc') {
      sortObj.name = -1;
    }

    if (sortByMarks == 'asc') {
      sortObj.totalMarks = 1;
    }
    if (sortByMarks == 'desc') {
      sortObj.totalMarks = -1;
    }

    if (sortByDate == 'asc') {
      sortObj.createdAt = 1;
    }
    if (sortByDate == 'desc') {
      sortObj.createdAt = -1;
    }

    if (searchByEmail) {
      searchObj.email = searchByEmail;
    }

    if (searchByName) {
      searchObj.name = new RegExp(searchByName, 'i');
    }

    if (filterByGender) {
      searchObj.gender = filterByGender;
    }

    if (gtDate || ltDate) {
      const gtlt = {};
      if (gtDate) {
        gtlt.$gte = new Date(gtDate);
      }
      if (ltDate) {
        let d = new Date(ltDate);
        d.setDate(d.getDate() + 1);
        gtlt.$lte = new Date(d);
      }
      searchObj.createdAt = gtlt;
    }

    if (gtMarks || ltMarks) {
      const gtlt = {};

      if (gtMarks) {
        gtlt.$gte = gtMarks;
      }
      if (ltMarks) {
        gtlt.$lte = ltMarks;
      }
      searchObj.totalMarks = gtlt;
    }

    let data = await query
      .collation({ locale: 'en' })
      .sort(sortObj)
      .find(searchObj);

    return res.status(200).json({
      message: 'Ok',
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    req.body.totalMarks =
      Number(req.body.paper1) +
      Number(req.body.paper2) +
      Number(req.body.paper3);

    const data = await Student.create(req.body);

    res.status(201).json({
      message: `Data created with ID ${data._id}`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const oldData = await Student.findById(id);
    if (!oldData) {
      return res.status(404).json({
        message: `Data not found for id ${id}`,
      });
    }
    req.body.totalMarks =
      Number(req.body.paper1) +
      Number(req.body.paper2) +
      Number(req.body.paper3);

    req.body.updatedAt = new Date();

    const newData = await Student.findByIdAndUpdate(id, req.body);
    return res.status(200).json({
      message: 'Data updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const oldData = await Student.findById(id);
    if (!oldData) {
      return res.status(404).json({
        message: `Data not found for ${id}`,
      });
    }
    await Student.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Data deleted successfully ',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
