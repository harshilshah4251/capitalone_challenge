const express = require('express')
const router = express.Router()

const { db } = require('../lib/database')

router.get('/api/alldata', (req, res, next) => {
  db
    .any('SELECT * FROM dispatch_table LIMIT 2')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

router.get('/api/cityPieChartData', (req, res, next) => {
  db
    .any('SELECT call_type as label, ROUND(((AVG(EXTRACT(EPOCH FROM (response_timestamp - received_timestamp))))/60)::numeric, 2) as data FROM dispatch_table WHERE response_timestamp IS NOT NULL AND received_timestamp IS NOT NULL GROUP BY label;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

router.get('/api/cityBarChartData', (req, res, next) => {
  db
    .any('SELECT call_type, COUNT(*) FROM dispatch_table WHERE city=\'San Francisco\' GROUP BY call_type;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

router.get('/api/cityDoughnutChartData', (req, res, next) => {
  db
    .any('SELECT call_type_group, als_unit, COUNT(*) FROM dispatch_table WHERE call_type_group=\'Potentially Life-Threatening\' GROUP BY call_type_group, als_unit;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

router.get('/api/citylocationdata', (req, res, next) => {
  db
    .any('SELECT latitude, longitude FROM dispatch_table;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

router.get('/api/longesttimetodispatch', (req, res, next) => {
  db
    .any('SELECT zipcode_of_incident, (AVG(EXTRACT(EPOCH FROM (dispatch_timestamp - received_timestamp))))/60 as avg_min FROM dispatch_table WHERE response_timestamp IS NOT NULL AND received_timestamp IS NOT NULL GROUP BY zipcode_of_incident ORDER BY avg_min DESC; ')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

router.get('/api/areadata', (req, res, next) => {
  db
    .any('SELECT  zipcode_of_incident, COUNT(DISTINCT station_area) FROM dispatch_table GROUP BY zipcode_of_incident ORDER BY COUNT(*) DESC')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

router.get('/api/safeneighborhoods', (req, res, next) => {
  db
    .any('SELECT zipcode_of_incident, to_char(AVG(dispatch_timestamp - received_timestamp), \'MI:SS\') AS time, COUNT(*) FROM dispatch_table GROUP BY zipcode_of_incident ORDER BY time ASC LIMIT 10;')
    .then(data => {
      res.json(data)
    })
    .catch(next)
})


module.exports = router
