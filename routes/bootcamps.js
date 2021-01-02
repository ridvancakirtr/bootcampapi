const express = require('express')
const router = express.Router();

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResult')
const {protect, authorize} = require('../middleware/auth')
const {getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload} = require('../controllers/bootcamps') 

router.route('/').get(advancedResults(Bootcamp,'course'),getBootcamps);

router.route('/:id').get(getBootcamp);

router.route('/').post(protect,authorize('publisher','admin'),createBootcamp);

router.route('/:id').put(protect,authorize('publisher','admin'),updateBootcamp);

router.route('/:id').delete(protect,authorize('publisher','admin'),deleteBootcamp);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//Upload Photo
router.route('/:id/photo').put(protect,authorize('publisher','admin'),bootcampPhotoUpload);

// Include other resource routers
const courseRouter = require('./courses')
const reviewRouter = require('./reviews')

//Re-route into other resource routers
router.use('/:bootcampId/courses',courseRouter);
router.use('/:bootcampId/reviews',reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootcamps);

module.exports = router;