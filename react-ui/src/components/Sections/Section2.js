import React, { Component } from 'react';
import Barchart from '../Elements/Barchart.js';
import { Grid, Col, Row } from 'react-bootstrap';
import { Section } from 'react-fullpage';

class Section2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      medAverageTime: 0,
      averageTime: 0
    }
  }

  componentWillMount() {
    fetch('/api/medEmergencyAvgTime')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ medAverageTime: data[0].avg_min })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

      fetch('/api/emergencyAvgTime')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ averageTime: data[0].avg_min })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })
  }
  render() {

    const barlabels = [];
    const bardata = [];
    this.props.data.map(element => (
      barlabels.push(element.call_type),
      bardata.push(element.count))
    );


    return (
      <Section verticalAlign="true" color="#f0fff3">
          <Grid>
          <h1 class="title">A keen insight on San Francisco emergencies</h1>
            <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div>
                  <p class="description">As we can see in the bar chart on the right that medical emergencies dominate the number of emergencies in the proper San Francisco area. This is a significant statistic and demands more attention. So, more analysis showed that the average time difference for a medical personnel to mark himself on site from the receivel of request is <span style = {{color : "red"}}>{this.state.medAverageTime} </span>minutes. For comparison sake, this statistic is more than the overall average time difference for all kinds of emergencies in San Francisco which is <span style = {{color : "green"}}>{this.state.averageTime} </span> minutes. This statistic could certainely be improved by employing more resources to reduce the time difference.</p>
                </div>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
              <Row>
                <Barchart bardata={bardata} barlabels={barlabels} label = "Frequency of emergencies" specialBarLabel = "Medical Incident" barColor = "rgba(207, 106, 135,0.7)" hoverColor = "rgba(207, 106, 135,1.0)" specialBarColor = "rgba(231, 127, 103,0.7)" specialHoverColor = "rgba(225, 95, 65,1.0)"/>
                </Row>
                <Row>
                  <Col md={4} lg = {4}>
                  <h1 style = {{fontSize : 80, color : "red", fontWeight : 400, textAlign: "right"}} > {this.state.medAverageTime} </h1><br /><h1 style = {{fontSize : 20, color : "black", fontWeight : 100, textAlign: "right"}} > minutes of average response time for medical emergencies</h1>
                  </Col>
                  <Col md={4} lg = {4}>
                  <h1 style = {{fontSize : 80, color : "gray", fontWeight : 400, textAlign: "center"}} > > </h1>
                  </Col>
                   <Col md={4} lg = {4}>
                  <h1 style = {{fontSize : 80, color : "green", fontWeight : 400, textAlign: "left"}} > {this.state.averageTime} </h1><br /><h1 style = {{fontSize : 20, color : "black", fontWeight : 100, textAlign: "left"}} > minutes of average response time overall </h1>
                  </Col>
                </Row>
              </Col>

            </Row>
          </Grid>
      </Section>
    );
  }
}

export default Section2
