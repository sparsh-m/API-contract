const express = require('express')
const router = express.Router()
const Program = require('../models/program')
const User = require('../models/user')
const Outlet = require('../models/outlet')
const isAuth = require('../middleware/is-auth');

//Query all outlets with the same outlet_code
router.post(
    '/outlets',
    isAuth,
    (req,res)=>{
      const queried_code = req.body.outlet_code;
      Outlet.find({outlet_code: queried_code})
      .then(outlets => {
        res.status(200).json({
          status: "OK",
          data: outlets,
        });
      }).catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
    }
);

//POST method to save programs belonging to a specific outlet_id
router.post(
    '/visits',
    isAuth,
    (req,res)=>{
      const programs = req.body.programs;
      programs.forEach((program)=>{
        const id = program['id'];
        const image_url = program['image_url'];
        const outlet_id = req.body.outlet_id;
        Outlet.findOne({outlet_id: outlet_id}).then(outlet=>{
            const outlet__id = outlet._id;
            const program = new Program({
                id: id,
                image_url: image_url,
                outletref: outlet__id
            })
            program.save()
            .then(result => {
                return Outlet.findById(req.userId);
              })
              .then(outlet => {
                creator = user;
                outlet.programs.push(program);
                return outlet.save();
              })
              .then(result => {
                res.status(201).json({
                  status: 'OK',
                  data: "visit submitted successfully",
                });
              })
              .catch(err => {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }
                next(err);
              });
        }).catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
      })
    }
);

module.exports = router;
