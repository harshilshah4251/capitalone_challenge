import React, { Component } from 'react';
import  Heatmap  from '../Elements/Heatmap.js';
import { Grid, Col, Row } from 'react-bootstrap';
import { Section } from 'react-fullpage';

class Section4 extends Component {
    render() {
      let locationdata = [];
      this.props.data.map(element => {
        locationdata.push({ "lat": element.latitude, "lng": element.longitude })
      });
      return (
          <Section color="#f0fff3" verticalAlign="false">
        <Grid>
        <h1 class="title" style ={{color :"#fa4659"}}>Heatmap of the emergencies in San Francisco</h1>
          <Row className="show-grid">
            <Col xs={12} sm={12} md={7} lg={7}>
              <div style={{ height: '500px', width: '500px', margin : 20 }}>
                <Heatmap locationdata={locationdata}/>
              </div>
            </Col>
            <Col xs={0} sm={0} md={1} lg={1}>
              <div></div>
            </Col>
            <Col xs={12} sm={12} md={5} lg={5}>
              <div  style ={{paddingTop : 100}}>
                <p class="description">The heatmap on the left shows frequency of emergencies in San Francisco with <span style = {{color : "red"}}>red</span> being the area having most frequent emergencies.</p><br />

                <p style = {{color: "red"}}><em>Note: If the heatmap layer does not show up, try refreshing the page couple of times.</em></p>
              </div>
            </Col>
          </Row>
  
  
        </Grid>
        </Section>
      );
    }
  }

  export default Section4