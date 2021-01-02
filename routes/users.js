const express = require('express');
const User = require('../models/User');
const router = express.Router({ mergeParams: true });
const advancedResults = require('../middleware/advancedResult');

const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers)
router.route('/').post(createUser);


router.route('/:id').get(getUser)
router.route('/:id').put(updateUser)
router.route('/:id').delete(deleteUser);

module.exports = router;