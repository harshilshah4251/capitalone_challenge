import React, { Component } from 'react';
import  Barchart  from '../Elements/Barchart.js';
import { Grid, Col, Row } from 'react-bootstrap';
import { Section } from 'react-fullpage';

class Section5 extends Component {
    render() {
  
      const barlabels = [];
      const bardata = [];
  
      const arealabels = [];
      const areaincidents = [];
  
      this.props.areadata.map(element => (
        arealabels.push(element.zipcode_of_incident),
        areaincidents.push(element.count))
      );
  
      this.props.timedata.map(element => (
        barlabels.push(element.zipcode_of_incident),
        bardata.push(element.avg_min))
      );
  
  
      return (
          <Section color="#FFFFFF" verticalAlign="true">
          <Grid>
          <h1 class="title" style ={{color :"#ff6d24"}}>Areas that take longest time to dispatch</h1>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <div style={{paddingTop : 100}}>
                  <p class="description">The first bar graph on the right shows that <span style = {{color : "#ff467e"}}>Area 94127</span> takes longest time to dispatch on average - <span style = {{color : "red"}}>31.12</span> minutes. <br />Data analysis shows that <span style = {{color : "red"}}>55.5 %</span> of the emergencies in this area were structural fires. However, this area, compared to other areas, has less number of fire stations associated with it (<span style = {{color : "red"}}>3</span> fire stations only). <br />This could be a strong reason why it takes long time for emergency services to dispatch in this area. The time difference could be reduced by constructing new fire stations, installing fire extinguishers, water hoses etc.</p>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Row>
                  <Barchart bardata={bardata} barlabels={barlabels} specialBarLabel = "94127" specialBarColor = "#ff467e" specialHoverColor = "#f12b6b" barColor = "#f6ffcd" hoverColor = "#bcffa8" xlabel = "Area zipcodes" ylabel = "Average time for dispatch (minutes)"/>
                </Row>
                <Row>
                  <Barchart bardata={areaincidents} barlabels={arealabels} specialBarLabel = "94127" specialBarColor = "#ff467e" specialHoverColor = "#f12b6b" barColor = "#f6ffcd" hoverColor = "#bcffa8" xlabel = "Area zipcodes" ylabel = "Number of associated fire stations"/>
                </Row>
              </Col>
  
            </Row>
          </Grid>
        </Section>
      );
    }
  }

  export default Section5