const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middlewares/auth');
const {check, validationResult} = require('express-validator');

const {Technician} = require('../models/Technician');

// @route     GET api/auth
// @desc      Get logged in technician
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const tech = await Technician.findById(req.tech.id).select('-password');
    return res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'server error'});
  }
});

// @route     POST api/auth
// @desc      Auth technician & get token
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({msg: errors.array()});
    }

    const {email, password} = req.body;

    try {
      let tech = await Technician.findOne({email});

      if (!tech) {
        return res.status(400).json({msg: 'Invalid Credentials'});
      }
      const isMatch = await bcrypt.compare(password, tech.password);

      if (!isMatch) {
        return res.status(400).json({msg: 'Invalid Credentials'});
      }

      const payload = {
        tech: {
          id: tech._id,
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

module.exports = router;