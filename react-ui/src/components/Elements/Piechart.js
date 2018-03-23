import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class Piechart extends Component {

    

    render() {

        //colors in piechart
        const arr_of_colors = ['rgba(255, 63, 52,0.5)', 'rgba(252, 66, 123,0.5)', 'rgba(189, 197, 129,0.5)', 'rgba(27, 156, 252,0.5)', 'rgba(202, 211, 200,0.5)', 'rgba(44, 58, 71,0.5)', 'rgba(84, 109, 229,0.5)', 'rgba(241, 144, 102,0.5)', 'rgba(225, 95, 65,0.5)', 'rgba(87, 75, 144,0.5)','rgba(255, 159, 243,0.5)', 'rgba(254, 202, 87,0.5)', 'rgba(255, 107, 107,0.5)', 'rgba(72, 219, 251,0.5)', 'rgba(29, 209, 161,0.5)', 'rgba(1, 163, 164,0.5)', 'rgba(255, 192, 72,0.5)'];

        const hover_arr_of_colors = ['rgba(255, 63, 52,1.0)', 'rgba(252, 66, 123,1.0)', 'rgba(189, 197, 129,1.0)', 'rgba(27, 156, 252,1.0)', 'rgba(202, 211, 200,1.0)', 'rgba(44, 58, 71,1.0)', 'rgba(84, 109, 229,1.0)', 'rgba(241, 144, 102,1.0)', 'rgba(225, 95, 65,1.0)', 'rgba(87, 75, 144,1.0)','rgba(255, 159, 243,1.0)', 'rgba(254, 202, 87,1.0)', 'rgba(255, 107, 107,1.0)', 'rgba(72, 219, 251,1.0)', 'rgba(29, 209, 161,1.0)', 'rgba(1, 163, 164,1.0)', 'rgba(255, 192, 72,1.0)'];

        const data = {
            labels: this.props.pielabels,
            datasets: [{
                data: this.props.piedata,
                backgroundColor: arr_of_colors,
                borderColor : '#FFFFFF',
                hoverBackgroundColor: hover_arr_of_colors,
                hoverBorderColor: hover_arr_of_colors,
                borderWidth: 1
            }],

        };
        return (
            <div align = "center">
                <Pie data={data} options={{
                    title: {
                        fontSize: 30,
                        fontFamily: 'Roboto'
                    },
                    legend: {
                        position:'left'
                    }
                }}
                />
            </div>
        );
    }
}

export default Piechart;    