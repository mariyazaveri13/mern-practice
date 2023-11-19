const express = require('express');
const Person = require('../model/Person');
const Manager = require('../../../01-manager-evaluation/backend/model/Manager');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sortObj = {};
    const searchObj = {};

    const {
      sortByName,
      sortByAge,
      searchByEmail,
      searchByName,
      gtAge,
      ltAge,
      gtCreatedDate,
      ltCreatedDate,
      filterByGender,
    } = req.query;

    let query = Person.find();

    if (sortByName == 'asc') {
      sortObj.name = 1;
    } else if (sortByName == 'desc') {
      sortObj.name = -1;
    }

    if (sortByAge == 'asc') {
      sortObj.age == 1;
    } else if (sortByAge == 'desc') {
      sortObj.age == -1;
    }

    if (searchByEmail) {
      searchObj.email = searchByEmail;
    }

    if (searchByName) {
      searchObj.name = new RegExp(searchByName, 'i');
    }

    if (gtAge || ltAge) {
      const gtlt = {};
      if (gtAge) {
        gtlt.$gte = gtAge;
      }
      if (ltAge) {
        gtlt.$lte = ltAge;
      }
      searchObj.age = gtlt;
    }

    if (gtCreatedDate || ltCreatedDate) {
      const gtlt = {};
      if (gtCreatedDate) {
        gtlt.$gte = new Date(gtCreatedDate);
      }
      if (ltCreatedDate) {
        let d = new Date(ltCreatedDate);
        d.setDate(d.getDate() + 1);
        gtlt.$lte = d;
      }
      searchObj.createdDate = gtlt;
    }

    if (filterByGender) {
      searchObj.gender = filterByGender;
    }

    const data = await query
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
    if (req.body.age > 10) {
      return res.status(400).json({
        message: 'Age should be greater than 10',
      });
    }

    if (!req.body.name.test(/^[a-zA-Z ]$/)) {
      return res
        .status(400)
        .json({ message: 'Name should only contain words' });
    }

    if (!req.body.age.test(/^[0-9]$/)) {
      return res.status(400).json({
        message: 'Age should only have letters',
      });
    }
    if (req.body.hobbies) {
      req.body.hobbies = req.body.hobbies.split(',');
    } else {
      return res.status(400).json({
        message: 'Hobbies should not be empty',
      });
    }

    const { paper1, paper2, paper3 } = req.body;

    req.body.totalMarks = Number(paper1) + Number(paper2) + Number(paper3);

    const data = await Person.create(req.body);
    res.status(201).json({ message: `Data created with id ${data._id}` });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const oldData = await Person.findById(id);
    if (!oldData) {
      return res.status(404).json({
        message: 'Data not found',
      });
    }

    const { paper1, paper2, paper3 } = req.body;

    req.body.totalMarks = Number(paper1) + Number(paper2) + Number(paper3);

    if (req.body.hobbies) req.body.hobbies = req.body.hobbies.split(',');

    const data = await Person.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
      message: 'Data updated',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const oldData = await Person.findById(id);
    if (!oldData) {
      return res.status(404).json({
        message: 'Data not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

modlue.exports = router;
