const express = require('express');

const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middleware/upload.js');


router.get('/', eventController.getAllEvents);
// router.get('/events', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);

router.put('/finish/:id', eventController.finishEvent);
router.put('/:id', eventController.updateEvent);

router.post("/create", upload.single("image"), eventController.createEvent);

module.exports = router;