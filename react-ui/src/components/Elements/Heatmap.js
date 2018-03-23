import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

function createMapOptions(maps) {

    //map control functions
    return {
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_CENTER,
        style: maps.ZoomControlStyle.SMALL
      },
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT
      },
      mapTypeControl: true
    };
  }
class Heatmap extends Component {
    render() {
        return (
            <div style={{height: '500px', width: '600px'}}>
                <GoogleMapReact

                    bootstrapURLKeys={{
                        key: 'AIzaSyAQJkAYx9if3nKCorO3wxetVcs7ZB6G-LA',
                    }}
                    defaultCenter={[37.7749, -122.4194]}
                    defaultZoom={14}
                    options={createMapOptions}
                    heatmapLibrary={true}
                    heatmap={{
                        positions: this.props.locationdata,
                        options: {
                          radius: 20,
                          opacity: 0.7,
                          gradient: [
                            'rgba(0, 255, 255, 0)',
                            'rgba(0, 255, 255, 1)',
                            'rgba(0, 191, 255, 1)',
                            'rgba(0, 127, 255, 1)',
                            'rgba(0, 63, 255, 1)',
                            'rgba(0, 0, 255, 1)',
                            'rgba(0, 0, 223, 1)',
                            'rgba(0, 0, 191, 1)',
                            'rgba(0, 0, 159, 1)',
                            'rgba(0, 0, 127, 1)',
                            'rgba(63, 0, 91, 1)',
                            'rgba(127, 0, 63, 1)',
                            'rgba(191, 0, 31, 1)',
                            'rgba(255, 0, 0, 1)'
                          ]
                        },
                      }}
                >
                </GoogleMapReact>
            </div>

        );

    }
}


export default Heatmap;