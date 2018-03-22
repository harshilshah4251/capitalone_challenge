import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';




class Piechart extends Component {



    render() {
        const arr_of_colors = ['#e6194b', '#3cb44b', '#ffe119', '#e6194b', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#e6beff', '#aa6e28', '#fffac8', '#800000', '#aaffc3', '#008080'];
        const data = {
            labels: this.props.pielabels,
            datasets: [{
                data: this.props.piedata,
                backgroundColor: arr_of_colors,
                hoverBackgroundColor: arr_of_colors,
                borderWidth: 1,
                borderColor: '#FFFFFF'
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



export default Piechart