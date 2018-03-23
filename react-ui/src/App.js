import React, { Component } from 'react';
import { SectionsContainer } from 'react-fullpage';


import Intro from './components/Sections/Intro';
import Section1 from './components/Sections/Section1.js';
import Section2 from './components/Sections/Section2.js';
import Section3 from './components/Sections/Section3.js';
import Section4 from './components/Sections/Section4.js';
import Section5 from './components/Sections/Section5.js';
import Section6 from './components/Sections/Section6.js';




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emergencyTypeAndResponseTimes: [],              //emergency type and average response times
      sanFranciscoEmergencies: [],                    //emergency type and frequency in SanFrancisco
      alsUnitData: [],                                //life threatening emergencies and als unit                                                   //data   
      cityLocationData: [],                           //location coordinates of all emergencies
      longestTimeToDispatch: [],                      //area zipcode and average time to dispatch
      areaAndFireStations: [],                        //area  zipcode and number of fire stations                                                   //in that area           
      safeNeighborhoods: []                           //safe neighorhoods in SF area  
    }
  }


  //This method calls all the endpoints to fetch data and fill up all the arrays before the render method is called
  componentWillMount() {

    fetch('/api/emergencyTypeAndResponseTimes')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ emergencyTypeAndResponseTimes: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/sanFranciscoEmergencies')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ sanFranciscoEmergencies: data })
        //alert(JSON.stringify(this.state.cityBarChartData))
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/alsUnitData')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ alsUnitData: data })
        //alert(JSON.stringify(this.state.cityDoughnutChartData))
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/cityLocationData')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ cityLocationData: data })
        //alert(JSON.stringify(this.state.citylocationdata))
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/longestTimeToDispatch')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ longestTimeToDispatch: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/areaAndFireStations')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ areaAndFireStations: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })

    fetch('/api/safeNeighborhoods')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ safeNeighborhoods: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })




  }



  render() {

    //SELECT call_type, COUNT(*) FROM dispatch_table WHERE zipcode_of_incident ='94127' GROUP BY call_type ORDER BY COUNT(*) DESC;
    //the above query shows that 55 percent of emergencies in area 94127 are Structural fires. 
    

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
    };


    return (
      <div className="App">

        <SectionsContainer className="container"{...options}>
          <Intro />
          <Section1 data = {this.state.emergencyTypeAndResponseTimes} />
          <Section2 data={this.state.sanFranciscoEmergencies} />
          <Section3 name="Doughnut Stats!!" data={this.state.alsUnitData} />
          <Section4 name="HeatmapGrid" data={this.state.cityLocationData} />
          <Section5 name="Bar Stats!!" timedata={this.state.longestTimeToDispatch} type="zip_code" areadata={this.state.areaAndFireStations}/>
          <Section6 data={this.state.safeNeighborhoods} />
        </SectionsContainer>
      </div>
    )
  }
}



export default App
