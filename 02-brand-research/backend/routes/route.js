const express = require('express');
const Brand = require('../model/Brand');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let sortObj = {};
    let searchObj = {};

    let {
      sortBytypeOfBranding,
      sortBydemoIncome,
      gtIncome,
      ltIncome,
      gtTime,
      ltTime,
      searchByName,
    } = req.query;

    let query = Brand.find();

    if (sortBydemoIncome == 'asc') {
      sortObj.demoIncome = 1;
    } else if (sortBydemoIncome == 'desc') {
      sortObj.demoIncome = -1;
    }

    if (sortBytypeOfBranding == 'asc') {
      sortObj.typeOfBranding = 1;
    } else if (sortBytypeOfBranding == 'desc') {
      sortObj.typeOfBranding = -1;
    }
    query = query.collation({ locale: 'en' }).sort(sortObj);

    if (gtIncome || ltIncome) {
      const gtlt = {};

      if (gtIncome) gtlt.$gte = gtIncome;

      if (ltIncome) gtlt.$lte = ltIncome;

      searchObj.demoIncome = gtlt;
    }

    if (searchByName) {
      searchObj.brandName = new RegExp(['^', searchByName].join(''), 'i');
    }

    if (gtTime || ltTime) {
      const ltgt = {};

      if (ltTime) {
        let newDate = new Date(ltTime);
        newDate.setDate(newDate.getDate() + 1);

        ltgt.$lte = newDate;
      }
      if (gtTime) {
        ltgt.$gte = new Date(gtTime);
      }

      searchObj.createdDate = ltgt;
    }

    query = query.find(searchObj);

    const results = await query;
    return res.status(200).json({
      count: results.length,
      message: 'Ok',
      results,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    let { competitors, designPersona, howDidTheyFindYou, services } = req.body;

    req.body.competitors = competitors.split(',');
    req.body.designPersona = designPersona.split(',');
    req.body.howDidTheyFindYou = howDidTheyFindYou.split(',');
    req.body.services = services.split(',');

    const data = await Brand.create(req.body);

    res.status(201).json({
      message: `Created record with ID ${data._id}`,
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

    const oldData = await Brand.findById(id);

    if (oldData) {
      if (req.body.competitors)
        req.body.competitors = req.body.competitors.split(',');
      if (req.body.designPersona)
        req.body.designPersona = req.body.designPersona.split(',');
      if (req.body.howDidTheyFindYou)
        req.body.howDidTheyFindYou = req.body.howDidTheyFindYou.split(',');
      if (req.body.services) req.body.services = req.body.services.split(',');

      req.body.updatedDate = new Date();

      const newData = await Brand.findByIdAndUpdate(id, req.body);

      return res.status(200).json({
        message: 'Data updated successfully',
      });
    }

    return res.status(400).json({
      message: 'No data found with given id',
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
    const oldData = await Brand.findById(id);
    if (oldData) {
      await Brand.findByIdAndDelete(id);
      return res.status(200).json({
        message: 'Data Deleted',
      });
    }
    return res.status(404).json({
      message: `No resource found with id ${id}`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get('/filter', async (req, res) => {
  try {
    const data = await Brand.aggregate([
      {
        $unwind: '$services',
      },
      {
        $group: {
          _id: '$services',
        },
      },
    ]);

    return res.status(200).json({ message: 'Ok', count: data.length, data });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
