import React, { Component } from 'react';
import './App.css';
import { SectionsContainer, Section } from 'react-fullpage';
import { Grid, Col, Row, Table } from 'react-bootstrap';
import Piechart from './components/Piechart'
import Stackedbarchart from './components/Stackedbarchart'
import Doughnutchart from './components/Doughnutchart.js'
import Cityheatmap from './components/Cityheatmap.js'
import Heatmapcontainer from './components/Heatmapcontainer.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      all_emergencies: [],
      cityPieChartData: [],
      cityBarChartData: [],
      cityDoughnutChartData: [],
      citylocationdata: [],
      longesttimetodispatch: [],
      areadata: [],
      safeneighborhoods: []
    }
  }

  componentWillMount() {

    fetch('/api/cityPieChartData')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ cityPieChartData: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/cityBarChartData')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ cityBarChartData: data })
        //alert(JSON.stringify(this.state.cityBarChartData))
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/cityDoughnutChartData')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ cityDoughnutChartData: data })
        //alert(JSON.stringify(this.state.cityDoughnutChartData))
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/citylocationdata')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ citylocationdata: data })
        //alert(JSON.stringify(this.state.citylocationdata))
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/longesttimetodispatch')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ longesttimetodispatch: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/areadata')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ areadata: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/safeneighborhoods')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ safeneighborhoods: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })




  }



  render() {

    //SELECT call_type, COUNT(*) FROM dispatch_table WHERE zipcode_of_incident ='94127' GROUP BY call_type ORDER BY COUNT(*) DESC;
    //the above query shows that 55 percent of emergencies in area 94127 are Structural fires. 
    let desc_dispatchtime = "The first bar graph on the right shows that area 94127 takes longest time to dispatch on average - 31.12 minutes. Data analysis shows that 55.5 % of the emergencies in this area were structural fires. However, this area, compared to other areas, has less number of fire stations associated with it (3 fire stations only). This could be a strong reason why it takes long time for emergency services to dispatch in this area. The time difference could be reduced by constructing new fire stations, installing fire extinguishers, water hoses etc."


    //alert("pielabels :" + pielabels);
    let options = {
      activeClass: 'active', // the class that is appended to the sections links
      anchors: [], // the anchors for each sections
      arrowNavigation: true, // use arrow keys
      className: 'SectionContainer', // the class name for the section container
      delay: 1000, // the scroll animation speed
      navigation: true, // use dots navigation
      scrollBar: true, // use the browser default scrollbar
      sectionClassName: 'Section', // the section class name
      verticalAlign: false, // align the content of each section vertical
      sectionPaddingTop: '50px',
      sectionPaddingBottom: '50px',
    };
    //alert(Array.isArray(this.state.emergencies));
    //alert(this.state.citybarchartdata);
    return (
      <div className="App">

        <SectionsContainer className="container"{...options}>

          <Section color="#ff4c4c" verticalAlign="true"><Intro /></Section>

          <Section className="custom-section" verticalAlign="true" color="#FFFFFF">
            <PieGrid name="Pie Stats!!" data={this.state.cityPieChartData} />
            <BarGrid name="Bar Stats!!" data={this.state.cityBarChartData} type="call_type" title="San Francisco emergency stats" />
            <DoughnutGrid name="Doughnut Stats!!" data={this.state.cityDoughnutChartData} /></Section>


          <Section color="#ff9f1c" verticalAlign="true"><HeatmapGrid name="HeatmapGrid" data={this.state.citylocationdata} /></Section>



          <Section color="#2ec4b6" verticalAlign="true"><BarLayout name="Bar Stats!!" timedata={this.state.longesttimetodispatch} type="zip_code" title="Areas that take longest time to dispatch" areadata={this.state.areadata} description={desc_dispatchtime} /></Section>


          <Section color="#FFFFFF" verticalAlign="true"><SafeNeighborhood data={this.state.safeneighborhoods} /></Section>


        </SectionsContainer>
      </div>
    )
  }
}


class PieGrid extends Component {
  render() {
    const pielabels = [];
    const piedata = [];
    this.props.data.map(element => (
      pielabels.push(element.label),
      piedata.push(element.data))
    );
    return (
      <div>
        <header>
          <h1 class="title">{this.props.name}</h1>
        </header>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={8} lg={8}>
              <Piechart piedata={piedata} pielabels={pielabels} />
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div>
                <p class="med_title">Average response time...</p><br />
                <p class="description">This pie chart shows the average response times in minutes of emergency services broken down by the type of emergency.</p>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class Intro extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={8} lg={8}>
              <h1 class="intro-title">Capital One <br />Webapp Challenge</h1><br />
              <p class="intro-name">Harshil Shah</p><br />
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div>
                
                <p class="intro-instr">You can find some very interesting stats about San Francisco emergency services here.</p>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class BarGrid extends Component {
  render() {

    const barlabels = [];
    const bardata = [];
    if (this.props.type == "call_type") {
      this.props.data.map(element => (
        barlabels.push(element.call_type),
        bardata.push(element.count))
      );
    }
    else if (this.props.type == "zip_code") {
      this.props.data.map(element => (
        barlabels.push(element.zipcode_of_incident),
        bardata.push(element.avg_min))
      );
    }

    return (
      <div>
        <header>
          <h1 class="title">{this.props.name}</h1>
        </header>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div>
                <p class="med_title">{this.props.title}</p><br />
                <p class="description">{this.props.description}</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8}>
              <Stackedbarchart bardata={bardata} barlabels={barlabels} />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}
class BarLayout extends Component {
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
      <div>
        <header>
          <h1 class="title">{this.props.name}</h1>
        </header>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <div>
                <p class="med_title">{this.props.title}</p><br />
                <p class="description">{this.props.description}</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Row>
                <Stackedbarchart bardata={bardata} barlabels={barlabels} />
              </Row>
              <Row>
                <Stackedbarchart bardata={areaincidents} barlabels={arealabels} />
              </Row>
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}
class DoughnutGrid extends Component {
  render() {

    const doughnutlabels = ["Carrying ALS unit(%)", "Not carrying ALS unit(%)"];
    let doughnutdata = [];
    this.props.data.map(element => (
      doughnutdata.push(element.count))
    );
    const sum = parseInt(doughnutdata[0]) + parseInt(doughnutdata[1]);
    doughnutdata = doughnutdata.map(element => ((1.0 * element / sum) * 100.0).toFixed(2));
    return (
      <div>
        <header>
          <h1 class="title">{this.props.name}</h1>
        </header>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={8} lg={8}>
              <Doughnutchart doughnutdata={doughnutdata} doughnutlabels={doughnutlabels} />
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div>
                <p class="med_title">Advanced life support units for life threatening emergencies...</p><br />
                <p class="description">The doughnut chart shows the percentage of first response vehicles carrying ALS units.</p>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class HeatmapGrid extends Component {
  render() {
    let locationdata = [];
    this.props.data.map(element => {
      locationdata.push({ "lat": element.latitude, "lng": element.longitude })
    });
    //alert(JSON.stringify(locationdata));
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} sm={12} md={7} lg={7}>
            <div style={{ height: '500px', width: '500px' }}>
              <Cityheatmap locationdata={locationdata} />
            </div>
          </Col>
          <Col xs={0} sm={0} md={1} lg={1}>
            <div></div>
          </Col>
          <Col xs={12} sm={12} md={5} lg={5}>
            <div>
              <p class="med_title_white">Heatmap of the emergencies in San Francisco</p><br />
              <p class="description">The heatmap on the left shows the emergencies in San Francisco with red being the area having most frequent emergencies.</p>
            </div>
          </Col>
        </Row>


      </Grid>
    );
  }
}

class PredictionGrid extends Component {
  render() {

    //alert("grid : " + JSON.stringify(this.props.data));
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} sm={12} md={6} lg={6}>
            <h1>This area is for prediction</h1>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
          </Col>
        </Row>
      </Grid>
    );
  }
}


class SafeNeighborhood extends Component {
  render() {
    let tableheadings = ["Area zipcode", "Average response time of emergency services", "Number of dispatches"];
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} sm={12} md={6} lg={6}>
            <CustomTable tableheadings={tableheadings} tabledata={this.props.data} />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <p class="med_title">10 Safe Neighborhoods</p><br />
            <p class="description">The table on the left shows the list neighborhoods in the San Francisco region based on the frequency of dispatch and the response time of the emergency services.<br /> The neighborhoods marked in green could be deemed as the safest neighborhoods in San Francisco area solely based on average emergency response time and frequency of dispatches. </p>
          </Col>
        </Row>
      </Grid>
    );
  }
}


class CustomTable extends Component {

  render() {

    return (
      <Table>
        <thead>
          <tr>
            <th>Area zipcode</th>
            <th>Average response time(minutes)</th>
            <th>Number of dispatches</th>
          </tr>
        </thead>
        <tbody>
          {

            this.props.tabledata.map(element => 
              (element.count < 100) ?(
                <tr>
                  <td class ="green_text"><strong>{element.zipcode_of_incident}</strong></td>
                  <td class ="green_text"><strong>{element.time}</strong></td>
                  <td class ="green_text"><strong>{element.count}</strong></td>
                </tr>
              ):(
                <tr>
                  <td >{element.zipcode_of_incident}</td>
                  <td >{element.time}</td>
                  <td >{element.count}</td>
                </tr>
              )
            )
          }
        </tbody>

      </Table>
    );
  }
}



export default App
