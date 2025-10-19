const tripsEndpoint = 'http://localhost:3000/api/trips';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const mongoose = require('mongoose');
const Trip = require('../../app_api/models/trips'); 

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const travel = async function(req, res, next) {
  console.log('TRAVEL CONTROLLER BEGIN');
  try {
    const response = await fetch(tripsEndpoint, options);
    let json = await response.json();
    console.log(json);

    let message = null;
    if (!(json instanceof Array)) {
      message = 'API lookup error';
      json = [];
    } else {
      if (!json.length) {
        message = 'No trips exist in our database!';
      }
    }

    res.render('trips', {
      title: 'Travlr Getaways',
      trips: json,
      message
    });

  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
  console.log('TRAVEL CONTROLLER AFTER RENDER');
};

module.exports = {
  travel
};
