const express = require('express');
const Manager = require('../model/Manager');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let query = Manager.find();

    let {
      sortByRating,
      sortByManager,
      searchByName,
      searchByEmail,
      moreThanRating,
      lessThanRating,
    } = req.query;

    const searchObj = {};
    const sortObj = {};

    if (sortByRating == 'asc') {
      sortObj.rating = 1;
    } else if (sortByRating == 'desc') {
      sortObj.rating == -1;
    }

    if (sortByManager == 'asc') {
      sortObj.nameOfManager = 1;
    } else if (sortByManager == 'desc') {
      sortObj.nameOfManager = -1;
    }

    if (searchByName) {
      searchObj.nameOfManager = new RegExp([searchByName].join(''), 'i');
    }
    if (searchByEmail) {
      searchObj.managerEmail = searchByEmail;
    }
    if (moreThanRating || lessThanRating) {
      const gtlt = {};
      if (moreThanRating) {
        gtlt.$gte = moreThanRating;
        searchObj.rating = gtlt;
      }
      if (lessThanRating) {
        gtlt.$lte = lessThanRating;
        searchObj.rating = gtlt;
      }
    }

    query = query.find(searchObj);

    const data = await query.collation({ locale: 'en' }).sort(sortObj);
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

router.get('/:email', async (req, res) => {
  try {
    let email = req.params.email;
    const data = await Manager.find({ managerEmail: email });
    if (data.length > 0) {
      const data = await Manager.aggregate([
        {
          $match: { managerEmail: email },
        },
        {
          $group: {
            _id: email,
            avgRating: { $avg: '$overAllRating' },
          },
        },
      ]);
      return res.status(200).json({
        count: data.length,
        data,
      });
    } else {
      return res.status(400).json({
        message: 'Data requested for the resource not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      workEnvRating,
      responsibilityRating,
      profDev,
      oneToOneRating,
      favoritesRating,
    } = req.body;

    req.body.overAllRating =
      (workEnvRating +
        responsibilityRating +
        profDev +
        oneToOneRating +
        favoritesRating) /
      5;

    const data = await Manager.create(req.body);

    return res.status(201).json({
      message: `Data created with id ${data._id}`,
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
    const oldData = await Manager.findById(id);
    if (oldData) {
      const {
        workEnvRating,
        responsibilityRating,
        profDev,
        oneToOneRating,
        favoritesRating,
      } = req.body;

      req.body.overAllRating =
        (workEnvRating +
          responsibilityRating +
          profDev +
          oneToOneRating +
          favoritesRating) /
        5;

      req.body.updatedAt = new Date();
      const newData = await Manager.findByIdAndUpdate(id, req.body);
      return res.status(200).json({
        message: 'Data updated',
      });
    } else {
      return res.status(404).json({
        message: 'No data found to update',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const oldData = await Manager.findById(id);
    if (oldData) {
      const newData = await Manager.findByIdAndDelete(id);
      return res.status(200).json({
        message: 'Data deleted',
      });
    } else {
      return res.status(400).json({
        message: 'No data found to delete',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
