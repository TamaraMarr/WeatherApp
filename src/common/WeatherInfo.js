import React, { Component } from 'react';
import { Col, Table } from 'react-bootstrap'; 
import { Sparklines, SparklinesLine } from "react-sparklines";
import { MapWithAMarker } from "./Map";

class WeatherInfo extends Component {
    
    componentDidMount() {
        
    }

    render() {
        return (
            <Col sm={12}>
                <Table style={{ width: "90%", margin: "0 auto" }}>
                    <thead>
                        <tr>
                            <th>City map</th>
                            <th>Temperature</th>
                            <th>Humidity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><MapWithAMarker
                                center={{ lat: this.props.singleCity.lat, lng: this.props.singleCity.long }}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                            </td>
                            <td><Sparklines data={this.props.singleCity.getTemp()}>
                                <SparklinesLine color="red" />
                                </Sparklines>
                            </td>
                            <td><Sparklines data={this.props.singleCity.getHumidity()}>
                                <SparklinesLine color="blue" />
                                </Sparklines>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        );
    }
}

export default WeatherInfo;