import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';



class Barchart extends Component{
  
  constructor(props){
    super(props)
    this.state={
        barColor : this.props.barColor,
        specialBarColor : this.props.specialBarColor,
        hoverColor: this.props.hoverColor,
        specialHoverColor : this.props.specialHoverColor,
        specialBarLabel : this.props.specialBarLabel
    }
}

  render() {
    let labelColors = [];
    let hoverLabelColors = [];

    this.props.barlabels.map(element =>{
      if(element == this.state.specialBarLabel){
        labelColors.push(this.state.specialBarColor)
        hoverLabelColors.push(this.state.specialHoverColor)
      }else{
        labelColors.push(this.state.barColor)
        hoverLabelColors.push(this.state.hoverColor)
      }
    });

    //alert(labelColors)
    

    const data = {
      labels: this.props.barlabels,
      datasets: [
        {
          backgroundColor: labelColors,
          borderWidth: 1,
          hoverBackgroundColor: hoverLabelColors,
          data: this.props.bardata
        }
      ]
    };
    
    return (
      <div>
        <Bar
          data={data} options={{
            legend: {
              display: false
           },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: this.props.xlabel
                },
                  ticks: {
                      autoSkip: false
                  }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: this.props.ylabel
                },
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

export default Barchart;
