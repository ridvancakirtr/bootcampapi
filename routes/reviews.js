const express = require('express');
const Review = require('../models/Review');
const router = express.Router({ mergeParams: true });
const advancedResults = require('../middleware/advancedResult');

const { getReviews, getReview, addReview, updateReview, deleteReview } = require('../controllers/reviews');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(advancedResults(Review, { path: 'bootcamp', select: 'name description' }), getReviews)
router.route('/').post(protect, authorize('user', 'admin'), addReview);

router.route('/:id').get(getReview)
router.route('/:id').put(protect, authorize('user', 'admin'), updateReview)
router.route('/:id').delete(protect, authorize('user', 'admin'), deleteReview);

module.exports = router;