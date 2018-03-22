import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';



class Stackedbarchart extends Component{
  

  render() {
    const data = {
      labels: this.props.barlabels,
      datasets: [
        {
          label: this.props.label,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.props.bardata
        }
      ]
    };
    
    return (
      <div>
        <Bar
          data={data} options={{
            scales: {
              xAxes: [{
                  ticks: {
                      autoSkip: false
                  }
              }]
          }
          }}
        />
      </div>
    );
  }
};

export default Stackedbarchart;
