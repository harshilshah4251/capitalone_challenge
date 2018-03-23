const express = require('express')
const router = express.Router()

const { db } = require('../lib/database')



//This request queries the database to return call_type (type of emergency), and the average response time. Here, the average response time is calculated as reponse_timestamp - received_timestamp. At the end, the result is grouped by the emergency.

router.get('/api/emergencyTypeAndResponseTimes', (req, res, next) => {
  db
    .any('SELECT call_type as label, ROUND(((AVG(EXTRACT(EPOCH FROM (response_timestamp - received_timestamp))))/60)::numeric, 2) as data FROM dispatch_table WHERE response_timestamp IS NOT NULL AND received_timestamp IS NOT NULL GROUP BY label;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

//This request queries the database to return the frequency of different emergencies in the san francisco area. 
router.get('/api/sanFranciscoEmergencies', (req, res, next) => {
  db
    .any('SELECT call_type, COUNT(*) FROM dispatch_table WHERE city=\'San Francisco\' GROUP BY call_type;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

//This request queries the database to return all Potentially life threatening emergencies along with als unit value. The result basically shows the number of dispatches carrying ALS units when the emergency was life threatening. 
router.get('/api/alsUnitData', (req, res, next) => {
  db
    .any('SELECT call_type_group, als_unit, COUNT(*) FROM dispatch_table WHERE call_type_group=\'Potentially Life-Threatening\' GROUP BY call_type_group, als_unit;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

//This request gets all the location coordinates from the database
router.get('/api/cityLocationData', (req, res, next) => {
  db
    .any('SELECT latitude, longitude FROM dispatch_table;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

//This request queries the database to return zipcode, and the average dispatch time. Here, the average dispatch time is calculated as dispatch_timestamp - received_timestamp. At the end, the result is grouped by the zipcode.
router.get('/api/longestTimeToDispatch', (req, res, next) => {
  db
    .any('SELECT zipcode_of_incident, (AVG(EXTRACT(EPOCH FROM (dispatch_timestamp - received_timestamp))))/60 as avg_min FROM dispatch_table WHERE response_timestamp IS NOT NULL AND received_timestamp IS NOT NULL GROUP BY zipcode_of_incident ORDER BY avg_min DESC; ')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

//This request gets the number of firestations in a particular zipcode
router.get('/api/areaAndFireStations', (req, res, next) => {
  db
    .any('SELECT  zipcode_of_incident, COUNT(DISTINCT station_area) FROM dispatch_table GROUP BY zipcode_of_incident ORDER BY COUNT(*) DESC')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

//This request gets top ten safe neighborhoods based on the average dispatch time of emergency services. It also fetches the frequency of emergency.
router.get('/api/safeNeighborhoods', (req, res, next) => {
  db
    .any('SELECT zipcode_of_incident, to_char(AVG(dispatch_timestamp - received_timestamp), \'MI:SS\') AS time, COUNT(*) FROM dispatch_table GROUP BY zipcode_of_incident ORDER BY time ASC LIMIT 10;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})


//This request gets average time difference between recieving medical emergency and the time a medical personnel reaches the site in San Francisco.
router.get('/api/medEmergencyAvgTime', (req, res, next) => {
  db
    .any('SELECT ROUND(((AVG(EXTRACT(EPOCH FROM (on_scene_timestamp - received_timestamp))))/60) :: numeric , 2) as avg_min FROM dispatch_table WHERE on_scene_timestamp IS NOT NULL AND received_timestamp IS NOT NULL AND city = \'San Francisco\' AND call_type= \'Medical Incident\';')
    .then(data => {
      res.json(data),
      console.log(data)
    })
    .catch(next)
})

//This request gets average time difference between recieving emergency and the time a personnel reaches the site in San Francisco.
router.get('/api/emergencyAvgTime', (req, res, next) => {
  db
    .any('SELECT ROUND(((AVG(EXTRACT(EPOCH FROM (on_scene_timestamp - received_timestamp))))/60) :: numeric , 2) as avg_min     FROM dispatch_table WHERE on_scene_timestamp IS NOT NULL AND received_timestamp IS NOT NULL AND city = \'San Francisco\';')
    .then(data => {
      res.json(data),
      console.log(data)
    })
    .catch(next)
})


module.exports = router
