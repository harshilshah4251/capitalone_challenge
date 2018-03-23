import React, {Component} from 'react';
import { Table } from 'react-bootstrap';

class Customtable extends Component {

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
  
  export default Customtable;
  