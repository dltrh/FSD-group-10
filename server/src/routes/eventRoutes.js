const express = require('express');

const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middleware/upload.js');

// Search function in Header
router.get("/search", eventController.searchEvents);

router.get('/', eventController.getAllEvents);
router.get('/publicEvents', eventController.getPublicEvents);

// router.get('/events', eventController.getAllEvents);
router.get('/hostedByUser', eventController.getEventByEmail);
router.get('/findAttendee/:eventId', eventController.findAttendeeInEvent);
router.get('/:eventId', eventController.getEventById);

router.put('/finish/:id', eventController.finishEvent);
router.put('/:id', eventController.updateEvent);

router.post("/create", upload.single("image"), eventController.createEvent);

// related to event invitations
router.put('/:eventId/attendees/add', eventController.addAttendeeToEvent);
router.put('/:eventId/attendees/remove', eventController.removeAttendeeFromEvent);
router.put('/:eventId/attendees/save', eventController.saveUpdatedAttendeesList);
router.put('/:eventId/unjoin', eventController.unjoinEvent)
router.put('/:eventId/join', eventController.joinEvent)
router.post('/:eventId/notifyAttendees', eventController.notifyAttendeesOfUpdate);


module.exports = router;