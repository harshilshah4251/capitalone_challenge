import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';




class Doughnutchart extends Component {



    render() {
        const data = {
            labels: this.props.doughnutlabels,
            datasets: [{
                data: this.props.doughnutdata,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB'
            ]
            }],
            

        };
        
        
        return (
            <div align = "center">
                <Doughnut data={data} options={{
                    legend: {
                        position:'bottom'
                    }
                }} 
                />
            </div>
        );
    }
}



export default Doughnutchart