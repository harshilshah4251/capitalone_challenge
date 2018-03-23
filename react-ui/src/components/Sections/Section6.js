import React, { Component } from 'react';
import Customtable from '../Elements/Customtable.js';
import { Grid, Col, Row } from 'react-bootstrap';
import { Section } from 'react-fullpage';

class Section6 extends Component {
    render() {
      let tableheadings = ["Area zipcode", "Average response time of emergency services", "Number of dispatches"];
      return (
          <Section color="#f0fff3" verticalAlign="true">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={6} lg={6}>
              <Customtable tableheadings={tableheadings} tabledata={this.props.data} />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <p class="med_title">10 Safe Neighborhoods</p><br />
              <p class="description">The table on the left shows the list of safe neighborhoods in the San Francisco region based on the frequency of dispatch and the response time of the emergency services.<br /> The neighborhoods marked in green could be cautiously deemed as the safest neighborhoods in San Francisco area solely based on average emergency response time and frequency of dispatches. </p>
            </Col>
          </Row>
        </Grid>
        </Section>
      );
    }
  }

  export default Section6