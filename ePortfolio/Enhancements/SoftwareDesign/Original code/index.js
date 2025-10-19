const express = require('express');
const router = express.Router();
const ctrlTraveller = require('../controllers/traveller');
//const ctrlTrips = require('../controllers/trips');
const { travel } = require('../controllers/trips');

router.get('/', ctrlTraveller.homelist);
router.get('/about', ctrlTraveller.about);
//router.get('/trips', ctrlTrips.tripsList);
console.log(typeof travel); 
router.get('/trips', travel);

module.exports = router;
