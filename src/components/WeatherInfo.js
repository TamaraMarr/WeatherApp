import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from "react-sparklines";

import { API_KEY } from "../constants";
import { MapWithAMarker } from "./Map";

import "./WeatherInfo.css";

export default class WeatherInfo extends Component {
    
    getTempForDisplay() {
        const tempArray = this.props.singleCity.getTemp();

        return Math.round(tempArray[0]);
    }

    getHumForDisplay() {
        const humArray = this.props.singleCity.getHumidity(); 

        return humArray[0];
    }

    getWeatherDescriptionForDisplay() {
        const weatherDescriptionArray = this.props.singleCity.getWeatherDescription();

        return weatherDescriptionArray[0].charAt(0).toUpperCase() + weatherDescriptionArray[0].slice(1);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div>
                        <p className="col-12 WeatherInfo_headerStyle">Current weather conditions in {this.props.singleCity.cityName}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 WeatherInfo_columnStyle">
                        <p className="WeatherInfo_currentInfo">{this.getWeatherDescriptionForDisplay()}</p>
                        <MapWithAMarker
                            center={{ lat: this.props.singleCity.lat, lng: this.props.singleCity.long }}
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `273px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 WeatherInfo_columnStyle">
                        <p className="WeatherInfo_currentInfo">Average temperature: {this.getTempForDisplay()}&#176;C</p>
                        <Sparklines data={this.props.singleCity.getTemp()} height={220}>
                            <SparklinesLine color="red" />
                            <SparklinesReferenceLine type="mean" />
                            <SparklinesSpots />
                        </Sparklines>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 WeatherInfo_columnStyle">
                        <p className="WeatherInfo_currentInfo">Average humidity: {this.getHumForDisplay()}%</p>
                        <Sparklines data={this.props.singleCity.getHumidity()} height={220}>
                            <SparklinesLine color="blue" />
                            <SparklinesReferenceLine type="mean" />
                            <SparklinesSpots />
                        </Sparklines>
                    </div>
                </div>
            </div>
        );
    }
}