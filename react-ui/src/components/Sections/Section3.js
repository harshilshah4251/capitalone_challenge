import React, { Component } from 'react';
import  Doughnutchart  from '../Elements/Doughnutchart.js';
import { Grid, Col, Row } from 'react-bootstrap';
import { Section } from 'react-fullpage';

class Section3 extends Component {
    render() {
  
      const doughnutlabels = ["Carrying ALS unit(%)", "Not carrying ALS unit(%)"];
      let doughnutdata = [];
      this.props.data.map(element => (
        doughnutdata.push(element.count))
      );
      const sum = parseInt(doughnutdata[0]) + parseInt(doughnutdata[1]);
      doughnutdata = doughnutdata.map(element => ((1.0 * element / sum) * 100.0).toFixed(2));
      return (
          <Section verticalAlign="false" color="#FFFFFF">
        
          <Grid>
          <h1 class="title" style ={{color :"rgba(84, 109, 229,1.0)", padding : 50}}>Life threatening emergencies and ALS units</h1>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8}>
                <Doughnutchart doughnutdata={doughnutdata} doughnutlabels={doughnutlabels} />
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div>
                  <p class="description">Analysis showed that <span style = {{color : "red"}}>26.58 %</span> dispatches for life threatening emergencies did not carry an Advanced Life Support unit. Considering the fact that the emergencies were life threatening, this should definitely be a point of concern and the number must go down in future. </p>
                </div>
              </Col>
            </Row>
          </Grid>
        </Section>
      );
    }
  }

  export default Section3
  