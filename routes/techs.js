const express=require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const fawn=require('fawn')
const {Technician} = require('../models/Technician')
const {Log} = require('../models/Log')
const auth=require('../middlewares/auth')
const admin=require('../middlewares/admin')
const mongoose=require('mongoose')
fawn.init(mongoose);

const router=express.Router();

// @route     POST api/techs
// @desc      Regiter a technician
// @access    Public
router.post(
    '/',
    [
      check('firstname', 'Please add a first name')
        .not()
        .isEmpty(),
        check('lastname', 'Please add a last name')
        .not()
        .isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters',
      ).isLength({min: 6}),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({msg: errors.array()});
      }
  
      const {firstname,lastname, email, password} = req.body;
  
      try {
        let tech = await Technician.findOne({email});
  
        if (tech) {
          return res.status(400).json({msg: 'technician already exists'});
        }
        tech = new Technician({
          firstname,
          lastname,
          email,
          password
        });
  
        const salt = await bcrypt.genSalt(10);
  
        tech.password = await bcrypt.hash(password, salt);
  
        await tech.save();
  
        const payload = {
          tech: {
            id: tech.id,
            isAdmin:tech.isAdmin
          },
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            res.json({token});
          },
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:'Server Error'});
      }
    },
  );

// @route     DELETE api/techs/:id
// @desc      Delete technician with their logs
// @access    Private
router.delete('/:id', [auth,admin], async (req, res) => {
  try {
    let tech = await Technician.findById(req.params.id);

    if (!tech) return res.status(404).json({msg: 'technician not found'});

    new fawn.Task()
    .remove('technicians',{_id:tech._id})
    .remove('logs',{tech:tech})
    .run()


    res.json({msg: 'tech removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
});


// @route     GET api/techs
// @desc      Get all technicians
// @access    Private
router.get('/', [auth], async (req, res) => {
  try {
    if(req.tech.isAdmin){
      const techs = await Technician.find({_id:{$ne: req.tech.id}});
      return res.json(techs);
    }else{
      const techs = await Technician.find({isAdmin:{ $ne: true }});
    return res.json(techs);
    }
    
  } catch (err) {
    console.error(err.message+'get all techs');
    res.status(500).json({msg:'Server Error'});
  }
});


// @route     GET api/techs/:id
// @desc      Get a specific tech
// @access    Private
router.get('/:id', [auth], async (req, res) => {
  try {
    const tech = await Technician.findById(req.params.id)
    if(!tech) res.status(404).json({msg:'tech was not found !'})
    return res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server Error'});
  }
});

module.exports=router