import React, { Component } from 'react';
import  Piechart  from '../Elements/Piechart.js';
import { Grid, Col, Row } from 'react-bootstrap';
import { Section } from 'react-fullpage';

class Section1 extends Component {
    render() {
      const pielabels = [];
      const piedata = [];
      this.props.data.map(element => (
        pielabels.push(element.label),
        piedata.push(element.data))
      );
      return (
          <Section verticalAlign="true" color="#FFFFFF">
        
          <Grid>
          <h1 class="title" style ={{color:"rgba(225, 95, 65,1.0)", paddingBottom: 20}}>Average response times based on the type of emergency</h1>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8}>
                <Piechart piedata={piedata} pielabels={pielabels} />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div>
                  <p class="description">This pie chart shows the average response times in minutes of emergency services broken down by the type of emergency. As evident in the pie chart, train incidents take the longest amount of time on average of about 1 hour and 55 minutes. Water rescues take about 6.61 minutes to attend followed by Hazmat with about 6.5 minutes on average.</p>
                </div>
              </Col>
            </Row>
          </Grid>
        
        </Section>
      );
    }
  }

  export default Section1