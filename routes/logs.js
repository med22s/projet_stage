const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const {Technician} = require('../models/Technician')
const {check, validationResult} = require('express-validator');

const Log = require('../models/Log');

// @route     GET api/logs
// @desc      Get all technician logs
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    if(req.tech.isAdmin){
      const logs = await Log.find().sort({
        date: -1,
      });
      return res.json(logs);
    }else{
      const logs = await Log.find({techid:req.tech.id}).sort({
        date: -1,
      });
      return res.json(logs);
    }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
});

// @route     POST api/logs
// @desc      Add new log
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('message', 'Please include a valid message').isString().not().isEmpty(),
      check('attention', 'attention is required').isBoolean().not().isEmpty(),
      check('tech', 'tech is required').isObject().not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({msg: errors.array()});
    }

    const {message,attention,tech} = req.body;

    // const techObj=await Technician.findById(tech)
    // if(!techObj) return res.status(400).json({msg:'tech was not found !'})



    try {
      const newLog = new Log({
        message,
        attention,
        tech
      });

      const log = await newLog.save();

      return res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({msg:'Server Error'});
    }
  },
);

// @route     PUT api/logs/:id
// @desc      Update log
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {message,attention,tech} = req.body;

  // Build log object
  const logFields = {};
  if (message) logFields.message = message;
  logFields.attention = attention;
  if(tech) logFields.tech=tech;
  logFields.date = Date.now();

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({msg: 'log not found'});

    // const techObj=await Technician.findById(tech)
    // if(!techObj) return res.status(400).json({msg:'tech was not found !'})

    // logFields.tech=techObj

    // Make sure tech owns log
    if (!req.tech.isAdmin && log.tech._id.toString() !== req.tech.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    log = await Log.findByIdAndUpdate(
      req.params.id,
      {$set: logFields},
      {new: true}
    );

    return res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
});

// @route     DELETE api/logs/:id
// @desc      Delete log
// @access    Private
router.delete('/:id', [auth,admin], async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({msg: 'log not found'});


    await Log.findByIdAndRemove(req.params.id);

    res.json({msg: 'log removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
});

module.exports = router;
