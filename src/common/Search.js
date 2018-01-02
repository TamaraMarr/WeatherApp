import React, { Component } from 'react';

import FetchDataService from "./../services/fetchDataService";
import WeatherInfo from '../components/WeatherInfo';
import City from '../entities/City';

import "./Search.css";

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchCity: "",
            inputValue: "",
            showData: false,
            cities: [],
            id: 0,
            DTOCities: []
        };

        this.fetchDataService = new FetchDataService();

        this.bindInit();
    }

    bindInit() {
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    handleClick = () => {
            this.setState({
                searchCity: this.state.inputValue
            })
            this.fetchDataService.get(
                this.state.inputValue, response => {
                    const singleCity = new City(response);
                    this.setState({
                        DTOCities:[singleCity, ...this.state.DTOCities]
                    });
                }, error => {
                    console.log(error);
                });
        this.setState({
            showData: true,
            inputValue: ""
        });
    }

    handleKeyPress(event) {
        if(event.key === 'Enter') {
            this.handleClick();
        }
    }

    render() {
        return (
            <div className="row" style={{margin: 0}}>
                    <input type="text" placeholder="Enter a city name and press enter" value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.handleKeyPress} className="col-10 offset-1 form-control Search_inputStyle" />
                    {this.state.DTOCities.map(city => {
                        return (
                            this.state.showData ? <WeatherInfo key={city.id} singleCity={city} /> : ""
                        );
                    })}
            </div>
        );
    }
}
