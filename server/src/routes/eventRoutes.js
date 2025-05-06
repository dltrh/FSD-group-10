const express = require('express');

const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAllEvents);
// router.get('/events', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);

router.put('/finish/:id', eventController.finishEvent);
router.put('/:id', eventController.updateEvent);

module.exports = router;