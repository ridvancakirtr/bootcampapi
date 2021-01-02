const express = require('express')
const router = express.Router({ mergeParams: true });

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResult')
const { protect, authorize } = require('../middleware/auth')

const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controllers/courses')

router.route('/').get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
}), getCourses);
router.route('/:id').get(getCourse);
router.route('/').post(protect, authorize('publisher', 'admin'), addCourse);
router.route('/:id').put(protect, authorize('publisher', 'admin'), updateCourse);
router.route('/:id').delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;